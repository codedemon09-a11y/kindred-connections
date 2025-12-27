import { Client, CompanySettings } from '@/types/invoice';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { INDIAN_STATES } from '@/types/invoice';
import { Building2, User } from 'lucide-react';

interface PartyDetailsProps {
  seller: CompanySettings;
  client: Client;
  onClientChange: (client: Client) => void;
  isPrintMode?: boolean;
  partyLabel?: string;
}

export const PartyDetails = ({
  seller,
  client,
  onClientChange,
  isPrintMode = false,
  partyLabel = 'Customer',
}: PartyDetailsProps) => {
  const updateClient = (field: keyof Client, value: string) => {
    onClientChange({ ...client, [field]: value });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8">
      {/* Seller */}
      <div className="glass rounded-2xl p-4 sm:p-6 border border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Building2 className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Your Details</h3>
        </div>
        <div className="space-y-2">
          <p className="font-semibold text-foreground text-lg">{seller.name || 'Your Company'}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {seller.address && `${seller.address}, `}
            {seller.city && `${seller.city}, `}
            {seller.state} {seller.pincode}
          </p>
          {seller.gstin && (
            <p className="text-sm">
              <span className="text-muted-foreground">GSTIN:</span>{' '}
              <span className="font-mono text-foreground">{seller.gstin}</span>
            </p>
          )}
          {seller.phone && (
            <p className="text-sm text-muted-foreground">Phone: {seller.phone}</p>
          )}
        </div>
      </div>

      {/* Buyer/Supplier */}
      <div className="glass rounded-2xl p-4 sm:p-6 border border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 rounded-lg bg-success/10 flex items-center justify-center">
            <User className="h-4 w-4 text-success" />
          </div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{partyLabel} Details</h3>
        </div>
        {isPrintMode ? (
          <div className="space-y-2">
            <p className="font-semibold text-foreground text-lg">{client.name || 'Client Name'}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {client.address && `${client.address}, `}
              {client.city && `${client.city}, `}
              {client.state} {client.pincode}
            </p>
            {client.gstin && (
              <p className="text-sm">
                <span className="text-muted-foreground">GSTIN:</span>{' '}
                <span className="font-mono text-foreground">{client.gstin}</span>
              </p>
            )}
            {client.phone && (
              <p className="text-sm text-muted-foreground">Phone: {client.phone}</p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <Input
              placeholder={`${partyLabel} Name *`}
              value={client.name}
              onChange={(e) => updateClient('name', e.target.value)}
              className="h-10 rounded-xl bg-background/50"
            />
            <Textarea
              placeholder="Address"
              value={client.address}
              onChange={(e) => updateClient('address', e.target.value)}
              className="min-h-[70px] resize-none rounded-xl bg-background/50"
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="City"
                value={client.city}
                onChange={(e) => updateClient('city', e.target.value)}
                className="h-10 rounded-xl bg-background/50"
              />
              <Select 
                value={client.state} 
                onValueChange={(value) => updateClient('state', value)}
              >
                <SelectTrigger className="h-10 rounded-xl bg-background/50">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  {INDIAN_STATES.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Pincode"
                value={client.pincode}
                onChange={(e) => updateClient('pincode', e.target.value)}
                className="h-10 rounded-xl bg-background/50"
              />
              <Input
                placeholder="GSTIN (optional)"
                value={client.gstin || ''}
                onChange={(e) => updateClient('gstin', e.target.value)}
                className="h-10 font-mono rounded-xl bg-background/50"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Phone"
                value={client.phone}
                onChange={(e) => updateClient('phone', e.target.value)}
                className="h-10 rounded-xl bg-background/50"
              />
              <Input
                placeholder="Email"
                value={client.email}
                onChange={(e) => updateClient('email', e.target.value)}
                className="h-10 rounded-xl bg-background/50"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
