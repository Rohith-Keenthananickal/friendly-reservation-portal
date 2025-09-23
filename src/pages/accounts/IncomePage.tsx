import React from 'react';
import AccountsLayout from '@/components/Accounts/AccountsLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const IncomePage = () => {
  return (
    <AccountsLayout>
      <Card>
        <CardHeader>
          <CardTitle>Income Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Income management functionality coming soon...</p>
        </CardContent>
      </Card>
    </AccountsLayout>
  );
};

export default IncomePage;