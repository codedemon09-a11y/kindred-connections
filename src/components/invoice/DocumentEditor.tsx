import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { DocumentType } from '@/types/invoice';
import { useInvoiceStore } from '@/hooks/useInvoiceStore';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DocumentHeader } from './DocumentHeader';
import { DocumentTitle } from './DocumentTitle';
import { PartyDetails } from './PartyDetails';
import { ItemsTable } from './ItemsTable';
import { TotalsSection } from './TotalsSection';
import { PaymentDetails } from './PaymentDetails';
import { TermsFooter } from './TermsFooter';
import { SettingsPanel } from './SettingsPanel';
import { DocumentPreview } from './DocumentPreview';
import { SavedDocuments } from './SavedDocuments';
import Footer from '@/components/Footer';
import {
  FileText,
  FileCheck,
  FileClock,
  Receipt,
  Printer,
  Save,
  Plus,
  Eye,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const DOC_TYPES: { type: DocumentType; label: string; icon: React.ReactNode }[] = [
  { type: 'invoice', label: 'Tax Invoice', icon: <FileText className="h-4 w-4" /> },
  { type: 'quotation', label: 'Quotation', icon: <FileCheck className="h-4 w-4" /> },
  { type: 'proforma', label: 'Proforma', icon: <FileClock className="h-4 w-4" /> },
  { type: 'bill', label: 'Bill', icon: <Receipt className="h-4 w-4" /> },
];

export const DocumentEditor = () => {
  const {
    companySettings,
    updateCompanySettings,
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
  } = useInvoiceStore();

  const [activeDocType, setActiveDocType] = useState<DocumentType>('invoice');
  const [showPreview, setShowPreview] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: currentDocument?.number || 'Document',
  });

  const handleCreateNew = (type: DocumentType) => {
    createNewDocument(type);
    setActiveDocType(type);
    toast.success(`New ${type} created`);
  };

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

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 group">
                <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-xl group-hover:shadow-primary/40 transition-all duration-300">
                  <FileText className="h-5 w-5 text-primary-foreground" />
                  <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div>
                  <h1 className="font-bold text-lg text-foreground tracking-tight">
                    GST Invoice Pro
                  </h1>
                  <p className="text-xs text-muted-foreground">Professional Billing</p>
                </div>
              </div>

              {/* Document Type Tabs */}
              <Tabs value={activeDocType} onValueChange={(v) => setActiveDocType(v as DocumentType)}>
                <TabsList className="bg-secondary/50 backdrop-blur-sm border border-border/50 p-1 rounded-xl">
                  {DOC_TYPES.map(({ type, label, icon }) => (
                    <TabsTrigger 
                      key={type} 
                      value={type} 
                      className="gap-2 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-lg data-[state=active]:shadow-primary/10 transition-all duration-200"
                    >
                      {icon}
                      <span className="hidden sm:inline">{label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            <div className="flex items-center gap-2">
              <SavedDocuments 
                documents={documents} 
                onLoad={loadDocument} 
                onDelete={deleteDocument} 
              />
              <SettingsPanel settings={companySettings} onSave={updateCompanySettings} />
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCreateNew(activeDocType)}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                New
              </Button>

              {currentDocument && (
                <>
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={() => setShowPreview(true)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={() => handlePrint()}
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>

                  <Button 
                    variant="premium" 
                    size="sm" 
                    onClick={handleSave}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        {!currentDocument ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
            <div className="relative mb-8">
              <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center animate-float">
                <FileText className="h-12 w-12 text-primary" />
              </div>
              <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl opacity-60 animate-pulse-glow" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-3 tracking-tight">
              Create Your First Document
            </h2>
            <p className="text-muted-foreground text-center max-w-lg mb-10 text-lg leading-relaxed">
              Generate professional GST-compliant invoices, quotations, proforma invoices, and bills with automatic tax calculations.
            </p>
            <div className="flex flex-wrap justify-center gap-4 stagger-children">
              {DOC_TYPES.map(({ type, label, icon }) => (
                <Button
                  key={type}
                  variant="outline"
                  size="lg"
                  onClick={() => handleCreateNew(type)}
                  className="gap-3 group card-hover"
                >
                  <span className="group-hover:scale-110 transition-transform duration-200">
                    {icon}
                  </span>
                  Create {label}
                </Button>
              ))}
            </div>

            {/* Setup Reminder */}
            {!companySettings.name && (
              <div className="mt-10 p-5 glass border border-warning/30 rounded-2xl max-w-md animate-slide-up">
                <p className="text-sm text-warning">
                  <strong>💡 Tip:</strong> Set up your company details in Settings before creating documents.
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Document Editor */
          <div className="document-container mx-auto p-8 animate-fade-in">
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

            <ItemsTable
              items={currentDocument.items}
              isInterState={currentDocument.isInterState}
              onAddItem={addLineItem}
              onUpdateItem={updateLineItem}
              onRemoveItem={removeLineItem}
            />

            <TotalsSection
              subtotal={currentDocument.subtotal}
              discountType={currentDocument.discountType}
              discountValue={currentDocument.discountValue}
              discountAmount={currentDocument.discountAmount}
              cgstTotal={currentDocument.cgstTotal}
              sgstTotal={currentDocument.sgstTotal}
              igstTotal={currentDocument.igstTotal}
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
        )}
      </main>

      <Footer />

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
    </div>
  );
};
