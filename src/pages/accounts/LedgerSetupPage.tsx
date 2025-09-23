import React from 'react';
import AccountsLayout from '@/components/Accounts/AccountsLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LedgerSetupPage = () => {
  return (
    <AccountsLayout>
      <Card>
        <CardHeader>
          <CardTitle>Ledger Setup</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Ledger setup functionality coming soon...</p>
        </CardContent>
      </Card>
    </AccountsLayout>
  );
};

export default LedgerSetupPage;