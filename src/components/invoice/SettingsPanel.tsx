import { useState, useEffect } from 'react';
import { CompanySettings, INDIAN_STATES, GST_RATES, GSTRate, DocumentType, DOCUMENT_TYPES } from '@/types/invoice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Settings, Building2, CreditCard, FileText, Hash, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface SettingsPanelProps {
  settings: CompanySettings;
  onSave: (settings: CompanySettings) => void;
  embedded?: boolean;
}

export const SettingsPanel = ({ settings, onSave, embedded = false }: SettingsPanelProps) => {
  const [localSettings, setLocalSettings] = useState<CompanySettings>(settings);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const updateField = <K extends keyof CompanySettings>(field: K, value: CompanySettings[K]) => {
    setLocalSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500000) {
        toast.error('Logo file size should be less than 500KB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField('logo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(localSettings);
    if (!embedded) {
      setOpen(false);
    }
    toast.success('Settings saved successfully');
  };

  const SettingsContent = () => (
    <Tabs defaultValue="company" className="mt-4 sm:mt-6">
      <TabsList className="grid w-full grid-cols-4 h-auto">
        <TabsTrigger value="company" className="text-xs py-2">
          <Building2 className="h-3 w-3 mr-1 hidden sm:inline" />
          Company
        </TabsTrigger>
        <TabsTrigger value="bank" className="text-xs py-2">
          <CreditCard className="h-3 w-3 mr-1 hidden sm:inline" />
          Bank
        </TabsTrigger>
        <TabsTrigger value="terms" className="text-xs py-2">
          <FileText className="h-3 w-3 mr-1 hidden sm:inline" />
          Terms
        </TabsTrigger>
        <TabsTrigger value="numbering" className="text-xs py-2">
          <Hash className="h-3 w-3 mr-1 hidden sm:inline" />
          Numbers
        </TabsTrigger>
      </TabsList>

      {/* Company Details */}
      <TabsContent value="company" className="space-y-4 mt-4">
        {/* Logo Upload */}
        <div className="space-y-2">
          <Label>Company Logo</Label>
          <div className="flex items-center gap-4">
            {localSettings.logo ? (
              <img
                src={localSettings.logo}
                alt="Logo"
                className="h-16 w-16 object-contain rounded border"
              />
            ) : (
              <div className="h-16 w-16 rounded border border-dashed flex items-center justify-center text-muted-foreground">
                <Upload className="h-6 w-6" />
              </div>
            )}
            <div className="flex-1">
              <Input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">Max 500KB, JPG/PNG</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Company Name *</Label>
          <Input
            id="name"
            value={localSettings.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="Your Company Pvt Ltd"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            value={localSettings.address}
            onChange={(e) => updateField('address', e.target.value)}
            placeholder="123 Business Street"
            className="resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={localSettings.city}
              onChange={(e) => updateField('city', e.target.value)}
              placeholder="Mumbai"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State *</Label>
            <Select
              value={localSettings.state}
              onValueChange={(value) => updateField('state', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
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
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pincode">Pincode</Label>
            <Input
              id="pincode"
              value={localSettings.pincode}
              onChange={(e) => updateField('pincode', e.target.value)}
              placeholder="400001"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={localSettings.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={localSettings.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="info@company.com"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="gstin">GSTIN</Label>
            <Input
              id="gstin"
              value={localSettings.gstin}
              onChange={(e) => updateField('gstin', e.target.value.toUpperCase())}
              placeholder="27AAAAA0000A1Z5"
              className="font-mono"
              maxLength={15}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pan">PAN</Label>
            <Input
              id="pan"
              value={localSettings.pan}
              onChange={(e) => updateField('pan', e.target.value.toUpperCase())}
              placeholder="AAAAA0000A"
              className="font-mono"
              maxLength={10}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="defaultGst">Default GST Rate</Label>
          <Select
            value={String(localSettings.defaultGstRate)}
            onValueChange={(value) => updateField('defaultGstRate', parseInt(value) as GSTRate)}
          >
            <SelectTrigger>
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
        </div>
      </TabsContent>

      {/* Bank Details */}
      <TabsContent value="bank" className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="bankName">Bank Name</Label>
          <Input
            id="bankName"
            value={localSettings.bankName}
            onChange={(e) => updateField('bankName', e.target.value)}
            placeholder="HDFC Bank"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="accountNumber">Account Number</Label>
          <Input
            id="accountNumber"
            value={localSettings.accountNumber}
            onChange={(e) => updateField('accountNumber', e.target.value)}
            placeholder="50100123456789"
            className="font-mono"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ifsc">IFSC Code</Label>
          <Input
            id="ifsc"
            value={localSettings.ifsc}
            onChange={(e) => updateField('ifsc', e.target.value.toUpperCase())}
            placeholder="HDFC0001234"
            className="font-mono"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="upiId">UPI ID</Label>
          <Input
            id="upiId"
            value={localSettings.upiId}
            onChange={(e) => updateField('upiId', e.target.value)}
            placeholder="company@upi"
          />
        </div>
      </TabsContent>

      {/* Terms & Conditions */}
      <TabsContent value="terms" className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="terms">Terms & Conditions</Label>
          <Textarea
            id="terms"
            value={localSettings.terms}
            onChange={(e) => updateField('terms', e.target.value)}
            placeholder="Enter your terms and conditions..."
            className="min-h-[200px] resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="jurisdiction">Jurisdiction</Label>
          <Input
            id="jurisdiction"
            value={localSettings.jurisdiction}
            onChange={(e) => updateField('jurisdiction', e.target.value)}
            placeholder="Mumbai"
          />
        </div>
      </TabsContent>

      {/* Document Numbering */}
      <TabsContent value="numbering" className="space-y-4 mt-4">
        <p className="text-sm text-muted-foreground mb-4">
          Configure document number prefixes and starting numbers.
        </p>

        <ScrollArea className="h-[300px] pr-4">
          {DOCUMENT_TYPES.map((docType) => (
            <div key={docType.type} className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label className="text-xs">{docType.shortLabel} Prefix</Label>
                <Input
                  value={localSettings.prefixes[docType.type] || ''}
                  onChange={(e) =>
                    updateField('prefixes', {
                      ...localSettings.prefixes,
                      [docType.type]: e.target.value.toUpperCase(),
                    })
                  }
                  placeholder="XX"
                  className="font-mono h-9"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Next #</Label>
                <Input
                  type="number"
                  min="1"
                  value={localSettings.counters[docType.type] || 1}
                  onChange={(e) =>
                    updateField('counters', {
                      ...localSettings.counters,
                      [docType.type]: parseInt(e.target.value) || 1,
                    })
                  }
                  className="font-mono h-9"
                />
              </div>
            </div>
          ))}
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );

  if (embedded) {
    return (
      <div>
        <SettingsContent />
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave}>Save Settings</Button>
        </div>
      </div>
    );
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">Settings</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[500px] sm:max-w-[500px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Company Settings</SheetTitle>
          <SheetDescription>
            Configure your company details, bank information, and document preferences.
          </SheetDescription>
        </SheetHeader>

        <SettingsContent />

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Settings</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
