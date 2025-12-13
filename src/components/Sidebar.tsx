
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { LogOut, Ship, HomeIcon, Building2, FileText, Receipt, Calendar, CreditCard, ChevronDown, BarChart3, DollarSign, ClipboardList } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const Sidebar = () => {
  const location = useLocation();
  const [settlementOpen, setSettlementOpen] = useState(false);
  
  const menuItems = [
    { name: 'Houseboat', icon: <Ship className="w-5 h-5" />, path: '/houseboat' },
    { name: 'Shikara', icon: <Ship className="w-5 h-5" />, path: '/shikara' },
    { name: 'Hotel', icon: <Building2 className="w-5 h-5" />, path: '/hotel' },
    { name: 'Reservation Voucher', icon: <FileText className="w-5 h-5" />, path: '/reservation-voucher' },
    { name: 'Reservation Receipt', icon: <Receipt className="w-5 h-5" />, path: '/reservation-receipt' },
    { name: 'Room Availability', icon: <Calendar className="w-5 h-5" />, path: '/room-availability' },
    { name: 'Receipt', icon: <Receipt className="w-5 h-5" />, path: '/receipt' },
    { name: 'Bookings', icon: <ClipboardList className="w-5 h-5" />, path: '/bookings' },
  ];

  const settlementItems = [
    { name: 'Payment', icon: <DollarSign className="w-4 h-4" />, path: '/settlement/payment' },
    { name: 'Reports', icon: <BarChart3 className="w-4 h-4" />, path: '/settlement/reports' },
    { name: 'Finance Details', icon: <FileText className="w-4 h-4" />, path: '/settlement/finance' },
  ];

  return (
    <div className="flex flex-col h-full bg-hotel-primary text-white w-64 p-4">
      <div className="mb-8 pt-6">
        <h2 className="text-xl font-semibold tracking-tight">Access Rooms</h2>
        <p className="text-sm text-white/60">Property Management System</p>
      </div>
      
      <div className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              "flex items-center space-x-3 rounded-lg px-4 py-3 transition-colors hover:bg-white/10",
              location.pathname === item.path ? "bg-white/20" : ""
            )}
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
        
        {/* Settlement Dropdown */}
        <Collapsible open={settlementOpen} onOpenChange={setSettlementOpen}>
          <CollapsibleTrigger 
            className={cn(
              "flex items-center justify-between w-full rounded-lg px-4 py-3 transition-colors hover:bg-white/10",
              (location.pathname.startsWith('/settlement') || settlementOpen) ? "bg-white/20" : ""
            )}
          >
            <div className="flex items-center space-x-3">
              <CreditCard className="w-5 h-5" />
              <span className="font-medium">Settlement</span>
            </div>
            <ChevronDown className={cn("w-4 h-4 transition-transform", settlementOpen ? "rotate-180" : "")} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="ml-8 mt-1 space-y-1">
              {settlementItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/10",
                    location.pathname === item.path ? "bg-white/20" : ""
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
      
      <div className="mt-auto pb-6">
        <Link
          to="/logout"
          className="flex items-center space-x-3 rounded-lg px-4 py-3 text-white/80 transition-colors hover:bg-white/10"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
