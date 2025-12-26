import { useState, useEffect, useCallback } from 'react';
import {
  CompanySettings,
  Client,
  Document,
  DocumentType,
  LineItem,
  GSTRate,
  DEFAULT_COMPANY_SETTINGS,
} from '@/types/invoice';
import {
  saveCompanySettings,
  loadCompanySettings,
  saveClients,
  loadClients,
  saveDocuments,
  loadDocuments,
  incrementCounter,
} from '@/utils/storage';
import {
  calculateLineItem,
  calculateTotals,
  amountToWords,
  generateDocumentNumber,
} from '@/utils/calculations';

export const useInvoiceStore = () => {
  const [companySettings, setCompanySettings] = useState<CompanySettings>(DEFAULT_COMPANY_SETTINGS);
  const [clients, setClients] = useState<Client[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCompanySettings(loadCompanySettings());
    setClients(loadClients());
    setDocuments(loadDocuments());
    setIsLoaded(true);
  }, []);

  const updateCompanySettings = useCallback((settings: CompanySettings) => {
    setCompanySettings(settings);
    saveCompanySettings(settings);
  }, []);

  const addClient = useCallback((client: Client) => {
    const updated = [...clients, client];
    setClients(updated);
    saveClients(updated);
  }, [clients]);

  const updateClient = useCallback((client: Client) => {
    const updated = clients.map(c => c.id === client.id ? client : c);
    setClients(updated);
    saveClients(updated);
  }, [clients]);

  const deleteClient = useCallback((id: string) => {
    const updated = clients.filter(c => c.id !== id);
    setClients(updated);
    saveClients(updated);
  }, [clients]);

  const createNewDocument = useCallback((type: DocumentType): Document => {
    const docNumber = generateDocumentNumber(
      companySettings.prefixes[type],
      companySettings.counters[type]
    );
    
    const today = new Date().toISOString().split('T')[0];
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);

    const newDoc: Document = {
      id: crypto.randomUUID(),
      type,
      number: docNumber,
      date: today,
      dueDate: dueDate.toISOString().split('T')[0],
      placeOfSupply: companySettings.state,
      countryOfSupply: 'India',
      client: {
        id: '',
        name: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        phone: '',
        email: '',
        gstin: '',
      },
      items: [],
      subtotal: 0,
      discountType: 'amount',
      discountValue: 0,
      discountAmount: 0,
      cgstTotal: 0,
      sgstTotal: 0,
      igstTotal: 0,
      shippingCharges: 0,
      roundOff: 0,
      grandTotal: 0,
      amountInWords: 'Rupees Zero Only',
      paymentTerms: 'Net 30',
      notes: '',
      isInterState: false,
      currency: companySettings.defaultCurrency || 'INR',
      template: companySettings.defaultTemplate || 'modern',
    };

    setCurrentDocument(newDoc);
    return newDoc;
  }, [companySettings]);

  const updateDocumentField = useCallback(<K extends keyof Document>(
    field: K,
    value: Document[K]
  ) => {
    if (!currentDocument) return;

    let updated = { ...currentDocument, [field]: value };

    // Check if it's interstate transaction
    if (field === 'placeOfSupply' || field === 'client') {
      const placeOfSupply = field === 'placeOfSupply' ? value as string : updated.placeOfSupply;
      const isInterState = placeOfSupply !== companySettings.state;
      updated.isInterState = isInterState;

      // Recalculate all items with new interstate status
      updated.items = updated.items.map(item => {
        const calc = calculateLineItem(item.quantity, item.rate, item.gstRate, isInterState);
        return { ...item, ...calc };
      });

      const totals = calculateTotals(updated.items, updated.discountType, updated.discountValue);
      updated = {
        ...updated,
        ...totals,
        amountInWords: amountToWords(totals.grandTotal),
      };
    }

    setCurrentDocument(updated);
  }, [currentDocument, companySettings.state]);

  const addLineItem = useCallback(() => {
    if (!currentDocument) return;

    const newItem: LineItem = {
      id: crypto.randomUUID(),
      description: '',
      hsnSac: '',
      quantity: 1,
      rate: 0,
      gstRate: companySettings.defaultGstRate,
      amount: 0,
      gstAmount: 0,
      cgst: 0,
      sgst: 0,
      igst: 0,
    };

    const updated = {
      ...currentDocument,
      items: [...currentDocument.items, newItem],
    };

    setCurrentDocument(updated);
  }, [currentDocument, companySettings.defaultGstRate]);

  const updateLineItem = useCallback((
    itemId: string,
    field: keyof LineItem,
    value: string | number
  ) => {
    if (!currentDocument) return;

    const items = currentDocument.items.map(item => {
      if (item.id !== itemId) return item;

      const updatedItem = { ...item, [field]: value };

      // Recalculate if quantity, rate, or gstRate changed
      if (field === 'quantity' || field === 'rate' || field === 'gstRate') {
        const calc = calculateLineItem(
          field === 'quantity' ? Number(value) : updatedItem.quantity,
          field === 'rate' ? Number(value) : updatedItem.rate,
          field === 'gstRate' ? Number(value) as GSTRate : updatedItem.gstRate,
          currentDocument.isInterState
        );
        return { ...updatedItem, ...calc };
      }

      return updatedItem;
    });

    const totals = calculateTotals(items, currentDocument.discountType, currentDocument.discountValue);
    
    setCurrentDocument({
      ...currentDocument,
      items,
      ...totals,
      amountInWords: amountToWords(totals.grandTotal),
    });
  }, [currentDocument]);

  const removeLineItem = useCallback((itemId: string) => {
    if (!currentDocument) return;

    const items = currentDocument.items.filter(item => item.id !== itemId);
    const totals = calculateTotals(items, currentDocument.discountType, currentDocument.discountValue);

    setCurrentDocument({
      ...currentDocument,
      items,
      ...totals,
      amountInWords: amountToWords(totals.grandTotal),
    });
  }, [currentDocument]);

  const updateDiscount = useCallback((type: 'amount' | 'percentage', value: number) => {
    if (!currentDocument) return;

    const totals = calculateTotals(currentDocument.items, type, value);

    setCurrentDocument({
      ...currentDocument,
      discountType: type,
      discountValue: value,
      ...totals,
      amountInWords: amountToWords(totals.grandTotal),
    });
  }, [currentDocument]);

  const saveDocument = useCallback(() => {
    if (!currentDocument) return;

    const existingIndex = documents.findIndex(d => d.id === currentDocument.id);
    let updatedDocs: Document[];

    if (existingIndex >= 0) {
      updatedDocs = [...documents];
      updatedDocs[existingIndex] = currentDocument;
    } else {
      updatedDocs = [...documents, currentDocument];
      // Increment counter for new documents
      const updatedSettings = incrementCounter(companySettings, currentDocument.type);
      setCompanySettings(updatedSettings);
    }

    setDocuments(updatedDocs);
    saveDocuments(updatedDocs);
  }, [currentDocument, documents, companySettings]);

  const deleteDocument = useCallback((id: string) => {
    const updated = documents.filter(d => d.id !== id);
    setDocuments(updated);
    saveDocuments(updated);
    if (currentDocument?.id === id) {
      setCurrentDocument(null);
    }
  }, [documents, currentDocument]);

  const loadDocument = useCallback((id: string) => {
    const doc = documents.find(d => d.id === id);
    if (doc) {
      setCurrentDocument(doc);
    }
  }, [documents]);

  return {
    companySettings,
    updateCompanySettings,
    clients,
    addClient,
    updateClient,
    deleteClient,
    documents,
    currentDocument,
    setCurrentDocument,
    createNewDocument,
    updateDocumentField,
    addLineItem,
    updateLineItem,
    removeLineItem,
    updateDiscount,
    saveDocument,
    deleteDocument,
    loadDocument,
    isLoaded,
  };
};
