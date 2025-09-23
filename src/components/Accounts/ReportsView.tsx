import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Download, FileDown } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Mock data for settlement reports
const mockReportData = [
  {
    srNo: 1,
    customerName: 'John Smith',
    bookingSource: 'Agent',
    roomType: 'Deluxe',
    noOfRooms: 2,
    noOfDays: 3,
    hotelPaymentId: 'HP001',
    advancePayment: { amount: 5000, date: '2024-01-10', mode: 'UPI' },
    balancePayment: { amount: 10000, date: '2024-01-15', mode: 'Cash' },
    atmCardCharges: 150,
    totalAmount: 15150
  },
  {
    srNo: 2,
    customerName: 'Sarah Johnson',
    bookingSource: 'Direct',
    roomType: 'Suite',
    noOfRooms: 1,
    noOfDays: 2,
    hotelPaymentId: 'HP002',
    advancePayment: { amount: 8000, date: '2024-01-12', mode: 'Card' },
    balancePayment: { amount: 12000, date: '2024-01-18', mode: 'UPI' },
    atmCardCharges: 200,
    totalAmount: 20200
  },
  {
    srNo: 3,
    customerName: 'Mike Wilson',
    bookingSource: 'MMT',
    roomType: 'Standard',
    noOfRooms: 1,
    noOfDays: 1,
    hotelPaymentId: 'HP003',
    advancePayment: { amount: 3000, date: '2024-01-14', mode: 'UPI' },
    balancePayment: { amount: 5000, date: '2024-01-20', mode: 'Cash' },
    atmCardCharges: 100,
    totalAmount: 8100
  },
];

const ReportsView: React.FC = () => {
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [editableCharges, setEditableCharges] = useState<{ [key: number]: number }>({});

  const handleChargesChange = (srNo: number, value: number) => {
    setEditableCharges(prev => ({ ...prev, [srNo]: value }));
  };

  const getSourceTagColor = (source: string) => {
    switch (source) {
      case 'Agent':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Direct':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'MMT':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const summaryCards = [
    { title: 'Advance Balance', amount: '₹16,000', color: 'bg-blue-50 border-blue-200 text-blue-600' },
    { title: 'Paid Pending', amount: '₹27,000', color: 'bg-green-50 border-green-200 text-green-600' },
    { title: 'Advance Pending', amount: '₹5,000', color: 'bg-orange-50 border-orange-200 text-orange-600' },
  ];

  const grandTotal = mockReportData.reduce((sum, item) => sum + item.totalAmount, 0);
  const totalCharges = mockReportData.reduce((sum, item) => sum + (editableCharges[item.srNo] || item.atmCardCharges), 0);
  const totalPaid = grandTotal;

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <Card className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Settlement Reports</h1>
            <p className="text-muted-foreground">Generate and export settlement reports</p>
          </div>
          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !dateRange.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd")} - {format(dateRange.to, "LLL dd")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={{ from: dateRange.from, to: dateRange.to }}
                  onSelect={(range) => setDateRange(range || {})}
                  numberOfMonths={2}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export to Excel
            </Button>
            <Button variant="outline">
              <FileDown className="mr-2 h-4 w-4" />
              Export to PDF
            </Button>
          </div>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryCards.map((card, index) => (
          <Card key={index} className={`border-2 ${card.color}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.amount}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Settlement Report Table */}
      <Card>
        <CardHeader>
          <CardTitle>Settlement Report Table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Sr. No</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Booking Source</TableHead>
                  <TableHead>Room Type</TableHead>
                  <TableHead>No. of Rooms</TableHead>
                  <TableHead>No. of Days</TableHead>
                  <TableHead>Hotel Payment ID</TableHead>
                  <TableHead>Advance Payment</TableHead>
                  <TableHead>Balance Payment</TableHead>
                  <TableHead>ATM/Card Charges</TableHead>
                  <TableHead>Total Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockReportData.map((report, index) => (
                  <TableRow key={report.srNo} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                    <TableCell>{report.srNo}</TableCell>
                    <TableCell className="font-medium">{report.customerName}</TableCell>
                    <TableCell>
                      <Badge className={getSourceTagColor(report.bookingSource)}>
                        {report.bookingSource}
                      </Badge>
                    </TableCell>
                    <TableCell>{report.roomType}</TableCell>
                    <TableCell>{report.noOfRooms}</TableCell>
                    <TableCell>{report.noOfDays}</TableCell>
                    <TableCell>{report.hotelPaymentId}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>₹{report.advancePayment.amount.toLocaleString()}</div>
                        <div className="text-muted-foreground">{report.advancePayment.date}</div>
                        <div className="text-muted-foreground">{report.advancePayment.mode}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>₹{report.balancePayment.amount.toLocaleString()}</div>
                        <div className="text-muted-foreground">{report.balancePayment.date}</div>
                        <div className="text-muted-foreground">{report.balancePayment.mode}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={editableCharges[report.srNo] || report.atmCardCharges}
                        onChange={(e) => handleChargesChange(report.srNo, Number(e.target.value))}
                        className="w-20"
                      />
                    </TableCell>
                    <TableCell className="font-semibold">
                      ₹{report.totalAmount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Total Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Total Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-sm font-medium text-blue-600">Grand Total</div>
              <div className="text-2xl font-bold text-blue-700">₹{grandTotal.toLocaleString()}</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="text-sm font-medium text-orange-600">Total Charges</div>
              <div className="text-2xl font-bold text-orange-700">₹{totalCharges.toLocaleString()}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-sm font-medium text-green-600">Total Paid</div>
              <div className="text-2xl font-bold text-green-700">₹{totalPaid.toLocaleString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsView;