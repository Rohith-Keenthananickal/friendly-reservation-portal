
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

const Index = () => {
  // Tabs state
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
      </div>
    </Layout>
  );
};

export default Index;
