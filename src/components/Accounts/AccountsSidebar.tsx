import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  LogOut, 
  Ship, 
  Building2, 
  FileText, 
  Receipt, 
  Calendar, 
  ChevronDown, 
  BarChart3, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Settings,
  BookOpen,
  CreditCard,
  User
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const AccountsSidebar = () => {
  const location = useLocation();
  const [accountOpen, setAccountOpen] = useState(false);
  const [settlementOpen, setSettlementOpen] = useState(false);
  
  const menuItems = [
    { name: 'Houseboat', icon: <Ship className="w-5 h-5" />, path: '/houseboat' },
    { name: 'Shikara', icon: <Ship className="w-5 h-5" />, path: '/shikara' },
    { name: 'Hotel', icon: <Building2 className="w-5 h-5" />, path: '/hotel' },
    { name: 'Reservation Voucher', icon: <FileText className="w-5 h-5" />, path: '/reservation-voucher' },
    { name: 'Reservation Receipt', icon: <Receipt className="w-5 h-5" />, path: '/reservation-receipt' },
    { name: 'Room Availability', icon: <Calendar className="w-5 h-5" />, path: '/room-availability' },
  ];

  const accountItems = [
    { name: 'Income', icon: <TrendingUp className="w-4 h-4" />, path: '/accounts/income' },
    { name: 'Expense', icon: <TrendingDown className="w-4 h-4" />, path: '/accounts/expense' },
    { name: 'Ledger Setup', icon: <Settings className="w-4 h-4" />, path: '/accounts/ledger-setup' },
    { name: 'Cash Book', icon: <BookOpen className="w-4 h-4" />, path: '/accounts/cash-book' },
  ];

  const settlementItems = [
    { name: 'Payment', icon: <DollarSign className="w-4 h-4" />, path: '/accounts/settlement/payment' },
    { name: 'Reports', icon: <BarChart3 className="w-4 h-4" />, path: '/accounts/settlement/reports' },
    { name: 'Finance Details', icon: <FileText className="w-4 h-4" />, path: '/accounts/settlement/finance' },
  ];

  return (
    <div className="flex flex-col h-full bg-primary text-primary-foreground w-64 p-4">
      <div className="mb-8 pt-6">
        <h2 className="text-xl font-semibold tracking-tight">Access Rooms</h2>
        <p className="text-sm text-primary-foreground/60">Property Management System</p>
      </div>
      
      <div className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              "flex items-center space-x-3 rounded-lg px-4 py-3 transition-colors hover:bg-primary-foreground/10",
              location.pathname === item.path ? "bg-primary-foreground/20" : ""
            )}
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
        
        {/* Account Dropdown */}
        <Collapsible open={accountOpen} onOpenChange={setAccountOpen}>
          <CollapsibleTrigger 
            className={cn(
              "flex items-center justify-between w-full rounded-lg px-4 py-3 transition-colors hover:bg-primary-foreground/10",
              (location.pathname.startsWith('/accounts') && !location.pathname.includes('/settlement')) || accountOpen ? "bg-primary-foreground/20" : ""
            )}
          >
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5" />
              <span className="font-medium">Account</span>
            </div>
            <ChevronDown className={cn("w-4 h-4 transition-transform", accountOpen ? "rotate-180" : "")} />
          </CollapsibleTrigger>
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
              
              {/* Settlement Nested Dropdown */}
              <Collapsible open={settlementOpen} onOpenChange={setSettlementOpen}>
                <CollapsibleTrigger 
                  className={cn(
                    "flex items-center justify-between w-full rounded-lg px-3 py-2 text-sm transition-colors hover:bg-primary-foreground/10",
                    location.pathname.includes('/settlement') || settlementOpen ? "bg-primary-foreground/20" : ""
                  )}
                >
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-4 h-4" />
                    <span>Settlement</span>
                  </div>
                  <ChevronDown className={cn("w-3 h-3 transition-transform", settlementOpen ? "rotate-180" : "")} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="ml-6 mt-1 space-y-1">
                    {settlementItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={cn(
                          "flex items-center space-x-2 rounded-lg px-2 py-1 text-xs transition-colors hover:bg-primary-foreground/10",
                          location.pathname === item.path ? "bg-primary-foreground/20" : ""
                        )}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      <div className="mt-auto pb-6">
        <Link
          to="/logout"
          className="flex items-center space-x-3 rounded-lg px-4 py-3 text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default AccountsSidebar;