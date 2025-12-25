import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatCurrency, formatNumber } from '@/utils/calculations';

interface TotalsSectionProps {
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
  isInterState: boolean;
  onDiscountChange: (type: 'amount' | 'percentage', value: number) => void;
  isPrintMode?: boolean;
}

export const TotalsSection = ({
  subtotal,
  discountType,
  discountValue,
  discountAmount,
  cgstTotal,
  sgstTotal,
  igstTotal,
  roundOff,
  grandTotal,
  amountInWords,
  isInterState,
  onDiscountChange,
  isPrintMode = false,
}: TotalsSectionProps) => {
  return (
    <div className="flex justify-end mb-8">
      <div className="w-[420px]">
        <div className="glass rounded-2xl p-6 space-y-4">
          {/* Subtotal */}
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-mono text-foreground">{formatCurrency(subtotal)}</span>
          </div>

          {/* Discount */}
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Discount</span>
            {isPrintMode ? (
              <span className="font-mono text-destructive">
                {discountAmount > 0 ? `- ${formatCurrency(discountAmount)}` : '₹0.00'}
              </span>
            ) : (
              <div className="flex items-center gap-2">
                <Select
                  value={discountType}
                  onValueChange={(value) => onDiscountChange(value as 'amount' | 'percentage', discountValue)}
                >
                  <SelectTrigger className="w-20 h-9 rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="amount">₹</SelectItem>
                    <SelectItem value="percentage">%</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={discountValue}
                  onChange={(e) => onDiscountChange(discountType, parseFloat(e.target.value) || 0)}
                  className="w-28 h-9 text-right font-mono rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-border/50" />

          {/* GST Breakup */}
          {isInterState ? (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">IGST</span>
              <span className="font-mono text-foreground">{formatCurrency(igstTotal)}</span>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">CGST</span>
                <span className="font-mono text-foreground">{formatCurrency(cgstTotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">SGST</span>
                <span className="font-mono text-foreground">{formatCurrency(sgstTotal)}</span>
              </div>
            </>
          )}

          {/* Round Off */}
          {roundOff !== 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Round Off</span>
              <span className="font-mono text-foreground">
                {roundOff > 0 ? '+' : ''}{formatNumber(roundOff)}
              </span>
            </div>
          )}

          {/* Grand Total */}
          <div className="border-t border-border/50 pt-4 mt-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg text-foreground">Grand Total</span>
              <span className="font-bold text-2xl font-mono gradient-text">
                {formatCurrency(grandTotal)}
              </span>
            </div>
          </div>
        </div>

        {/* Amount in Words */}
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20">
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Amount in Words</p>
          <p className="text-sm font-medium text-foreground">{amountInWords}</p>
        </div>
      </div>
    </div>
  );
};
