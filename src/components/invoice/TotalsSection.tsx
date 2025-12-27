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
  shippingCharges?: number;
  roundOff: number;
  grandTotal: number;
  amountInWords: string;
  isInterState: boolean;
  onDiscountChange: (type: 'amount' | 'percentage', value: number) => void;
  onShippingChange?: (value: number) => void;
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
  shippingCharges = 0,
  roundOff,
  grandTotal,
  amountInWords,
  isInterState,
  onDiscountChange,
  onShippingChange,
  isPrintMode = false,
}: TotalsSectionProps) => {
  return (
    <div className="flex justify-end mb-6 sm:mb-8">
      <div className="w-full sm:w-[420px]">
        <div className="glass rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4">
          {/* Subtotal */}
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm sm:text-base">Subtotal</span>
            <span className="font-mono text-foreground">{formatCurrency(subtotal)}</span>
          </div>

          {/* Discount */}
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm sm:text-base">Discount</span>
            {isPrintMode ? (
              <span className="font-mono text-destructive">
                {discountAmount > 0 ? `- ${formatCurrency(discountAmount)}` : '₹0.00'}
              </span>
            ) : (
              <div className="flex items-center gap-1 sm:gap-2">
                <Select
                  value={discountType}
                  onValueChange={(value) => onDiscountChange(value as 'amount' | 'percentage', discountValue)}
                >
                  <SelectTrigger className="w-16 sm:w-20 h-9 rounded-lg text-xs sm:text-sm">
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
                  className="w-20 sm:w-28 h-9 text-right font-mono rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Shipping Charges */}
          {onShippingChange && (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm sm:text-base">Shipping</span>
              {isPrintMode ? (
                <span className="font-mono text-foreground">{formatCurrency(shippingCharges)}</span>
              ) : (
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={shippingCharges}
                  onChange={(e) => onShippingChange(parseFloat(e.target.value) || 0)}
                  className="w-24 sm:w-32 h-9 text-right font-mono rounded-lg"
                  placeholder="0.00"
                />
              )}
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-border/50" />

          {/* GST Breakup */}
          {isInterState ? (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm sm:text-base">IGST</span>
              <span className="font-mono text-foreground">{formatCurrency(igstTotal)}</span>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm sm:text-base">CGST</span>
                <span className="font-mono text-foreground">{formatCurrency(cgstTotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm sm:text-base">SGST</span>
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
              <span className="font-semibold text-base sm:text-lg text-foreground">Grand Total</span>
              <span className="font-bold text-xl sm:text-2xl font-mono gradient-text">
                {formatCurrency(grandTotal)}
              </span>
            </div>
          </div>
        </div>

        {/* Amount in Words */}
        <div className="mt-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20">
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Amount in Words</p>
          <p className="text-sm font-medium text-foreground">{amountInWords}</p>
        </div>
      </div>
    </div>
  );
};
