import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download } from 'lucide-react';
import SummaryCards from './SummaryCards';
import DefaultView from './BookingViews/DefaultView';
import AccessRoomsView from './BookingViews/AccessRoomsView';
import OTAView from './BookingViews/OTAView';

const NewPaymentView = () => {
  const [selectedView, setSelectedView] = useState('all');

  // Mock summary data
  const summaryData = {
    totalPayment: 110000,
    outstandingPayment: 28000,
    pendingBalance: 3
  };

  const handleExportExcel = () => {
    console.log('Exporting to Excel...');
  };

  const renderBookingView = () => {
    switch (selectedView) {
      case 'Access Rooms':
        return <AccessRoomsView />;
      case 'OTA':
        return <OTAView />;
      default:
        return <DefaultView />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <SummaryCards 
        totalPayment={summaryData.totalPayment}
        outstandingPayment={summaryData.outstandingPayment}
        pendingBalance={summaryData.pendingBalance}
      />

      {/* Booking Mode Selector and Export */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">View Mode:</label>
          <Select value={selectedView} onValueChange={setSelectedView}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select booking mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Bookings</SelectItem>
              <SelectItem value="Access Rooms">Access Rooms</SelectItem>
              <SelectItem value="OTA">OTA</SelectItem>
              <SelectItem value="Agent">Agent</SelectItem>
              <SelectItem value="Company">Company</SelectItem>
              <SelectItem value="Direct">Direct</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleExportExcel} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Excel
        </Button>
      </div>

      {/* Dynamic Booking View */}
      {renderBookingView()}
    </div>
  );
};

export default NewPaymentView;