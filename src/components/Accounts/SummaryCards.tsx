import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, AlertCircle, Clock } from 'lucide-react';

const SummaryCards: React.FC = () => {
  const summaryData = [
    {
      title: 'Total Payment',
      amount: '₹1,25,000',
      icon: <DollarSign className="h-6 w-6" />,
      status: 'paid',
      description: 'All settled payments'
    },
    {
      title: 'Outstanding Payment',
      amount: '₹45,000',
      icon: <AlertCircle className="h-6 w-6" />,
      status: 'pending',
      description: 'Pending settlements'
    },
    {
      title: 'Pending Balance',
      amount: '₹12,500',
      icon: <Clock className="h-6 w-6" />,
      status: 'partial',
      description: 'Partial payments'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 border-green-200 bg-green-50';
      case 'pending':
        return 'text-red-600 border-red-200 bg-red-50';
      case 'partial':
        return 'text-orange-600 border-orange-200 bg-orange-50';
      default:
        return 'text-gray-600 border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {summaryData.map((item, index) => (
        <Card key={index} className={`border-2 ${getStatusColor(item.status)}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            {item.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.amount}</div>
            <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCards;