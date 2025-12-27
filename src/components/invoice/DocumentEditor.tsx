import { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useParams, useNavigate } from 'react-router-dom';
import { DocumentType, DOCUMENT_TYPES, getDocumentTypeConfig } from '@/types/invoice';
import { useInvoiceStore } from '@/hooks/useInvoiceStore';
import { Button } from '@/components/ui/button';
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
import AdSense from '@/components/AdSense';
import {
  FileText,
  Printer,
  Save,
  Plus,
  Eye,
  ArrowLeft,
  Settings,
  Menu,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export const DocumentEditor = () => {
  const { type } = useParams<{ type?: string }>();
  const navigate = useNavigate();
  
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
    setCurrentDocument,
    isLoaded,
  } = useInvoiceStore();

  const [showPreview, setShowPreview] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  // Get current document type from URL or default
  const currentDocType = (type as DocumentType) || 'sale-invoice';
  const docTypeConfig = getDocumentTypeConfig(currentDocType);

  // Auto-create document when navigating to a create page
  useEffect(() => {
    if (type && !currentDocument) {
      createNewDocument(currentDocType);
    }
  }, [type, currentDocument, createNewDocument, currentDocType]);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: currentDocument?.number || 'Document',
  });

  const handleCreateNew = () => {
    createNewDocument(currentDocType);
    toast.success(`New ${docTypeConfig.label} created`);
  };

  const handleSave = () => {
    if (!currentDocument) return;
    if (!currentDocument.client.name) {
      toast.error('Please enter client/party name');
      return;
    }
    if (currentDocument.items.length === 0 && docTypeConfig.hasGST) {
      toast.error('Please add at least one item');
      return;
    }
    saveDocument();
    toast.success('Document saved successfully');
  };

  const handleQuickCreate = (docType: DocumentType) => {
    setCurrentDocument(null);
    navigate(`/create/${docType}`);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Group document types by category for the dropdown
  const groupedDocTypes = DOCUMENT_TYPES.reduce((acc, doc) => {
    if (!acc[doc.category]) acc[doc.category] = [];
    acc[doc.category].push(doc);
    return acc;
  }, {} as Record<string, typeof DOCUMENT_TYPES>);

  const categoryLabels: Record<string, string> = {
    sales: 'Sales Documents',
    purchase: 'Purchase Documents',
    orders: 'Orders & Jobs',
    adjustments: 'Adjustments',
    payments: 'Payments',
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Header - Responsive */}
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            {/* Left side - Title and back */}
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="shrink-0"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              
              <div className="hidden sm:flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shadow-lg shrink-0">
                  <FileText className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="min-w-0">
                  <h1 className="font-bold text-sm text-foreground truncate">
                    {docTypeConfig.label}
                  </h1>
                  <p className="text-xs text-muted-foreground truncate">{docTypeConfig.description}</p>
                </div>
              </div>

              {/* Mobile title */}
              <span className="sm:hidden font-semibold text-sm truncate">
                {docTypeConfig.shortLabel}
              </span>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* Quick Create Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1 sm:gap-2">
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">New</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {Object.entries(groupedDocTypes).map(([category, docs]) => (
                    <div key={category}>
                      <DropdownMenuLabel className="text-xs text-muted-foreground">
                        {categoryLabels[category]}
                      </DropdownMenuLabel>
                      {docs.map((doc) => (
                        <DropdownMenuItem 
                          key={doc.type} 
                          onClick={() => handleQuickCreate(doc.type)}
                          className="cursor-pointer"
                        >
                          {doc.label}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <SavedDocuments 
                documents={documents.filter(d => d.type === currentDocType)} 
                onLoad={loadDocument} 
                onDelete={deleteDocument} 
              />

              {/* Mobile menu for more actions */}
              <div className="sm:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Menu className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setShowSettings(true)}>
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    {currentDocument && (
                      <>
                        <DropdownMenuItem onClick={() => setShowPreview(true)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handlePrint()}>
                          <Printer className="h-4 w-4 mr-2" />
                          Print
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSave}>
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Desktop actions */}
              <div className="hidden sm:flex items-center gap-2">
                <SettingsPanel settings={companySettings} onSave={updateCompanySettings} />

                {currentDocument && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPreview(true)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePrint()}
                    >
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </Button>

                    <Button 
                      variant="default" 
                      size="sm" 
                      onClick={handleSave}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 relative z-10 flex-1">
        {!currentDocument ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-12 sm:py-24 animate-fade-in">
            <div className="relative mb-8">
              <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-3xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 tracking-tight text-center">
              Create {docTypeConfig.label}
            </h2>
            <p className="text-muted-foreground text-center max-w-lg mb-8 sm:mb-10 text-base sm:text-lg leading-relaxed px-4">
              {docTypeConfig.description}. Generate professional, GST-compliant documents.
            </p>
            <Button
              size="lg"
              onClick={handleCreateNew}
              className="gap-3"
            >
              <Plus className="h-5 w-5" />
              Create {docTypeConfig.label}
            </Button>

            {/* Setup Reminder */}
            {!companySettings.name && (
              <div className="mt-8 p-4 sm:p-5 glass border border-warning/30 rounded-2xl max-w-md mx-4">
                <p className="text-sm text-warning text-center">
                  <strong>💡 Tip:</strong> Set up your company details in Settings before creating documents.
                </p>
              </div>
            )}

            <div className="mt-12 w-full max-w-3xl px-4">
              <AdSense />
            </div>
          </div>
        ) : (
          /* Document Editor */
          <div className={cn(
            "bg-card shadow-2xl border border-border/50 rounded-2xl mx-auto p-4 sm:p-8 animate-fade-in",
            "w-full max-w-4xl"
          )}>
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
              showDueDate={docTypeConfig.hasDueDate}
            />

            <PartyDetails
              seller={companySettings}
              client={currentDocument.client}
              onClientChange={(client) => updateDocumentField('client', client)}
              partyLabel={['purchase-invoice', 'purchase-order', 'outward-payment'].includes(currentDocument.type) ? 'Supplier' : 'Customer'}
            />

            {docTypeConfig.hasGST && (
              <>
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
                  shippingCharges={currentDocument.shippingCharges}
                  roundOff={currentDocument.roundOff}
                  grandTotal={currentDocument.grandTotal}
                  amountInWords={currentDocument.amountInWords}
                  isInterState={currentDocument.isInterState}
                  onDiscountChange={updateDiscount}
                  onShippingChange={(value) => updateDocumentField('shippingCharges', value)}
                />
              </>
            )}

            {!docTypeConfig.hasGST && (
              <div className="my-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  This document type does not include GST calculations.
                </p>
              </div>
            )}

            {docTypeConfig.hasPayment && (
              <PaymentDetails
                settings={companySettings}
                paymentTerms={currentDocument.paymentTerms}
                onPaymentTermsChange={(value) => updateDocumentField('paymentTerms', value)}
              />
            )}

            <TermsFooter
              settings={companySettings}
              notes={currentDocument.notes}
              onNotesChange={(value) => updateDocumentField('notes', value)}
            />

            {/* Mobile Save Button */}
            <div className="sm:hidden mt-6 pt-4 border-t border-border">
              <Button 
                onClick={handleSave} 
                className="w-full"
                size="lg"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Document
              </Button>
            </div>
          </div>
        )}
      </main>

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

      {/* Settings Dialog for Mobile */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <SettingsPanel 
            settings={companySettings} 
            onSave={updateCompanySettings}
            embedded
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
