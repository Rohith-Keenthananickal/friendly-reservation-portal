import React from 'react';
import AccountsSidebar from './AccountsSidebar';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface AccountsLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AccountsLayout: React.FC<AccountsLayoutProps> = ({ children, className }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <AccountsSidebar />
      </div>
      
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden absolute top-4 left-4 z-50">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <AccountsSidebar />
        </SheetContent>
      </Sheet>
      
      <main className={cn("flex-1 overflow-y-auto bg-secondary/30 pt-16 md:pt-0", className)}>
        <div className="container max-w-7xl py-6 px-4 md:px-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AccountsLayout;