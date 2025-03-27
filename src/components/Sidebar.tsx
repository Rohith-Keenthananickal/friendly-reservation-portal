
import React from 'react';
import { cn } from '@/lib/utils';
import { LogOut, Ship, HomeIcon, Building2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Houseboat', icon: <Ship className="w-5 h-5" />, path: '/houseboat' },
    { name: 'Shikara', icon: <Ship className="w-5 h-5" />, path: '/shikara' },
    { name: 'Hotel', icon: <Building2 className="w-5 h-5" />, path: '/hotel' },
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
