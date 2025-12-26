import { Link } from 'react-router-dom';
import { useInvoiceStore } from '@/hooks/useInvoiceStore';
import { MainLayout } from '@/components/layout/MainLayout';
import { LocalStorageWarning } from '@/components/common/LocalStorageWarning';
import AdSense from '@/components/AdSense';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FileText,
  FileCheck,
  FileClock,
  Receipt,
  Plus,
  TrendingUp,
  Calendar,
  IndianRupee,
  ArrowRight,
  Building2,
  Palette,
} from 'lucide-react';
import { formatCurrency } from '@/utils/calculations';

const quickActions = [
  { type: 'invoice', label: 'Tax Invoice', icon: FileText, href: '/create/invoice', color: 'from-blue-500 to-blue-600' },
  { type: 'quotation', label: 'Quotation', icon: FileCheck, href: '/create/quotation', color: 'from-green-500 to-green-600' },
  { type: 'proforma', label: 'Proforma', icon: FileClock, href: '/create/proforma', color: 'from-purple-500 to-purple-600' },
  { type: 'bill', label: 'Bill/Receipt', icon: Receipt, href: '/create/bill', color: 'from-orange-500 to-orange-600' },
];

const Dashboard = () => {
  const { documents, companySettings, isLoaded } = useInvoiceStore();

  if (!isLoaded) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </MainLayout>
    );
  }

  const totalRevenue = documents
    .filter(d => d.type === 'invoice')
    .reduce((sum, d) => sum + d.grandTotal, 0);

  const thisMonthDocs = documents.filter(d => {
    const docDate = new Date(d.date);
    const now = new Date();
    return docDate.getMonth() === now.getMonth() && docDate.getFullYear() === now.getFullYear();
  });

  const recentDocuments = [...documents]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <MainLayout>
      <LocalStorageWarning />
      
      <div className="container mx-auto px-4 py-6 lg:py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back{companySettings.name ? `, ${companySettings.name}` : ''}
            </p>
          </div>
          {!companySettings.name && (
            <Link to="/company">
              <Button variant="outline" className="gap-2">
                <Building2 className="h-4 w-4" />
                Setup Company Profile
              </Button>
            </Link>
          )}
        </div>

        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link key={action.type} to={action.href}>
                <Card className="group cursor-pointer card-hover border-border/50 hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-4 sm:p-6">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{action.label}</h3>
                    <div className="flex items-center text-sm text-muted-foreground group-hover:text-primary transition-colors">
                      <Plus className="h-4 w-4 mr-1" />
                      Create New
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Stats Cards */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="glass border-border/50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Documents</p>
                    <p className="text-2xl font-bold text-foreground">{documents.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
                    <IndianRupee className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold text-foreground">{formatCurrency(totalRevenue)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">This Month</p>
                    <p className="text-2xl font-bold text-foreground">{thisMonthDocs.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Invoice</p>
                    <p className="text-2xl font-bold text-foreground">
                      {documents.length > 0 
                        ? formatCurrency(totalRevenue / documents.filter(d => d.type === 'invoice').length || 0)
                        : '₹0'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Documents */}
          <div className="lg:col-span-2">
            <Card className="glass border-border/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Documents</CardTitle>
                  <CardDescription>Your latest invoices and quotations</CardDescription>
                </div>
                <Link to="/history">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {recentDocuments.length > 0 ? (
                  <div className="space-y-3">
                    {recentDocuments.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                            doc.type === 'invoice' ? 'bg-blue-500/20 text-blue-500' :
                            doc.type === 'quotation' ? 'bg-green-500/20 text-green-500' :
                            doc.type === 'proforma' ? 'bg-purple-500/20 text-purple-500' :
                            'bg-orange-500/20 text-orange-500'
                          }`}>
                            {doc.type === 'invoice' && <FileText className="h-5 w-5" />}
                            {doc.type === 'quotation' && <FileCheck className="h-5 w-5" />}
                            {doc.type === 'proforma' && <FileClock className="h-5 w-5" />}
                            {doc.type === 'bill' && <Receipt className="h-5 w-5" />}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{doc.number}</p>
                            <p className="text-sm text-muted-foreground">{doc.client.name || 'No client'}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">{formatCurrency(doc.grandTotal)}</p>
                          <p className="text-sm text-muted-foreground">{doc.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground">No documents yet</p>
                    <p className="text-sm text-muted-foreground">Create your first invoice to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Links & Tips */}
          <div className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link to="/templates" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <Palette className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Browse Templates</span>
                </Link>
                <Link to="/company" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <Building2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Company Settings</span>
                </Link>
                <Link to="/help" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Help & Instructions</span>
                </Link>
              </CardContent>
            </Card>

            {/* 
              ============================================
              ADSENSE AD PLACEMENT
              ============================================
              This ad is placed in the sidebar area, between content sections.
              It follows AdSense policies - away from nav/buttons/forms.
            */}
            <div className="w-full">
              <AdSense />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
