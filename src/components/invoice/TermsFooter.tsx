import { CompanySettings } from '@/types/invoice';
import { Textarea } from '@/components/ui/textarea';

interface TermsFooterProps {
  settings: CompanySettings;
  notes: string;
  onNotesChange: (value: string) => void;
  isPrintMode?: boolean;
}

export const TermsFooter = ({
  settings,
  notes,
  onNotesChange,
  isPrintMode = false,
}: TermsFooterProps) => {
  return (
    <div className="border-t border-border pt-6 mt-6">
      <div className="grid grid-cols-2 gap-8">
        {/* Terms & Conditions */}
        <div>
          <h3 className="section-title mb-3">Terms & Conditions</h3>
          <div className="text-sm text-muted-foreground whitespace-pre-line">
            {settings.terms || 'No terms specified.'}
          </div>
          {settings.jurisdiction && (
            <p className="text-xs text-muted-foreground mt-3">
              Subject to {settings.jurisdiction} jurisdiction.
            </p>
          )}
        </div>

        {/* Notes & Signature */}
        <div className="space-y-4">
          {/* Notes */}
          <div>
            <h3 className="section-title mb-2">Additional Notes</h3>
            {isPrintMode ? (
              <p className="text-sm text-muted-foreground">{notes || 'No additional notes.'}</p>
            ) : (
              <Textarea
                value={notes}
                onChange={(e) => onNotesChange(e.target.value)}
                placeholder="Any additional notes or comments..."
                className="min-h-[80px] resize-none text-sm"
              />
            )}
          </div>

          {/* Signature Area */}
          <div className="text-right pt-8">
            <div className="inline-block">
              <p className="font-medium text-foreground mb-1">
                For {settings.name || 'Your Company'}
              </p>
              <div className="border-t border-border pt-12 mt-2">
                <p className="text-sm text-muted-foreground">Authorized Signatory</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Declaration */}
      <div className="text-center text-xs text-muted-foreground mt-8 pt-4 border-t border-border">
        <p>This is a computer-generated document. No signature is required.</p>
      </div>
    </div>
  );
};
