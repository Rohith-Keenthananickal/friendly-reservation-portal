import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import NewSidebar from './NewSidebar';
import TopSection from './TopSection';

interface SettlementLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const SettlementLayout: React.FC<SettlementLayoutProps> = ({ children, className }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <NewSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Section */}
        <TopSection />
        
        {/* Page Content */}
        <main className={cn("flex-1 overflow-y-auto bg-secondary/30", className)}>
          <div className="container max-w-7xl py-6 px-4 md:px-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettlementLayout;