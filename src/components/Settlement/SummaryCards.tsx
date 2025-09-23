import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, AlertCircle, CreditCard } from 'lucide-react';

interface SummaryCardsProps {
  totalPayment: number;
  outstandingPayment: number;
  pendingBalance: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalPayment,
  outstandingPayment,
  pendingBalance
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card className="card-elegant hover:shadow-lg transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Payment</CardTitle>
          <div className="p-2 bg-green-100 rounded-lg">
            <DollarSign className="h-4 w-4 text-green-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{formatCurrency(totalPayment)}</div>
          <div className="flex items-center text-xs text-green-600 mt-1">
            <TrendingUp className="h-3 w-3 mr-1" />
            +2.1% from last month
          </div>
        </CardContent>
      </Card>

      <Card className="card-elegant hover:shadow-lg transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Outstanding Payment</CardTitle>
          <div className="p-2 bg-red-100 rounded-lg">
            <AlertCircle className="h-4 w-4 text-red-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{formatCurrency(outstandingPayment)}</div>
          <div className="flex items-center text-xs text-red-600 mt-1">
            <TrendingUp className="h-3 w-3 mr-1" />
            -5.2% from last month
          </div>
        </CardContent>
      </Card>

      <Card className="card-elegant hover:shadow-lg transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Pending Balance</CardTitle>
          <div className="p-2 bg-orange-100 rounded-lg">
            <CreditCard className="h-4 w-4 text-orange-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">{pendingBalance}</div>
          <div className="text-xs text-muted-foreground mt-1">bookings pending</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;