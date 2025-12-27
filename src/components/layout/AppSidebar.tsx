import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  FileText,
  FileCheck,
  FileClock,
  Receipt,
  LayoutDashboard,
  Building2,
  Users,
  Package,
  Settings,
  Download,
  HelpCircle,
  Palette,
  ChevronLeft,
  ChevronRight,
  Menu,
  AlertTriangle,
  ShoppingCart,
  Truck,
  FileInput,
  FileOutput,
  ClipboardList,
  Wrench,
  CreditCard,
  Wallet,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
  defaultOpen?: boolean;
}

const navGroups: NavGroup[] = [
  {
    title: 'Overview',
    items: [
      { title: 'Dashboard', href: '/', icon: LayoutDashboard },
    ],
    defaultOpen: true,
  },
  {
    title: 'Sales Documents',
    items: [
      { title: 'Sale Invoice', href: '/create/sale-invoice', icon: FileText },
      { title: 'Quotation', href: '/create/quotation', icon: FileCheck },
      { title: 'Proforma Invoice', href: '/create/proforma', icon: FileClock },
      { title: 'Delivery Challan', href: '/create/delivery-challan', icon: Truck },
    ],
    defaultOpen: true,
  },
  {
    title: 'Purchase Documents',
    items: [
      { title: 'Purchase Invoice', href: '/create/purchase-invoice', icon: Receipt },
      { title: 'Purchase Order', href: '/create/purchase-order', icon: ShoppingCart },
    ],
    defaultOpen: false,
  },
  {
    title: 'Orders & Jobs',
    items: [
      { title: 'Sale Order', href: '/create/sale-order', icon: ClipboardList },
      { title: 'Job Work', href: '/create/job-work', icon: Wrench },
    ],
    defaultOpen: false,
  },
  {
    title: 'Adjustments',
    items: [
      { title: 'Credit Note', href: '/create/credit-note', icon: FileInput },
      { title: 'Debit Note', href: '/create/debit-note', icon: FileOutput },
    ],
    defaultOpen: false,
  },
  {
    title: 'Payments',
    items: [
      { title: 'Inward Payment', href: '/create/inward-payment', icon: Wallet },
      { title: 'Outward Payment', href: '/create/outward-payment', icon: CreditCard },
    ],
    defaultOpen: false,
  },
  {
    title: 'Manage',
    items: [
      { title: 'Templates', href: '/templates', icon: Palette },
      { title: 'Company Profile', href: '/company', icon: Building2 },
      { title: 'Clients', href: '/clients', icon: Users },
      { title: 'Products & Services', href: '/products', icon: Package },
    ],
    defaultOpen: false,
  },
  {
    title: 'Settings',
    items: [
      { title: 'Tax & GST Settings', href: '/settings/tax', icon: Settings },
      { title: 'Download History', href: '/history', icon: Download },
      { title: 'Help & Instructions', href: '/help', icon: HelpCircle },
    ],
    defaultOpen: false,
  },
];

interface SidebarContentProps {
  collapsed: boolean;
  onToggle: () => void;
  onNavClick?: () => void;
}

const SidebarContent = ({ collapsed, onToggle, onNavClick }: SidebarContentProps) => {
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    navGroups.forEach(group => {
      initial[group.title] = group.defaultOpen || false;
    });
    return initial;
  });

  const toggleGroup = (title: string) => {
    setOpenGroups(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="flex flex-col h-full bg-sidebar">
      {/* Header */}
      <div className={cn(
        "flex items-center h-16 px-4 border-b border-sidebar-border shrink-0",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shadow-lg">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-sm text-sidebar-foreground">GST Invoice Pro</h1>
              <p className="text-xs text-muted-foreground">Enterprise Billing</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shadow-lg">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent hidden lg:flex"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-2 py-4">
        <div className="space-y-1">
          {navGroups.map((group) => {
            const isGroupOpen = openGroups[group.title];
            const hasActiveItem = group.items.some(item => 
              location.pathname === item.href || 
              (item.href !== '/' && location.pathname.startsWith(item.href))
            );

            if (collapsed) {
              return (
                <div key={group.title} className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = location.pathname === item.href || 
                      (item.href !== '/' && location.pathname.startsWith(item.href));

                    return (
                      <Tooltip key={item.href} delayDuration={0}>
                        <TooltipTrigger asChild>
                          <NavLink
                            to={item.href}
                            onClick={onNavClick}
                            className={cn(
                              "flex items-center justify-center p-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                              isActive 
                                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md" 
                                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            )}
                          >
                            <item.icon className="h-5 w-5 shrink-0" />
                          </NavLink>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="font-medium">
                          {item.title}
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              );
            }

            return (
              <Collapsible
                key={group.title}
                open={isGroupOpen || hasActiveItem}
                onOpenChange={() => toggleGroup(group.title)}
              >
                <CollapsibleTrigger asChild>
                  <button className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors">
                    <span>{group.title}</span>
                    <ChevronDown className={cn(
                      "h-3 w-3 transition-transform duration-200",
                      isGroupOpen && "transform rotate-180"
                    )} />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = location.pathname === item.href || 
                      (item.href !== '/' && location.pathname.startsWith(item.href));

                    return (
                      <NavLink
                        key={item.href}
                        to={item.href}
                        onClick={onNavClick}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                          isActive 
                            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md" 
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        )}
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        <span className="truncate">{item.title}</span>
                        {item.badge && (
                          <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </NavLink>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
      </ScrollArea>

      {/* Local Storage Warning */}
      <div className={cn(
        "p-3 border-t border-sidebar-border shrink-0",
        collapsed && "hidden"
      )}>
        <div className="flex items-start gap-2 p-3 rounded-lg bg-warning/10 border border-warning/30">
          <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
          <p className="text-xs text-warning">
            Data is stored locally. Clearing browser cache will remove all saved documents.
          </p>
        </div>
      </div>
    </div>
  );
};

export const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-10 w-10 bg-background/80 backdrop-blur-sm border-border shadow-lg">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-80">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <SidebarContent 
              collapsed={false} 
              onToggle={() => {}} 
              onNavClick={() => setMobileOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden lg:flex flex-col h-screen sticky top-0 border-r border-sidebar-border transition-all duration-300 bg-sidebar",
        collapsed ? "w-16" : "w-64"
      )}>
        <SidebarContent 
          collapsed={collapsed} 
          onToggle={() => setCollapsed(!collapsed)} 
        />
      </aside>
    </>
  );
};
