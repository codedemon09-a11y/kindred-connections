import { LineItem, GSTRate, GST_RATES } from '@/types/invoice';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import { formatCurrency, formatNumber } from '@/utils/calculations';

interface ItemsTableProps {
  items: LineItem[];
  isInterState: boolean;
  onAddItem: () => void;
  onUpdateItem: (itemId: string, field: keyof LineItem, value: string | number) => void;
  onRemoveItem: (itemId: string) => void;
  isPrintMode?: boolean;
}

export const ItemsTable = ({
  items,
  isInterState,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
  isPrintMode = false,
}: ItemsTableProps) => {
  return (
    <div className="mb-8">
      <div className="glass border border-border/50 rounded-2xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted/30">
              <th className="w-12 text-center py-4 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">#</th>
              <th className="min-w-[200px] text-left py-4 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</th>
              <th className="w-24 text-left py-4 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">HSN/SAC</th>
              <th className="w-20 text-right py-4 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Qty</th>
              <th className="w-28 text-right py-4 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Rate (₹)</th>
              <th className="w-24 text-right py-4 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">GST %</th>
              {isInterState ? (
                <th className="w-28 text-right py-4 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">IGST (₹)</th>
              ) : (
                <>
                  <th className="w-24 text-right py-4 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">CGST (₹)</th>
                  <th className="w-24 text-right py-4 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">SGST (₹)</th>
                </>
              )}
              <th className="w-32 text-right py-4 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Amount (₹)</th>
              {!isPrintMode && <th className="w-12"></th>}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr 
                key={item.id} 
                className={`group transition-colors duration-200 ${index % 2 === 1 ? 'bg-muted/10' : ''} hover:bg-accent/30`}
              >
                <td className="text-center py-4 px-4 text-muted-foreground font-mono text-sm">{index + 1}</td>
                <td className="py-3 px-4">
                  {isPrintMode ? (
                    <span className="text-sm text-foreground">{item.description}</span>
                  ) : (
                    <Input
                      value={item.description}
                      onChange={(e) => onUpdateItem(item.id, 'description', e.target.value)}
                      placeholder="Item description"
                      className="border-0 bg-transparent h-9 focus-visible:ring-1 focus-visible:ring-primary/50 rounded-lg transition-all"
                    />
                  )}
                </td>
                <td className="py-3 px-4">
                  {isPrintMode ? (
                    <span className="font-mono text-xs text-muted-foreground">{item.hsnSac}</span>
                  ) : (
                    <Input
                      value={item.hsnSac}
                      onChange={(e) => onUpdateItem(item.id, 'hsnSac', e.target.value)}
                      placeholder="HSN"
                      className="border-0 bg-transparent h-9 focus-visible:ring-1 focus-visible:ring-primary/50 font-mono text-xs rounded-lg transition-all"
                    />
                  )}
                </td>
                <td className="text-right py-3 px-2">
                  {isPrintMode ? (
                    <span className="font-mono text-sm text-foreground">{item.quantity}</span>
                  ) : (
                    <Input
                      type="number"
                      min="0"
                      step="1"
                      value={item.quantity}
                      onChange={(e) => onUpdateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      className="border border-border/50 bg-background/50 h-9 focus-visible:ring-1 focus-visible:ring-primary/50 text-right font-mono text-foreground rounded-lg transition-all w-20"
                    />
                  )}
                </td>
                <td className="text-right py-3 px-2">
                  {isPrintMode ? (
                    <span className="font-mono text-sm text-foreground">{formatNumber(item.rate)}</span>
                  ) : (
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.rate}
                      onChange={(e) => onUpdateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                      className="border border-border/50 bg-background/50 h-9 focus-visible:ring-1 focus-visible:ring-primary/50 text-right font-mono text-foreground rounded-lg transition-all w-28"
                    />
                  )}
                </td>
                <td className="text-right py-3 px-4">
                  {isPrintMode ? (
                    <span className="font-mono text-sm">{item.gstRate}%</span>
                  ) : (
                    <Select
                      value={String(item.gstRate)}
                      onValueChange={(value) => onUpdateItem(item.id, 'gstRate', parseInt(value) as GSTRate)}
                    >
                      <SelectTrigger className="border-0 bg-transparent h-9 focus:ring-1 focus:ring-primary/50 rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {GST_RATES.map((rate) => (
                          <SelectItem key={rate} value={String(rate)}>
                            {rate}%
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </td>
                {isInterState ? (
                  <td className="text-right font-mono text-sm py-4 px-4 text-muted-foreground">{formatNumber(item.igst)}</td>
                ) : (
                  <>
                    <td className="text-right font-mono text-sm py-4 px-4 text-muted-foreground">{formatNumber(item.cgst)}</td>
                    <td className="text-right font-mono text-sm py-4 px-4 text-muted-foreground">{formatNumber(item.sgst)}</td>
                  </>
                )}
                <td className="text-right font-semibold font-mono text-sm py-4 px-4 text-foreground">
                  {formatNumber(item.amount + item.gstAmount)}
                </td>
                {!isPrintMode && (
                  <td className="text-center py-3 px-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveItem(item.id)}
                      className="h-8 w-8 text-destructive/60 hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                )}
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={isInterState ? 8 : 9} className="text-center py-12 text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center">
                      <Plus className="h-6 w-6 text-muted-foreground/50" />
                    </div>
                    <p>No items added yet</p>
                    <p className="text-sm">Click "Add Item" to begin</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {!isPrintMode && (
        <Button
          variant="outline"
          onClick={onAddItem}
          className="mt-4 gap-2 group"
        >
          <Plus className="h-4 w-4 group-hover:scale-110 transition-transform" />
          Add Item
        </Button>
      )}
    </div>
  );
};
