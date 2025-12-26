import { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { DocumentType, CURRENCIES, TEMPLATE_STYLES, CurrencyCode, TemplateStyle } from '@/types/invoice';
import { useInvoiceStore } from '@/hooks/useInvoiceStore';
import { MainLayout } from '@/components/layout/MainLayout';
import { LocalStorageWarning } from '@/components/common/LocalStorageWarning';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DocumentHeader } from '@/components/invoice/DocumentHeader';
import { DocumentTitle } from '@/components/invoice/DocumentTitle';
import { PartyDetails } from '@/components/invoice/PartyDetails';
import { ItemsTable } from '@/components/invoice/ItemsTable';
import { TotalsSection } from '@/components/invoice/TotalsSection';
import { PaymentDetails } from '@/components/invoice/PaymentDetails';
import { TermsFooter } from '@/components/invoice/TermsFooter';
import { DocumentPreview } from '@/components/invoice/DocumentPreview';
import { SavedDocuments } from '@/components/invoice/SavedDocuments';
import {
  FileText,
  FileCheck,
  FileClock,
  Receipt,
  Printer,
  Save,
  Eye,
  ArrowLeft,
  Palette,
  DollarSign,
  Truck,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const DOC_TYPE_INFO: Record<DocumentType, { label: string; icon: React.ReactNode }> = {
  invoice: { label: 'Tax Invoice', icon: <FileText className="h-5 w-5" /> },
  quotation: { label: 'Quotation', icon: <FileCheck className="h-5 w-5" /> },
  proforma: { label: 'Proforma Invoice', icon: <FileClock className="h-5 w-5" /> },
  bill: { label: 'Bill / Receipt', icon: <Receipt className="h-5 w-5" /> },
};

const CreateDocument = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const docType = (type as DocumentType) || 'invoice';
  
  const {
    companySettings,
    documents,
    currentDocument,
    createNewDocument,
    updateDocumentField,
    addLineItem,
    updateLineItem,
    removeLineItem,
    updateDiscount,
    saveDocument,
    loadDocument,
    deleteDocument,
    isLoaded,
    setCurrentDocument,
  } = useInvoiceStore();

  const [showPreview, setShowPreview] = useState(false);
  const [shippingCharges, setShippingCharges] = useState(0);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoaded && !currentDocument) {
      createNewDocument(docType);
    } else if (isLoaded && currentDocument && currentDocument.type !== docType) {
      createNewDocument(docType);
    }
  }, [isLoaded, docType, createNewDocument, currentDocument]);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: currentDocument?.number || 'Document',
  });

  const handleSave = () => {
    if (!currentDocument) return;
    if (!currentDocument.client.name) {
      toast.error('Please enter client name');
      return;
    }
    if (currentDocument.items.length === 0) {
      toast.error('Please add at least one item');
      return;
    }
    saveDocument();
    toast.success('Document saved successfully');
  };

  const handleCurrencyChange = (currency: CurrencyCode) => {
    if (currentDocument) {
      updateDocumentField('currency', currency);
    }
  };

  const handleTemplateChange = (template: TemplateStyle) => {
    if (currentDocument) {
      updateDocumentField('template', template);
    }
  };

  const handleShippingChange = (value: number) => {
    setShippingCharges(value);
    if (currentDocument) {
      updateDocumentField('shippingCharges', value);
    }
  };

  if (!isLoaded) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </MainLayout>
    );
  }

  const docInfo = DOC_TYPE_INFO[docType];

  return (
    <MainLayout>
      <LocalStorageWarning />
      
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="shrink-0"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shadow-lg">
                  {docInfo.icon}
                </div>
                <div>
                  <h1 className="font-bold text-lg text-foreground">{docInfo.label}</h1>
                  <p className="text-xs text-muted-foreground">
                    {currentDocument?.number || 'New Document'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <SavedDocuments 
                documents={documents.filter(d => d.type === docType)} 
                onLoad={loadDocument} 
                onDelete={deleteDocument} 
              />
              
              {currentDocument && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPreview(true)}
                    className="gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="hidden sm:inline">Preview</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePrint()}
                    className="gap-2"
                  >
                    <Printer className="h-4 w-4" />
                    <span className="hidden sm:inline">Print</span>
                  </Button>

                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={handleSave}
                    className="gap-2"
                  >
                    <Save className="h-4 w-4" />
                    <span className="hidden sm:inline">Save</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {currentDocument && (
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Settings Panel */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="sticky top-24 space-y-4">
                <Card className="glass border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      Document Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Currency */}
                    <div className="space-y-2">
                      <Label className="text-xs flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        Currency
                      </Label>
                      <Select
                        value={currentDocument.currency || 'INR'}
                        onValueChange={(value) => handleCurrencyChange(value as CurrencyCode)}
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CURRENCIES.map((currency) => (
                            <SelectItem key={currency.code} value={currency.code}>
                              {currency.symbol} {currency.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Template */}
                    <div className="space-y-2">
                      <Label className="text-xs flex items-center gap-1">
                        <Palette className="h-3 w-3" />
                        Template Style
                      </Label>
                      <Select
                        value={currentDocument.template || 'modern'}
                        onValueChange={(value) => handleTemplateChange(value as TemplateStyle)}
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {TEMPLATE_STYLES.map((template) => (
                            <SelectItem key={template.value} value={template.value}>
                              {template.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Shipping Charges */}
                    <div className="space-y-2">
                      <Label className="text-xs flex items-center gap-1">
                        <Truck className="h-3 w-3" />
                        Shipping Charges
                      </Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={currentDocument.shippingCharges || 0}
                        onChange={(e) => handleShippingChange(parseFloat(e.target.value) || 0)}
                        className="h-9 font-mono"
                        placeholder="0.00"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* GST Info */}
                <Card className="glass border-border/50">
                  <CardContent className="p-4">
                    <div className="text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">GST Type:</span>
                        <span className="font-medium text-foreground">
                          {currentDocument.isInterState ? 'IGST' : 'CGST + SGST'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Place of Supply:</span>
                        <span className="font-medium text-foreground truncate max-w-[120px]">
                          {currentDocument.placeOfSupply}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Document Editor */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="document-container mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in max-w-full overflow-x-auto">
                <DocumentHeader settings={companySettings} />

                <DocumentTitle
                  type={currentDocument.type}
                  number={currentDocument.number}
                  date={currentDocument.date}
                  dueDate={currentDocument.dueDate}
                  placeOfSupply={currentDocument.placeOfSupply}
                  countryOfSupply={currentDocument.countryOfSupply}
                  onNumberChange={(value) => updateDocumentField('number', value)}
                  onDateChange={(value) => updateDocumentField('date', value)}
                  onDueDateChange={(value) => updateDocumentField('dueDate', value)}
                  onPlaceOfSupplyChange={(value) => updateDocumentField('placeOfSupply', value)}
                />

                <PartyDetails
                  seller={companySettings}
                  client={currentDocument.client}
                  onClientChange={(client) => updateDocumentField('client', client)}
                />

                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <div className="min-w-[600px] px-4 sm:px-0">
                    <ItemsTable
                      items={currentDocument.items}
                      isInterState={currentDocument.isInterState}
                      onAddItem={addLineItem}
                      onUpdateItem={updateLineItem}
                      onRemoveItem={removeLineItem}
                    />
                  </div>
                </div>

                <TotalsSection
                  subtotal={currentDocument.subtotal}
                  discountType={currentDocument.discountType}
                  discountValue={currentDocument.discountValue}
                  discountAmount={currentDocument.discountAmount}
                  cgstTotal={currentDocument.cgstTotal}
                  sgstTotal={currentDocument.sgstTotal}
                  igstTotal={currentDocument.igstTotal}
                  shippingCharges={currentDocument.shippingCharges || 0}
                  roundOff={currentDocument.roundOff}
                  grandTotal={currentDocument.grandTotal}
                  amountInWords={currentDocument.amountInWords}
                  isInterState={currentDocument.isInterState}
                  onDiscountChange={updateDiscount}
                />

                <PaymentDetails
                  settings={companySettings}
                  paymentTerms={currentDocument.paymentTerms}
                  onPaymentTermsChange={(value) => updateDocumentField('paymentTerms', value)}
                />

                <TermsFooter
                  settings={companySettings}
                  notes={currentDocument.notes}
                  onNotesChange={(value) => updateDocumentField('notes', value)}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hidden Print Container */}
      <div className="hidden">
        {currentDocument && (
          <DocumentPreview
            ref={printRef}
            document={currentDocument}
            settings={companySettings}
          />
        )}
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Document Preview</DialogTitle>
          </DialogHeader>
          {currentDocument && (
            <div className="border rounded-lg overflow-hidden">
              <DocumentPreview
                document={currentDocument}
                settings={companySettings}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default CreateDocument;
