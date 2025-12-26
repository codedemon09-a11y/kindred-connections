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
  X,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: 'Overview',
    items: [
      { title: 'Dashboard', href: '/', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Create Documents',
    items: [
      { title: 'Tax Invoice', href: '/create/invoice', icon: FileText },
      { title: 'Quotation', href: '/create/quotation', icon: FileCheck },
      { title: 'Proforma Invoice', href: '/create/proforma', icon: FileClock },
      { title: 'Bill / Receipt', href: '/create/bill', icon: Receipt },
    ],
  },
  {
    title: 'Manage',
    items: [
      { title: 'Templates', href: '/templates', icon: Palette },
      { title: 'Company Profile', href: '/company', icon: Building2 },
      { title: 'Clients', href: '/clients', icon: Users },
      { title: 'Products & Services', href: '/products', icon: Package },
    ],
  },
  {
    title: 'Settings',
    items: [
      { title: 'Tax & GST Settings', href: '/settings/tax', icon: Settings },
      { title: 'Download History', href: '/history', icon: Download },
      { title: 'Help & Instructions', href: '/help', icon: HelpCircle },
    ],
  },
];

interface SidebarContentProps {
  collapsed: boolean;
  onToggle: () => void;
  onNavClick?: () => void;
}

const SidebarContent = ({ collapsed, onToggle, onNavClick }: SidebarContentProps) => {
  const location = useLocation();

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
              <p className="text-xs text-muted-foreground">Professional Billing</p>
            </div>
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
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-6">
          {navGroups.map((group) => (
            <div key={group.title}>
              {!collapsed && (
                <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.title}
                </h3>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.href || 
                    (item.href !== '/' && location.pathname.startsWith(item.href));
                  
                  const linkContent = (
                    <NavLink
                      to={item.href}
                      onClick={onNavClick}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                        isActive 
                          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md" 
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        collapsed && "justify-center px-2"
                      )}
                    >
                      <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-inherit")} />
                      {!collapsed && <span>{item.title}</span>}
                      {!collapsed && item.badge && (
                        <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  );

                  if (collapsed) {
                    return (
                      <Tooltip key={item.href} delayDuration={0}>
                        <TooltipTrigger asChild>
                          {linkContent}
                        </TooltipTrigger>
                        <TooltipContent side="right" className="font-medium">
                          {item.title}
                        </TooltipContent>
                      </Tooltip>
                    );
                  }

                  return <div key={item.href}>{linkContent}</div>;
                })}
              </div>
            </div>
          ))}
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
            Data is stored locally. Clearing browser cache will remove all saved invoices.
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
            <Button variant="outline" size="icon" className="h-10 w-10 bg-background/80 backdrop-blur-sm border-border">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
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
