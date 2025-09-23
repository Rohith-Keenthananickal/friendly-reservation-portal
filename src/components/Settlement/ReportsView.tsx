import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DatePickerWithRange } from '@/components/Reservation/DatePickerWithRange';
import { Download, FileText, Printer } from 'lucide-react';
import { DateRange } from 'react-day-picker';

// Mock data for settlement reports
const reportData = [
  {
    id: 1,
    srNo: 1,
    customerName: 'John Smith',
    bookingSource: 'Agent',
    roomType: 'Deluxe',
    noOfRooms: 2,
    noOfDays: 3,
    hotelPaymentId: 'HPY001',
    advancePayment: { amount: 15000, date: '2024-01-10', mode: 'Credit Card' },
    balancePayment: { amount: 5000, date: '2024-01-15', mode: 'Cash' },
    atmServiceCharges: 200,
    totalAmount: 20000
  },
  {
    id: 2,
    srNo: 2,
    customerName: 'Sarah Johnson',
    bookingSource: 'Direct',
    roomType: 'Standard',
    noOfRooms: 1,
    noOfDays: 2,
    hotelPaymentId: 'HPY002',
    advancePayment: { amount: 8000, date: '2024-01-12', mode: 'UPI' },
    balancePayment: { amount: 4000, date: '2024-01-14', mode: 'UPI' },
    atmServiceCharges: 0,
    totalAmount: 12000
  },
  {
    id: 3,
    srNo: 3,
    customerName: 'Mike Wilson',
    bookingSource: 'MMT',
    roomType: 'Suite',
    noOfRooms: 1,
    noOfDays: 4,
    hotelPaymentId: 'HPY003',
    advancePayment: { amount: 20000, date: '2024-01-08', mode: 'Online' },
    balancePayment: { amount: 10000, date: '2024-01-12', mode: 'Online' },
    atmServiceCharges: 150,
    totalAmount: 30000
  }
];

const ReportsView = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getSourceBadge = (source: string) => {
    const colors = {
      'Agent': 'bg-blue-50 text-blue-700 border-blue-200',
      'Direct': 'bg-green-50 text-green-700 border-green-200',
      'MMT': 'bg-yellow-50 text-yellow-700 border-yellow-200'
    };
    
    return (
      <Badge variant="outline" className={colors[source as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200'}>
        {source}
      </Badge>
    );
  };

  const summaryData = {
    advanceBalance: reportData.reduce((sum, r) => sum + r.advancePayment.amount, 0),
    paidPending: reportData.reduce((sum, r) => sum + r.balancePayment.amount, 0),
    advancePending: reportData.filter(r => r.balancePayment.amount > 0).length
  };

  const grandTotal = reportData.reduce((sum, r) => sum + r.totalAmount, 0);
  const totalCharges = reportData.reduce((sum, r) => sum + r.atmServiceCharges, 0);
  const totalPaid = reportData.reduce((sum, r) => sum + r.advancePayment.amount + r.balancePayment.amount, 0);

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Settlement Reports</h2>
          <p className="text-muted-foreground">Comprehensive settlement and payment reports</p>
        </div>
        <div className="flex items-center gap-4">
          <DatePickerWithRange date={dateRange} setDate={setDateRange} />
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-elegant">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Advance Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(summaryData.advanceBalance)}</div>
            <p className="text-xs text-muted-foreground mt-1">Total advance payments</p>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Paid Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(summaryData.paidPending)}</div>
            <p className="text-xs text-muted-foreground mt-1">Balance payments received</p>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Advance Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{summaryData.advancePending}</div>
            <p className="text-xs text-muted-foreground mt-1">Bookings with pending balance</p>
          </CardContent>
        </Card>
      </div>

      {/* Settlement Report Table */}
      <Card className="card-elegant">
        <CardHeader>
          <CardTitle>Settlement Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Sr. No</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Booking Source</TableHead>
                  <TableHead>Room Type</TableHead>
                  <TableHead>Rooms</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Hotel Payment ID</TableHead>
                  <TableHead>Advance Payment</TableHead>
                  <TableHead>Balance Payment</TableHead>
                  <TableHead>ATM/Card Charges</TableHead>
                  <TableHead>Total Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportData.map((report) => (
                  <TableRow key={report.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{report.srNo}</TableCell>
                    <TableCell>
                      <div className="font-medium">{report.customerName}</div>
                    </TableCell>
                    <TableCell>{getSourceBadge(report.bookingSource)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        {report.roomType}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">{report.noOfRooms}</TableCell>
                    <TableCell className="text-center">{report.noOfDays}</TableCell>
                    <TableCell>
                      <div className="font-mono text-sm bg-muted px-2 py-1 rounded">
                        {report.hotelPaymentId}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{formatCurrency(report.advancePayment.amount)}</div>
                        <div className="text-muted-foreground">{formatDate(report.advancePayment.date)}</div>
                        <div className="text-xs text-muted-foreground">{report.advancePayment.mode}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{formatCurrency(report.balancePayment.amount)}</div>
                        <div className="text-muted-foreground">{formatDate(report.balancePayment.date)}</div>
                        <div className="text-xs text-muted-foreground">{report.balancePayment.mode}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {report.atmServiceCharges > 0 ? (
                          <span className="text-orange-600 font-medium">{formatCurrency(report.atmServiceCharges)}</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-bold">{formatCurrency(report.totalAmount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Total Summary */}
      <Card className="card-elegant">
        <CardHeader>
          <CardTitle>Summary Totals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="text-sm text-muted-foreground">Grand Total</div>
              <div className="text-2xl font-bold text-primary">{formatCurrency(grandTotal)}</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="text-sm text-muted-foreground">Total Charges</div>
              <div className="text-2xl font-bold text-orange-600">{formatCurrency(totalCharges)}</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-sm text-muted-foreground">Total Paid</div>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(totalPaid)}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsView;