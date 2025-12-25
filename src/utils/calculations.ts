import { LineItem, GSTRate } from '@/types/invoice';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

export const calculateLineItem = (
  quantity: number,
  rate: number,
  gstRate: GSTRate,
  isInterState: boolean
): Omit<LineItem, 'id' | 'description' | 'hsnSac'> => {
  const amount = quantity * rate;
  const gstAmount = (amount * gstRate) / 100;
  
  let cgst = 0;
  let sgst = 0;
  let igst = 0;

  if (gstRate > 0) {
    if (isInterState) {
      igst = gstAmount;
    } else {
      cgst = gstAmount / 2;
      sgst = gstAmount / 2;
    }
  }

  return {
    quantity,
    rate,
    gstRate,
    amount,
    gstAmount,
    cgst,
    sgst,
    igst,
  };
};

export const calculateTotals = (
  items: LineItem[],
  discountType: 'amount' | 'percentage',
  discountValue: number
) => {
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const discountAmount = discountType === 'percentage' 
    ? (subtotal * discountValue) / 100 
    : discountValue;
  
  const afterDiscount = subtotal - discountAmount;
  
  const cgstTotal = items.reduce((sum, item) => sum + item.cgst, 0);
  const sgstTotal = items.reduce((sum, item) => sum + item.sgst, 0);
  const igstTotal = items.reduce((sum, item) => sum + item.igst, 0);
  
  const totalBeforeRound = afterDiscount + cgstTotal + sgstTotal + igstTotal;
  const roundOff = Math.round(totalBeforeRound) - totalBeforeRound;
  const grandTotal = Math.round(totalBeforeRound);

  return {
    subtotal,
    discountAmount,
    cgstTotal,
    sgstTotal,
    igstTotal,
    roundOff,
    grandTotal,
  };
};

const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
  'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

const numToWords = (num: number): string => {
  if (num === 0) return 'Zero';
  if (num < 0) return 'Minus ' + numToWords(-num);
  
  let words = '';
  
  if (Math.floor(num / 10000000) > 0) {
    words += numToWords(Math.floor(num / 10000000)) + ' Crore ';
    num %= 10000000;
  }
  
  if (Math.floor(num / 100000) > 0) {
    words += numToWords(Math.floor(num / 100000)) + ' Lakh ';
    num %= 100000;
  }
  
  if (Math.floor(num / 1000) > 0) {
    words += numToWords(Math.floor(num / 1000)) + ' Thousand ';
    num %= 1000;
  }
  
  if (Math.floor(num / 100) > 0) {
    words += numToWords(Math.floor(num / 100)) + ' Hundred ';
    num %= 100;
  }
  
  if (num > 0) {
    if (words !== '') words += 'and ';
    if (num < 20) {
      words += ones[num];
    } else {
      words += tens[Math.floor(num / 10)];
      if (num % 10 > 0) {
        words += ' ' + ones[num % 10];
      }
    }
  }
  
  return words.trim();
};

export const amountToWords = (amount: number): string => {
  const rupees = Math.floor(amount);
  const paise = Math.round((amount - rupees) * 100);
  
  let result = 'Rupees ' + numToWords(rupees);
  
  if (paise > 0) {
    result += ' and ' + numToWords(paise) + ' Paise';
  }
  
  return result + ' Only';
};

export const generateDocumentNumber = (prefix: string, counter: number): string => {
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  return `${prefix}-${year}${month}-${String(counter).padStart(4, '0')}`;
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};
