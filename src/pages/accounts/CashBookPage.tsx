import React from 'react';
import AccountsLayout from '@/components/Accounts/AccountsLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CashBookPage = () => {
  return (
    <AccountsLayout>
      <Card>
        <CardHeader>
          <CardTitle>Cash Book</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Cash book functionality coming soon...</p>
        </CardContent>
      </Card>
    </AccountsLayout>
  );
};

export default CashBookPage;