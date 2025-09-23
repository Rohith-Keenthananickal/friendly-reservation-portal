import React from 'react';
import SettlementLayout from '@/components/Settlement/SettlementLayout';
import OutstandingView from '@/components/Settlement/OutstandingView';

const OutstandingPage = () => {
  return (
    <SettlementLayout>
      <OutstandingView />
    </SettlementLayout>
  );
};

export default OutstandingPage;