import React from 'react';
import AccountsLayout from '@/components/Accounts/AccountsLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FinancePage = () => {
  return (
    <AccountsLayout>
      <Card>
        <CardHeader>
          <CardTitle>Finance Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Finance details functionality coming soon...</p>
        </CardContent>
      </Card>
    </AccountsLayout>
  );
};

export default FinancePage;