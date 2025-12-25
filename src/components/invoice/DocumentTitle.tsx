import { DocumentType } from '@/types/invoice';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { INDIAN_STATES } from '@/types/invoice';
import { formatDate } from '@/utils/calculations';

interface DocumentTitleProps {
  type: DocumentType;
  number: string;
  date: string;
  dueDate: string;
  placeOfSupply: string;
  countryOfSupply: string;
  onNumberChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onDueDateChange: (value: string) => void;
  onPlaceOfSupplyChange: (value: string) => void;
  isPrintMode?: boolean;
}

const DOCUMENT_TITLES: Record<DocumentType, string> = {
  invoice: 'TAX INVOICE',
  quotation: 'QUOTATION',
  proforma: 'PROFORMA INVOICE',
  bill: 'BILL / CASH MEMO',
};

const DUE_DATE_LABELS: Record<DocumentType, string> = {
  invoice: 'Due Date',
  quotation: 'Valid Till',
  proforma: 'Valid Till',
  bill: 'Date',
};

export const DocumentTitle = ({
  type,
  number,
  date,
  dueDate,
  placeOfSupply,
  countryOfSupply,
  onNumberChange,
  onDateChange,
  onDueDateChange,
  onPlaceOfSupplyChange,
  isPrintMode = false,
}: DocumentTitleProps) => {
  return (
    <div className="relative overflow-hidden rounded-2xl p-6 mb-8">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-purple-500" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-widest text-primary-foreground">
            {DOCUMENT_TITLES[type]}
          </h2>
          <div className="text-right">
            <div className="flex items-center gap-3 justify-end">
              <span className="text-sm text-primary-foreground/70">Document No:</span>
              {isPrintMode ? (
                <span className="font-mono font-semibold text-primary-foreground bg-white/10 px-3 py-1 rounded-lg">
                  {number}
                </span>
              ) : (
                <Input
                  value={number}
                  onChange={(e) => onNumberChange(e.target.value)}
                  className="w-48 h-9 bg-white/10 border-white/20 text-primary-foreground font-mono text-right rounded-lg placeholder:text-primary-foreground/50 focus:bg-white/20 transition-colors"
                />
              )}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-6 mt-6 text-sm">
          <div className="space-y-2">
            <span className="text-primary-foreground/70 text-xs uppercase tracking-wider block">Date</span>
            {isPrintMode ? (
              <span className="font-medium text-primary-foreground">{formatDate(date)}</span>
            ) : (
              <Input
                type="date"
                value={date}
                onChange={(e) => onDateChange(e.target.value)}
                className="h-9 bg-white/10 border-white/20 text-primary-foreground rounded-lg focus:bg-white/20 transition-colors"
              />
            )}
          </div>
          <div className="space-y-2">
            <span className="text-primary-foreground/70 text-xs uppercase tracking-wider block">
              {DUE_DATE_LABELS[type]}
            </span>
            {isPrintMode ? (
              <span className="font-medium text-primary-foreground">{formatDate(dueDate)}</span>
            ) : (
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => onDueDateChange(e.target.value)}
                className="h-9 bg-white/10 border-white/20 text-primary-foreground rounded-lg focus:bg-white/20 transition-colors"
              />
            )}
          </div>
          <div className="space-y-2">
            <span className="text-primary-foreground/70 text-xs uppercase tracking-wider block">Place of Supply</span>
            {isPrintMode ? (
              <span className="font-medium text-primary-foreground">{placeOfSupply}</span>
            ) : (
              <Select value={placeOfSupply} onValueChange={onPlaceOfSupplyChange}>
                <SelectTrigger className="h-9 bg-white/10 border-white/20 text-primary-foreground rounded-lg focus:bg-white/20 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {INDIAN_STATES.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="space-y-2">
            <span className="text-primary-foreground/70 text-xs uppercase tracking-wider block">Country</span>
            <span className="font-medium text-primary-foreground">{countryOfSupply}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
