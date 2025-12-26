export type DocumentType = 'invoice' | 'quotation' | 'proforma' | 'bill';

export type GSTRate = 0 | 5 | 12 | 18 | 28;

export type TemplateStyle = 'minimal' | 'corporate' | 'modern' | 'traditional' | 'service';

export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED';

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
  prefixes: {
    invoice: string;
    quotation: string;
    proforma: string;
    bill: string;
  };
  counters: {
    invoice: number;
    quotation: number;
    proforma: number;
    bill: number;
  };
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
];

export const TEMPLATE_STYLES: { value: TemplateStyle; label: string; description: string }[] = [
  { value: 'minimal', label: 'Minimal', description: 'Clean and simple design' },
  { value: 'corporate', label: 'Corporate', description: 'Professional business look' },
  { value: 'modern', label: 'Modern', description: 'Contemporary sleek design' },
  { value: 'traditional', label: 'Traditional GST', description: 'Classic Indian GST format' },
  { value: 'service', label: 'Service Based', description: 'Ideal for service businesses' },
];

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
  prefixes: {
    invoice: 'INV',
    quotation: 'QT',
    proforma: 'PI',
    bill: 'BILL',
  },
  counters: {
    invoice: 1,
    quotation: 1,
    proforma: 1,
    bill: 1,
  },
  defaultGstRate: 18,
  defaultCurrency: 'INR',
  defaultTemplate: 'modern',
};
