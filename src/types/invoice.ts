export type DocumentType = 'invoice' | 'quotation' | 'proforma' | 'bill';

export type GSTRate = 0 | 5 | 12 | 18 | 28;

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
  roundOff: number;
  grandTotal: number;
  amountInWords: string;
  paymentTerms: string;
  notes: string;
  isInterState: boolean;
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
};
