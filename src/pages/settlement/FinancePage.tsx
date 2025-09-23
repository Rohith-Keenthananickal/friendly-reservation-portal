import React from 'react';
import SettlementLayout from '@/components/Settlement/SettlementLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FinancePage = () => {
  return (
    <SettlementLayout>
      <Card className="card-elegant">
        <CardHeader>
          <CardTitle>Finance Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Finance details functionality coming soon...</p>
        </CardContent>
      </Card>
    </SettlementLayout>
  );
};

export default FinancePage;