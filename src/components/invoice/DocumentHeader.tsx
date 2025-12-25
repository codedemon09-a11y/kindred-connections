import { CompanySettings } from '@/types/invoice';

interface DocumentHeaderProps {
  settings: CompanySettings;
}

export const DocumentHeader = ({ settings }: DocumentHeaderProps) => {
  return (
    <div className="flex justify-between items-start border-b border-border/50 pb-8 mb-8">
      <div className="flex items-start gap-5">
        {settings.logo && (
          <div className="relative group">
            <img 
              src={settings.logo} 
              alt="Company Logo" 
              className="h-18 w-18 object-contain rounded-xl ring-2 ring-border/50 group-hover:ring-primary/50 transition-all duration-300"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight mb-2">
            {settings.name || 'Your Company Name'}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {settings.address && `${settings.address}, `}
            {settings.city && `${settings.city}, `}
            {settings.state} {settings.pincode}
          </p>
          <div className="flex gap-6 mt-3 text-sm text-muted-foreground">
            {settings.phone && (
              <span className="flex items-center gap-2">
                <span className="text-foreground/60">📞</span> 
                {settings.phone}
              </span>
            )}
            {settings.email && (
              <span className="flex items-center gap-2">
                <span className="text-foreground/60">✉️</span> 
                {settings.email}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="text-right">
        {settings.gstin && (
          <div className="inline-block px-4 py-2 rounded-xl bg-muted/50 border border-border/50 mb-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">GSTIN</p>
            <p className="font-mono font-semibold text-foreground tracking-wide">{settings.gstin}</p>
          </div>
        )}
        {settings.pan && (
          <div className="inline-block px-4 py-2 rounded-xl bg-muted/50 border border-border/50">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">PAN</p>
            <p className="font-mono font-semibold text-foreground tracking-wide">{settings.pan}</p>
          </div>
        )}
      </div>
    </div>
  );
};
