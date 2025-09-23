import React from 'react';
import AccountsLayout from '@/components/Accounts/AccountsLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ExpensePage = () => {
  return (
    <AccountsLayout>
      <Card>
        <CardHeader>
          <CardTitle>Expense Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Expense management functionality coming soon...</p>
        </CardContent>
      </Card>
    </AccountsLayout>
  );
};

export default ExpensePage;