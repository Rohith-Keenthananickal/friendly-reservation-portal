import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  LogOut, 
  Ship, 
  HomeIcon, 
  Building2, 
  FileText, 
  Receipt, 
  Calendar, 
  CreditCard, 
  ChevronDown, 
  BarChart3, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Settings,
  BookOpen,
  Wallet,
  Menu,
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';

interface NewSidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const NewSidebar: React.FC<NewSidebarProps> = ({ isCollapsed = false, onToggle }) => {
  const location = useLocation();
  const [accountOpen, setAccountOpen] = useState(false);
  const [settlementOpen, setSettlementOpen] = useState(true); // Default open since we're in settlement

  const accountItems = [
    { name: 'Income', icon: <TrendingUp className="w-4 h-4" />, path: '/account/income' },
    { name: 'Expense', icon: <TrendingDown className="w-4 h-4" />, path: '/account/expense' },
    { name: 'Ledger Setup', icon: <BookOpen className="w-4 h-4" />, path: '/account/ledger' },
    { name: 'Cash Book', icon: <Wallet className="w-4 h-4" />, path: '/account/cashbook' },
  ];

  const settlementItems = [
    { name: 'Payment', icon: <DollarSign className="w-4 h-4" />, path: '/settlement/payment' },
    { name: 'Reports', icon: <BarChart3 className="w-4 h-4" />, path: '/settlement/reports' },
    { name: 'Finance Details', icon: <FileText className="w-4 h-4" />, path: '/settlement/finance' },
  ];

  const otherMenuItems = [
    { name: 'Houseboat', icon: <Ship className="w-5 h-5" />, path: '/houseboat' },
    { name: 'Shikara', icon: <Ship className="w-5 h-5" />, path: '/shikara' },
    { name: 'Hotel', icon: <Building2 className="w-5 h-5" />, path: '/hotel' },
    { name: 'Reservation Voucher', icon: <FileText className="w-5 h-5" />, path: '/reservation-voucher' },
    { name: 'Reservation Receipt', icon: <Receipt className="w-5 h-5" />, path: '/reservation-receipt' },
    { name: 'Room Availability', icon: <Calendar className="w-5 h-5" />, path: '/room-availability' },
  ];

  return (
    <div className={cn(
      "flex flex-col h-full bg-primary text-primary-foreground transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-primary-foreground/10">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-semibold">Access Rooms</h2>
              <p className="text-xs text-primary-foreground/60">Property Management</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {/* Account Dropdown */}
        <Collapsible open={accountOpen} onOpenChange={setAccountOpen}>
          <CollapsibleTrigger 
            className={cn(
              "flex items-center justify-between w-full rounded-lg px-3 py-3 transition-colors hover:bg-primary-foreground/10",
              (location.pathname.startsWith('/account') || accountOpen) ? "bg-primary-foreground/20" : ""
            )}
          >
            <div className="flex items-center space-x-3">
              <Settings className="w-5 h-5" />
              {!isCollapsed && <span className="font-medium">Account</span>}
            </div>
            {!isCollapsed && (
              <ChevronDown className={cn("w-4 h-4 transition-transform", accountOpen ? "rotate-180" : "")} />
            )}
          </CollapsibleTrigger>
          {!isCollapsed && (
            <CollapsibleContent>
              <div className="ml-8 mt-1 space-y-1">
                {accountItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-primary-foreground/10",
                      location.pathname === item.path ? "bg-primary-foreground/20" : ""
                    )}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </CollapsibleContent>
          )}
        </Collapsible>
        
        {/* Settlement Dropdown */}
        <Collapsible open={settlementOpen} onOpenChange={setSettlementOpen}>
          <CollapsibleTrigger 
            className={cn(
              "flex items-center justify-between w-full rounded-lg px-3 py-3 transition-colors hover:bg-primary-foreground/10",
              (location.pathname.startsWith('/settlement') || settlementOpen) ? "bg-primary-foreground/20" : ""
            )}
          >
            <div className="flex items-center space-x-3">
              <CreditCard className="w-5 h-5" />
              {!isCollapsed && <span className="font-medium">Settlement</span>}
            </div>
            {!isCollapsed && (
              <ChevronDown className={cn("w-4 h-4 transition-transform", settlementOpen ? "rotate-180" : "")} />
            )}
          </CollapsibleTrigger>
          {!isCollapsed && (
            <CollapsibleContent>
              <div className="ml-8 mt-1 space-y-1">
                {settlementItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-primary-foreground/10",
                      location.pathname === item.path ? "bg-primary-foreground/20" : ""
                    )}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </CollapsibleContent>
          )}
        </Collapsible>

        {/* Other Menu Items */}
        {otherMenuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              "flex items-center space-x-3 rounded-lg px-3 py-3 transition-colors hover:bg-primary-foreground/10",
              location.pathname === item.path ? "bg-primary-foreground/20" : ""
            )}
          >
            {item.icon}
            {!isCollapsed && <span className="font-medium">{item.name}</span>}
          </Link>
        ))}
      </div>
      
      {/* Footer */}
      <div className="p-4 border-t border-primary-foreground/10">
        <Link
          to="/logout"
          className="flex items-center space-x-3 rounded-lg px-3 py-3 text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10"
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span>Logout</span>}
        </Link>
      </div>
    </div>
  );
};

export default NewSidebar;
