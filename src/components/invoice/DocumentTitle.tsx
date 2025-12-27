import { DocumentType, getDocumentTypeConfig } from '@/types/invoice';
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
  showDueDate?: boolean;
}

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
  showDueDate = true,
}: DocumentTitleProps) => {
  const docConfig = getDocumentTypeConfig(type);
  
  const getDueDateLabel = () => {
    if (['quotation', 'proforma'].includes(type)) return 'Valid Till';
    if (['purchase-order', 'sale-order'].includes(type)) return 'Expected Date';
    return 'Due Date';
  };

  return (
    <div className="relative overflow-hidden rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-purple-500" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-widest text-primary-foreground">
            {docConfig.label.toUpperCase()}
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-primary-foreground/70">Doc No:</span>
            {isPrintMode ? (
              <span className="font-mono font-semibold text-primary-foreground bg-white/10 px-3 py-1 rounded-lg">
                {number}
              </span>
            ) : (
              <Input
                value={number}
                onChange={(e) => onNumberChange(e.target.value)}
                className="w-32 sm:w-48 h-9 bg-white/10 border-white/20 text-primary-foreground font-mono text-right rounded-lg placeholder:text-primary-foreground/50 focus:bg-white/20 transition-colors"
              />
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mt-4 sm:mt-6 text-sm">
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
          {showDueDate && (
            <div className="space-y-2">
              <span className="text-primary-foreground/70 text-xs uppercase tracking-wider block">
                {getDueDateLabel()}
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
          )}
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
