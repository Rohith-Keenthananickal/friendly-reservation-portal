import React from 'react';
import AccountsLayout from '@/components/Accounts/AccountsLayout';
import PaymentView from '@/components/Accounts/PaymentView';

const PaymentPage = () => {
  return (
    <AccountsLayout>
      <PaymentView />
    </AccountsLayout>
  );
};

export default PaymentPage;