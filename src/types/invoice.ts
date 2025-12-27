// Document Types - All billing document types supported
export type DocumentType = 
  | 'sale-invoice' 
  | 'purchase-invoice' 
  | 'quotation' 
  | 'delivery-challan' 
  | 'proforma' 
  | 'purchase-order' 
  | 'sale-order' 
  | 'job-work' 
  | 'credit-note' 
  | 'debit-note' 
  | 'inward-payment' 
  | 'outward-payment';

export type GSTRate = 0 | 5 | 12 | 18 | 28;

export type TemplateStyle = 'minimal' | 'corporate' | 'modern' | 'traditional' | 'service' | 'elegant' | 'compact' | 'detailed';

export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED' | 'SAR' | 'AUD' | 'CAD' | 'SGD' | 'JPY';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  name: string;
}

export const CURRENCIES: Currency[] = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
];

export interface DocumentTypeConfig {
  type: DocumentType;
  label: string;
  shortLabel: string;
  description: string;
  category: 'sales' | 'purchase' | 'orders' | 'adjustments' | 'payments';
  hasGST: boolean;
  hasPayment: boolean;
  hasDueDate: boolean;
}

export const DOCUMENT_TYPES: DocumentTypeConfig[] = [
  // Sales Documents
  { type: 'sale-invoice', label: 'Sale Invoice', shortLabel: 'Sale Inv', description: 'GST Tax Invoice for sales', category: 'sales', hasGST: true, hasPayment: true, hasDueDate: true },
  { type: 'quotation', label: 'Quotation', shortLabel: 'Quote', description: 'Price quotation for customers', category: 'sales', hasGST: true, hasPayment: false, hasDueDate: true },
  { type: 'proforma', label: 'Proforma Invoice', shortLabel: 'Proforma', description: 'Preliminary invoice before sale', category: 'sales', hasGST: true, hasPayment: false, hasDueDate: true },
  { type: 'delivery-challan', label: 'Delivery Challan', shortLabel: 'DC', description: 'Goods delivery document', category: 'sales', hasGST: false, hasPayment: false, hasDueDate: false },
  
  // Purchase Documents
  { type: 'purchase-invoice', label: 'Purchase Invoice', shortLabel: 'Purchase Inv', description: 'Invoice for purchases made', category: 'purchase', hasGST: true, hasPayment: true, hasDueDate: true },
  { type: 'purchase-order', label: 'Purchase Order', shortLabel: 'PO', description: 'Order placed to suppliers', category: 'purchase', hasGST: true, hasPayment: false, hasDueDate: true },
  
  // Orders
  { type: 'sale-order', label: 'Sale Order', shortLabel: 'SO', description: 'Confirmed order from customer', category: 'orders', hasGST: true, hasPayment: false, hasDueDate: true },
  { type: 'job-work', label: 'Job Work', shortLabel: 'Job Work', description: 'Job work challan for processing', category: 'orders', hasGST: false, hasPayment: false, hasDueDate: true },
  
  // Adjustments
  { type: 'credit-note', label: 'Credit Note', shortLabel: 'CN', description: 'Credit adjustment to customer', category: 'adjustments', hasGST: true, hasPayment: false, hasDueDate: false },
  { type: 'debit-note', label: 'Debit Note', shortLabel: 'DN', description: 'Debit adjustment to supplier', category: 'adjustments', hasGST: true, hasPayment: false, hasDueDate: false },
  
  // Payments
  { type: 'inward-payment', label: 'Inward Payment', shortLabel: 'Receipt', description: 'Payment received from customer', category: 'payments', hasGST: false, hasPayment: true, hasDueDate: false },
  { type: 'outward-payment', label: 'Outward Payment', shortLabel: 'Payment', description: 'Payment made to supplier', category: 'payments', hasGST: false, hasPayment: true, hasDueDate: false },
];

export interface CompanySettings {
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  gstin: string;
  pan: string;
  logo?: string;
  signature?: string;
  bankName: string;
  accountNumber: string;
  ifsc: string;
  upiId: string;
  terms: string;
  jurisdiction: string;
  prefixes: Record<DocumentType, string>;
  counters: Record<DocumentType, number>;
  defaultGstRate: GSTRate;
  defaultCurrency: CurrencyCode;
  defaultTemplate: TemplateStyle;
}

export interface Client {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  gstin?: string;
}

export interface LineItem {
  id: string;
  description: string;
  hsnSac: string;
  quantity: number;
  rate: number;
  gstRate: GSTRate;
  amount: number;
  gstAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
}

export interface Document {
  id: string;
  type: DocumentType;
  number: string;
  date: string;
  dueDate: string;
  placeOfSupply: string;
  countryOfSupply: string;
  client: Client;
  items: LineItem[];
  subtotal: number;
  discountType: 'amount' | 'percentage';
  discountValue: number;
  discountAmount: number;
  cgstTotal: number;
  sgstTotal: number;
  igstTotal: number;
  shippingCharges: number;
  roundOff: number;
  grandTotal: number;
  amountInWords: string;
  paymentTerms: string;
  notes: string;
  isInterState: boolean;
  currency: CurrencyCode;
  template: TemplateStyle;
  // For payment documents
  paymentMode?: string;
  referenceNumber?: string;
  // For job work
  processDescription?: string;
}

export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
];

export const GST_RATES: GSTRate[] = [0, 5, 12, 18, 28];

export const PAYMENT_TERMS = [
  'Advance Payment',
  'Due on Receipt',
  'Net 7',
  'Net 15',
  'Net 30',
  'Net 45',
  'Net 60',
  'Net 90',
];

export const PAYMENT_MODES = [
  'Cash',
  'Bank Transfer',
  'UPI',
  'Cheque',
  'Credit Card',
  'Debit Card',
  'NEFT',
  'RTGS',
  'IMPS',
  'Online Banking',
];

export const TEMPLATE_STYLES: { value: TemplateStyle; label: string; description: string }[] = [
  { value: 'minimal', label: 'Minimal', description: 'Clean and simple design' },
  { value: 'corporate', label: 'Corporate', description: 'Professional business look' },
  { value: 'modern', label: 'Modern', description: 'Contemporary sleek design' },
  { value: 'traditional', label: 'Traditional GST', description: 'Classic Indian GST format' },
  { value: 'service', label: 'Service Based', description: 'Ideal for service businesses' },
  { value: 'elegant', label: 'Elegant', description: 'Premium sophisticated style' },
  { value: 'compact', label: 'Compact', description: 'Space-efficient layout' },
  { value: 'detailed', label: 'Detailed', description: 'Comprehensive with all fields' },
];

export const DEFAULT_PREFIXES: Record<DocumentType, string> = {
  'sale-invoice': 'SI',
  'purchase-invoice': 'PI',
  'quotation': 'QT',
  'delivery-challan': 'DC',
  'proforma': 'PF',
  'purchase-order': 'PO',
  'sale-order': 'SO',
  'job-work': 'JW',
  'credit-note': 'CN',
  'debit-note': 'DN',
  'inward-payment': 'IP',
  'outward-payment': 'OP',
};

export const DEFAULT_COUNTERS: Record<DocumentType, number> = {
  'sale-invoice': 1,
  'purchase-invoice': 1,
  'quotation': 1,
  'delivery-challan': 1,
  'proforma': 1,
  'purchase-order': 1,
  'sale-order': 1,
  'job-work': 1,
  'credit-note': 1,
  'debit-note': 1,
  'inward-payment': 1,
  'outward-payment': 1,
};

export const DEFAULT_COMPANY_SETTINGS: CompanySettings = {
  name: '',
  address: '',
  city: '',
  state: 'Maharashtra',
  pincode: '',
  phone: '',
  email: '',
  gstin: '',
  pan: '',
  logo: undefined,
  signature: undefined,
  bankName: '',
  accountNumber: '',
  ifsc: '',
  upiId: '',
  terms: 'Goods once sold will not be taken back.\nPayment is due within the terms mentioned above.\nSubject to jurisdiction mentioned.',
  jurisdiction: 'Mumbai',
  prefixes: DEFAULT_PREFIXES,
  counters: DEFAULT_COUNTERS,
  defaultGstRate: 18,
  defaultCurrency: 'INR',
  defaultTemplate: 'modern',
};

// Helper function to get document type config
export const getDocumentTypeConfig = (type: DocumentType): DocumentTypeConfig => {
  return DOCUMENT_TYPES.find(d => d.type === type) || DOCUMENT_TYPES[0];
};

// Helper function to get document types by category
export const getDocumentTypesByCategory = (category: string): DocumentTypeConfig[] => {
  return DOCUMENT_TYPES.filter(d => d.category === category);
};
