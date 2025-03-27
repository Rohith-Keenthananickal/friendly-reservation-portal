
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ReservationHeaderProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const ReservationHeader: React.FC<ReservationHeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex items-center justify-between w-full mb-8 fade-up delay-1">
      <div className="flex-1">
        <h1 className="text-2xl font-semibold text-hotel-primary">Create Reservation</h1>
        <p className="text-muted-foreground mt-1">Fill the details to create a new reservation</p>
      </div>
      
      <div className="flex items-center space-x-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList className="bg-secondary/70">
            <TabsTrigger value="create" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Create
            </TabsTrigger>
            <TabsTrigger value="view" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              View
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default ReservationHeader;
