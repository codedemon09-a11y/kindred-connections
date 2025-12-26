import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { LocalStorageWarning } from '@/components/common/LocalStorageWarning';
import { useInvoiceStore } from '@/hooks/useInvoiceStore';
import { CompanySettings, INDIAN_STATES, GST_RATES, GSTRate, CURRENCIES, CurrencyCode, TEMPLATE_STYLES, TemplateStyle } from '@/types/invoice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, CreditCard, FileText, Hash, Upload, Save, Pen } from 'lucide-react';
import { toast } from 'sonner';

const CompanyProfile = () => {
  const { companySettings, updateCompanySettings } = useInvoiceStore();
  const [localSettings, setLocalSettings] = useState<CompanySettings>(companySettings);

  useEffect(() => {
    setLocalSettings(companySettings);
  }, [companySettings]);

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

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500000) {
        toast.error('Signature file size should be less than 500KB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField('signature', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateCompanySettings(localSettings);
    toast.success('Company profile saved successfully');
  };

  return (
    <MainLayout>
      <LocalStorageWarning />
      
      <div className="container mx-auto px-4 py-6 lg:py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-3">
              <Building2 className="h-8 w-8 text-primary" />
              Company Profile
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your company details and document preferences
            </p>
          </div>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="company" className="gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Company</span>
            </TabsTrigger>
            <TabsTrigger value="bank" className="gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Bank</span>
            </TabsTrigger>
            <TabsTrigger value="terms" className="gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Terms</span>
            </TabsTrigger>
            <TabsTrigger value="numbering" className="gap-2">
              <Hash className="h-4 w-4" />
              <span className="hidden sm:inline">Numbers</span>
            </TabsTrigger>
          </TabsList>

          {/* Company Details */}
          <TabsContent value="company">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Your company's basic details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                </CardContent>
              </Card>

              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle>Tax Information</CardTitle>
                  <CardDescription>GST and PAN details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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

                  <div className="space-y-2">
                    <Label>Default GST Rate</Label>
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

                  <div className="space-y-2">
                    <Label>Default Currency</Label>
                    <Select
                      value={localSettings.defaultCurrency || 'INR'}
                      onValueChange={(value) => updateField('defaultCurrency', value as CurrencyCode)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CURRENCIES.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.symbol} {currency.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Default Template</Label>
                    <Select
                      value={localSettings.defaultTemplate || 'modern'}
                      onValueChange={(value) => updateField('defaultTemplate', value as TemplateStyle)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TEMPLATE_STYLES.map((template) => (
                          <SelectItem key={template.value} value={template.value}>
                            {template.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Signature Upload */}
                  <div className="space-y-2">
                    <Label>Authorized Signature</Label>
                    <div className="flex items-center gap-4">
                      {localSettings.signature ? (
                        <img
                          src={localSettings.signature}
                          alt="Signature"
                          className="h-16 w-32 object-contain rounded border bg-white"
                        />
                      ) : (
                        <div className="h-16 w-32 rounded border border-dashed flex items-center justify-center text-muted-foreground">
                          <Pen className="h-6 w-6" />
                        </div>
                      )}
                      <div className="flex-1">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleSignatureUpload}
                          className="text-sm"
                        />
                        <p className="text-xs text-muted-foreground mt-1">Max 500KB, transparent PNG preferred</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bank Details */}
          <TabsContent value="bank">
            <Card className="glass border-border/50 max-w-2xl">
              <CardHeader>
                <CardTitle>Bank Account Details</CardTitle>
                <CardDescription>Payment information displayed on invoices</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Terms & Conditions */}
          <TabsContent value="terms">
            <Card className="glass border-border/50 max-w-2xl">
              <CardHeader>
                <CardTitle>Terms & Conditions</CardTitle>
                <CardDescription>Default terms displayed on all documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Document Numbering */}
          <TabsContent value="numbering">
            <Card className="glass border-border/50 max-w-2xl">
              <CardHeader>
                <CardTitle>Document Numbering</CardTitle>
                <CardDescription>Configure document number prefixes and starting numbers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {(['invoice', 'quotation', 'proforma', 'bill'] as const).map((type) => (
                  <div key={type} className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="capitalize">{type} Prefix</Label>
                      <Input
                        value={localSettings.prefixes[type]}
                        onChange={(e) =>
                          updateField('prefixes', {
                            ...localSettings.prefixes,
                            [type]: e.target.value.toUpperCase(),
                          })
                        }
                        placeholder="INV"
                        className="font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Next Number</Label>
                      <Input
                        type="number"
                        min="1"
                        value={localSettings.counters[type]}
                        onChange={(e) =>
                          updateField('counters', {
                            ...localSettings.counters,
                            [type]: parseInt(e.target.value) || 1,
                          })
                        }
                        className="font-mono"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CompanyProfile;
