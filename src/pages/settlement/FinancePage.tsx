import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FinancePage = () => {
  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle>Finance Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Finance details functionality coming soon...</p>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default FinancePage;