
import React from 'react';
import PaymentInformation from '@/components/Reservation/PaymentInformation';

const PaymentPage = () => {
  // Initialize state directly in this component
  const [paymentMode, setPaymentMode] = React.useState<string>("cash");
  const [paymentStatus, setPaymentStatus] = React.useState<string>("pending");

  return (
    <div className="p-4">
      <PaymentInformation
        paymentMode={paymentMode}
        setPaymentMode={setPaymentMode}
        paymentStatus={paymentStatus}
        setPaymentStatus={setPaymentStatus}
      />
    </div>
  );
};

export default PaymentPage;
