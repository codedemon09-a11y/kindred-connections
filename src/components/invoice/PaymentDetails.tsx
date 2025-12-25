import { CompanySettings, PAYMENT_TERMS } from '@/types/invoice';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PaymentDetailsProps {
  settings: CompanySettings;
  paymentTerms: string;
  onPaymentTermsChange: (value: string) => void;
  isPrintMode?: boolean;
}

export const PaymentDetails = ({
  settings,
  paymentTerms,
  onPaymentTermsChange,
  isPrintMode = false,
}: PaymentDetailsProps) => {
  const hasBankDetails = settings.bankName || settings.accountNumber || settings.ifsc;
  const hasUpi = settings.upiId;

  if (!hasBankDetails && !hasUpi) {
    return null;
  }

  return (
    <div className="border-t border-border pt-6 mb-6">
      <h3 className="section-title mb-4">Payment Details</h3>
      
      <div className="grid grid-cols-2 gap-8">
        {/* Bank Details */}
        {hasBankDetails && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground mb-3">Bank Transfer</h4>
            {settings.bankName && (
              <div className="flex gap-2 text-sm">
                <span className="text-muted-foreground w-32">Bank Name:</span>
                <span className="font-medium">{settings.bankName}</span>
              </div>
            )}
            {settings.accountNumber && (
              <div className="flex gap-2 text-sm">
                <span className="text-muted-foreground w-32">Account No:</span>
                <span className="font-mono font-medium">{settings.accountNumber}</span>
              </div>
            )}
            {settings.ifsc && (
              <div className="flex gap-2 text-sm">
                <span className="text-muted-foreground w-32">IFSC Code:</span>
                <span className="font-mono font-medium">{settings.ifsc}</span>
              </div>
            )}
          </div>
        )}

        {/* UPI & Payment Terms */}
        <div className="space-y-3">
          {hasUpi && (
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">UPI Payment</h4>
              <div className="flex gap-2 text-sm">
                <span className="text-muted-foreground">UPI ID:</span>
                <span className="font-mono font-medium">{settings.upiId}</span>
              </div>
            </div>
          )}
          
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Payment Terms</h4>
            {isPrintMode ? (
              <span className="text-sm font-medium">{paymentTerms}</span>
            ) : (
              <Select value={paymentTerms} onValueChange={onPaymentTermsChange}>
                <SelectTrigger className="w-48 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAYMENT_TERMS.map((term) => (
                    <SelectItem key={term} value={term}>
                      {term}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
