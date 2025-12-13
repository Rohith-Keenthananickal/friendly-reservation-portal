import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Eye, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Payment {
  date: string;
  receiptNo: string;
  type: string;
  mode: string;
  txnRef: string;
  collectedBy: string;
  amount: number;
}

interface Summary {
  grandTotal: number;
  totalPaid: number;
  balance: number;
}

interface PaymentsReceiptsTabProps {
  payments: Payment[];
  summary: Summary;
}

export const PaymentsReceiptsTab: React.FC<PaymentsReceiptsTabProps> = ({
  payments,
  summary,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const getTypeBadge = (type: string) => {
    const styles: Record<string, string> = {
      'Advance': 'bg-blue-100 text-blue-800 border-blue-200',
      'Partial': 'bg-amber-100 text-amber-800 border-amber-200',
      'Balance': 'bg-green-100 text-green-800 border-green-200',
      'Refund': 'bg-red-100 text-red-800 border-red-200',
    };
    return styles[type] || 'bg-gray-100 text-gray-800';
  };

  const getModeBadge = (mode: string) => {
    const styles: Record<string, string> = {
      'Cash': 'bg-emerald-100 text-emerald-800',
      'Card': 'bg-indigo-100 text-indigo-800',
      'UPI': 'bg-purple-100 text-purple-800',
      'Online': 'bg-cyan-100 text-cyan-800',
      'Bank Transfer': 'bg-slate-100 text-slate-800',
    };
    return styles[mode] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Payment Ledger */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Payment Ledger
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-28">Date</TableHead>
                <TableHead className="w-32">Receipt No.</TableHead>
                <TableHead className="w-24">Type</TableHead>
                <TableHead className="w-28">Mode</TableHead>
                <TableHead>Transaction Ref.</TableHead>
                <TableHead className="w-28">Collected By</TableHead>
                <TableHead className="w-28 text-right">Amount</TableHead>
                <TableHead className="w-20 text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment, index) => (
                <TableRow key={index} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{formatDate(payment.date)}</TableCell>
                  <TableCell className="font-mono text-sm">{payment.receiptNo}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getTypeBadge(payment.type)}>
                      {payment.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getModeBadge(payment.mode)}>
                      {payment.mode}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {payment.txnRef}
                  </TableCell>
                  <TableCell>{payment.collectedBy}</TableCell>
                  <TableCell className="text-right font-mono font-semibold text-green-600">
                    {formatCurrency(payment.amount)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button variant="outline" size="sm" className="h-8">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <Card className={summary.balance > 0 ? 'border-amber-200 bg-amber-50/30 dark:bg-amber-950/10' : 'border-green-200 bg-green-50/30 dark:bg-green-950/10'}>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            {summary.balance > 0 ? (
              <>
                <AlertCircle className="h-5 w-5 text-amber-600" />
                <h3 className="font-semibold text-amber-800 dark:text-amber-400">Payment Pending</h3>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-green-800 dark:text-green-400">Payment Complete</h3>
              </>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-background rounded-lg border">
              <p className="text-sm text-muted-foreground mb-1">Total Invoice Amount</p>
              <p className="text-2xl font-bold font-mono">{formatCurrency(summary.grandTotal)}</p>
            </div>
            <div className="text-center p-4 bg-background rounded-lg border">
              <p className="text-sm text-muted-foreground mb-1">Total Paid</p>
              <p className="text-2xl font-bold font-mono text-green-600">{formatCurrency(summary.totalPaid)}</p>
            </div>
            <div className={`text-center p-4 rounded-lg border ${summary.balance > 0 ? 'bg-amber-100/50 border-amber-200' : 'bg-green-100/50 border-green-200'}`}>
              <p className="text-sm text-muted-foreground mb-1">
                {summary.balance > 0 ? 'Balance Due' : 'Settled'}
              </p>
              <p className={`text-2xl font-bold font-mono ${summary.balance > 0 ? 'text-amber-600' : 'text-green-600'}`}>
                {formatCurrency(Math.abs(summary.balance))}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
