
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ReservationHeader from '@/components/Reservation/ReservationHeader';
import GuestInformation from '@/components/Reservation/GuestInformation';
import CompanyInformation from '@/components/Reservation/CompanyInformation';
import PaymentInformation from '@/components/Reservation/PaymentInformation';
import RoomDetails from '@/components/Reservation/RoomDetails';
import DocumentUpload from '@/components/Reservation/DocumentUpload';
import ReservationTable from '@/components/Reservation/ReservationTable';
import { DateRange } from 'react-day-picker';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ReceiptView from '@/components/Receipt/ReceiptView';
import BookingView from '@/components/Booking/BookingView';
import PaymentView from '@/components/Accounts/PaymentView';
import { Hotel, FileText, Calendar, CreditCard } from 'lucide-react';

const Index = () => {
  // Main tabs state
  const [mainTab, setMainTab] = useState<string>("reservation");
  
  // Reservation tabs state
  const [activeTab, setActiveTab] = useState<string>("create");
  
  // Guest information state
  const [userType, setUserType] = useState<string>("indian");
  const [guestName, setGuestName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [hasGST, setHasGST] = useState<string>("no");
  const [bookingMode, setBookingMode] = useState<string>("company");
  
  // Company information state
  const [companyName, setCompanyName] = useState<string>("");
  const [agentAddress, setAgentAddress] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  
  // Payment information state
  const [paymentMode, setPaymentMode] = useState<string>("cash");
  const [paymentStatus, setPaymentStatus] = useState<string>("pending");
  
  // Room details state
  const [dateRange, setDateRange] = useState<DateRange>();

  return (
    <Layout>
      <div className="space-y-6">
        <Tabs
          defaultValue="reservation"
          value={mainTab}
          onValueChange={setMainTab}
          className="w-full fade-up"
        >
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto mb-8">
            <TabsTrigger 
              value="reservation"
              className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Hotel className="h-4 w-4" />
              Reservation
            </TabsTrigger>
            <TabsTrigger 
              value="receipt"
              className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <FileText className="h-4 w-4" />
              Receipt
            </TabsTrigger>
            <TabsTrigger 
              value="booking"
              className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Calendar className="h-4 w-4" />
              Bookings
            </TabsTrigger>
            <TabsTrigger 
              value="settlement"
              className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <CreditCard className="h-4 w-4" />
              Settlement
            </TabsTrigger>
          </TabsList>

          {/* Reservation Tab Content */}
          <TabsContent value="reservation" className="mt-0">
            <ReservationHeader 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            
            {activeTab === "create" ? (
              <>
                <GuestInformation 
                  userType={userType}
                  setUserType={setUserType}
                  guestName={guestName}
                  setGuestName={setGuestName}
                  address={address}
                  setAddress={setAddress}
                  hasGST={hasGST}
                  setHasGST={setHasGST}
                  bookingMode={bookingMode}
                  setBookingMode={setBookingMode}
                />
                
                <CompanyInformation 
                  bookingMode={bookingMode}
                  companyName={companyName}
                  setCompanyName={setCompanyName}
                  agentAddress={agentAddress}
                  setAgentAddress={setAgentAddress}
                  designation={designation}
                  setDesignation={setDesignation}
                />
                
                <PaymentInformation 
                  paymentMode={paymentMode}
                  setPaymentMode={setPaymentMode}
                  paymentStatus={paymentStatus}
                  setPaymentStatus={setPaymentStatus}
                />
                
                <DocumentUpload userType={userType} />
                
                <RoomDetails 
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                />
              </>
            ) : (
              <ReservationTable />
            )}
          </TabsContent>

          {/* Receipt Tab Content */}
          <TabsContent value="receipt" className="mt-0">
            <ReceiptView />
          </TabsContent>

          {/* Booking Tab Content */}
          <TabsContent value="booking" className="mt-0">
            <BookingView />
          </TabsContent>

          {/* Settlement Tab Content */}
          <TabsContent value="settlement" className="mt-0">
            <PaymentView />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Index;
