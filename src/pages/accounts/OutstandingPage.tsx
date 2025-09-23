import React from 'react';
import AccountsLayout from '@/components/Accounts/AccountsLayout';
import OutstandingView from '@/components/Accounts/OutstandingView';

const OutstandingPage = () => {
  return (
    <AccountsLayout>
      <OutstandingView />
    </AccountsLayout>
  );
};

export default OutstandingPage;