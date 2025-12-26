import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { LocalStorageWarning } from '@/components/common/LocalStorageWarning';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Eye, Palette } from 'lucide-react';
import { useInvoiceStore } from '@/hooks/useInvoiceStore';
import { TemplateStyle, TEMPLATE_STYLES } from '@/types/invoice';
import { toast } from 'sonner';

const templatePreviews: Record<TemplateStyle, { image: string; features: string[] }> = {
  minimal: {
    image: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
    features: ['Clean layout', 'Simple typography', 'Lots of whitespace', 'Easy to read'],
  },
  corporate: {
    image: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    features: ['Professional look', 'Company branding', 'Formal structure', 'Business-ready'],
  },
  modern: {
    image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    features: ['Contemporary design', 'Gradient accents', 'Bold typography', 'Eye-catching'],
  },
  traditional: {
    image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    features: ['GST-compliant format', 'Indian tax structure', 'Clear tax breakdown', 'Government standard'],
  },
  service: {
    image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    features: ['Service focused', 'Hourly/daily rates', 'Project details', 'Professional services'],
  },
};

const Templates = () => {
  const { companySettings, updateCompanySettings } = useInvoiceStore();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateStyle>(
    companySettings.defaultTemplate || 'modern'
  );

  const handleSetDefault = (template: TemplateStyle) => {
    updateCompanySettings({
      ...companySettings,
      defaultTemplate: template,
    });
    setSelectedTemplate(template);
    toast.success(`${TEMPLATE_STYLES.find(t => t.value === template)?.label} template set as default`);
  };

  return (
    <MainLayout>
      <LocalStorageWarning />
      
      <div className="container mx-auto px-4 py-6 lg:py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-3">
            <Palette className="h-8 w-8 text-primary" />
            Invoice Templates
          </h1>
          <p className="text-muted-foreground mt-2">
            Choose a professional template for your invoices. All templates are GST-compliant and print-friendly.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEMPLATE_STYLES.map((template) => {
            const preview = templatePreviews[template.value];
            const isSelected = selectedTemplate === template.value;
            const isDefault = companySettings.defaultTemplate === template.value;

            return (
              <Card 
                key={template.value}
                className={`relative overflow-hidden transition-all duration-300 cursor-pointer group ${
                  isSelected 
                    ? 'ring-2 ring-primary shadow-lg shadow-primary/20' 
                    : 'hover:shadow-lg border-border/50'
                }`}
                onClick={() => setSelectedTemplate(template.value)}
              >
                {isDefault && (
                  <Badge className="absolute top-3 right-3 z-10 bg-primary text-primary-foreground">
                    Default
                  </Badge>
                )}

                {/* Preview */}
                <div 
                  className="h-40 relative overflow-hidden"
                  style={{ background: preview.image }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                    <Button variant="secondary" size="sm" className="gap-2">
                      <Eye className="h-4 w-4" />
                      Preview
                    </Button>
                  </div>
                  
                  {/* Template Name Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <h3 className="font-bold text-white">{template.label}</h3>
                  </div>
                </div>

                <CardContent className="p-4 space-y-4">
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                  
                  <div className="space-y-2">
                    {preview.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-success" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant={isDefault ? "secondary" : "default"}
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSetDefault(template.value);
                    }}
                    disabled={isDefault}
                  >
                    {isDefault ? 'Current Default' : 'Set as Default'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Section */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle>Template Information</CardTitle>
            <CardDescription>All templates include these features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                'GST Compliant',
                'Print Friendly',
                'PDF Export Ready',
                'Professional Layout',
                'Auto Tax Calculation',
                'Amount in Words',
                'Bank Details Section',
                'Terms & Conditions',
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success shrink-0" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Templates;
