import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TopSection from './TopSection';
import SummaryCards from './SummaryCards';
import DefaultView from './BookingViews/DefaultView';
import AccessRoomsView from './BookingViews/AccessRoomsView';
import OTAView from './BookingViews/OTAView';

const PaymentView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bookingMode, setBookingMode] = useState('all');
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});

  const renderBookingTable = () => {
    switch (bookingMode) {
      case 'access-rooms':
        return <AccessRoomsView />;
      case 'ota':
        return <OTAView />;
      default:
        return <DefaultView />;
    }
  };

  return (
    <div className="space-y-6">
      <TopSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        bookingMode={bookingMode}
        setBookingMode={setBookingMode}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      
      <SummaryCards />
      
      <Card>
        <CardHeader>
          <CardTitle>
            Booking Details 
            {bookingMode !== 'all' && ` - ${bookingMode.replace('-', ' ').toUpperCase()}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderBookingTable()}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentView;