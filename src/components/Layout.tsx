
import React from 'react';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className={cn("flex-1 overflow-y-auto bg-secondary/30", className)}>
        <div className="container max-w-7xl py-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
