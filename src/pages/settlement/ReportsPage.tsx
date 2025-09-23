import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ReportsPage = () => {
  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle>Settlement Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Settlement reports functionality coming soon...</p>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default ReportsPage;