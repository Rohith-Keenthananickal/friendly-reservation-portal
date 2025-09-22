import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DatePickerWithRange } from '@/components/Reservation/DatePickerWithRange';
import { Download, Search, Filter, DollarSign, TrendingUp, AlertCircle, CreditCard } from 'lucide-react';
import { DateRange } from 'react-day-picker';

// Mock data
const mockBookingData = [
  {
    id: 1,
    dateIn: '2024-01-15',
    dateOut: '2024-01-18',
    guestName: 'John Smith',
    reservationNumber: 'RES001',
    bookingMode: 'Agent',
    companyAgentName: 'Travel Pro Agency',
    pendingAmount: 5000,
    paymentMode: 'Credit Card',
    advanceAmount: 15000,
    advanceDate: '2024-01-10',
    balanceAmount: 5000,
    balanceDate: '2024-01-18',
    transactionNumber: 'TXN123456',
    atmServiceCharges: 200,
    finalStatus: 'Pending',
    commissionAmount: 2000,
    hotelAmount: 18000,
    paymentBy: 'Guest'
  },
  {
    id: 2,
    dateIn: '2024-01-20',
    dateOut: '2024-01-23',
    guestName: 'Sarah Johnson',
    reservationNumber: 'RES002',
    bookingMode: 'Direct',
    companyAgentName: '-',
    pendingAmount: 0,
    paymentMode: 'UPI',
    advanceAmount: 12000,
    advanceDate: '2024-01-15',
    balanceAmount: 0,
    balanceDate: '2024-01-20',
    transactionNumber: 'UPI789012',
    atmServiceCharges: 0,
    finalStatus: 'Paid',
    commissionAmount: 0,
    hotelAmount: 12000,
    paymentBy: 'Guest'
  },
  {
    id: 3,
    dateIn: '2024-01-25',
    dateOut: '2024-01-28',
    guestName: 'Mike Wilson',
    reservationNumber: 'RES003',
    bookingMode: 'Access Rooms',
    companyAgentName: 'Access Rooms Portal',
    pendingAmount: 8000,
    paymentMode: 'Net Banking',
    advanceAmount: 10000,
    advanceDate: '2024-01-20',
    balanceAmount: 8000,
    balanceDate: null,
    transactionNumber: 'NET345678',
    atmServiceCharges: 150,
    finalStatus: 'Partial',
    commissionAmount: 1800,
    hotelAmount: 16200,
    paymentBy: 'Agent'
  },
  {
    id: 4,
    dateIn: '2024-02-01',
    dateOut: '2024-02-04',
    guestName: 'Emma Davis',
    reservationNumber: 'RES004',
    bookingMode: 'OTA',
    companyAgentName: 'Booking.com',
    pendingAmount: 0,
    paymentMode: 'Online',
    advanceAmount: 25000,
    advanceDate: '2024-01-25',
    balanceAmount: 0,
    balanceDate: '2024-02-01',
    transactionNumber: 'OTA901234',
    atmServiceCharges: 0,
    finalStatus: 'Paid',
    commissionAmount: 3750,
    hotelAmount: 21250,
    paymentBy: 'Online'
  },
  {
    id: 5,
    dateIn: '2024-02-05',
    dateOut: '2024-02-08',
    guestName: 'David Brown',
    reservationNumber: 'RES005',
    bookingMode: 'Company',
    companyAgentName: 'Tech Corp Ltd',
    pendingAmount: 15000,
    paymentMode: 'Cheque',
    advanceAmount: 20000,
    advanceDate: '2024-01-30',
    balanceAmount: 15000,
    balanceDate: null,
    transactionNumber: 'CHQ567890',
    atmServiceCharges: 0,
    finalStatus: 'Pending',
    commissionAmount: 0,
    hotelAmount: 35000,
    paymentBy: 'Company'
  }
];

const PaymentView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bookingModeFilter, setBookingModeFilter] = useState('all');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // Filter data
  const filteredData = mockBookingData.filter(booking => {
    const matchesSearch = searchTerm === '' || 
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.reservationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBookingMode = bookingModeFilter === 'all' || booking.bookingMode === bookingModeFilter;
    
    // Date range filtering logic can be added here
    
    return matchesSearch && matchesBookingMode;
  });

  // Calculate summary statistics
  const totalPayment = filteredData.reduce((sum, booking) => sum + booking.advanceAmount + (booking.balanceAmount || 0), 0);
  const outstandingPayment = filteredData.reduce((sum, booking) => sum + booking.pendingAmount, 0);
  const pendingBalance = filteredData.filter(booking => booking.finalStatus === 'Pending').length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return <Badge className="status-paid">Paid</Badge>;
      case 'Pending':
        return <Badge className="status-pending">Pending</Badge>;
      case 'Partial':
        return <Badge className="status-partial">Partial</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleExportExcel = () => {
    // Export functionality placeholder
    console.log('Exporting to Excel...');
  };

  return (
    <div className="space-y-6">
      {/* User Details & Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payment Management</h1>
          <p className="text-muted-foreground">Manage bookings and payment settlements</p>
        </div>
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="text-right">
            <p className="font-medium">Admin User</p>
            <p className="text-sm text-muted-foreground">admin@accessrooms.com</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by guest name or reservation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={bookingModeFilter} onValueChange={setBookingModeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by booking mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Booking Modes</SelectItem>
                <SelectItem value="Access Rooms">Access Rooms</SelectItem>
                <SelectItem value="OTA">OTA</SelectItem>
                <SelectItem value="Agent">Agent</SelectItem>
                <SelectItem value="Company">Company</SelectItem>
                <SelectItem value="Direct">Direct</SelectItem>
              </SelectContent>
            </Select>

            <DatePickerWithRange
              date={dateRange}
              setDate={setDateRange}
            />

            <Button onClick={handleExportExcel} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Excel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payment</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalPayment)}</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Payment</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(outstandingPayment)}</div>
            <p className="text-xs text-muted-foreground">-5.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Balance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingBalance}</div>
            <p className="text-xs text-muted-foreground">bookings pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Booking Details Table */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SL No</TableHead>
                  <TableHead>Date In / Out</TableHead>
                  <TableHead>Guest / Reservation</TableHead>
                  <TableHead>Booking Mode</TableHead>
                  <TableHead>Company/Agent</TableHead>
                  <TableHead>Pending Amount</TableHead>
                  <TableHead>Payment Mode</TableHead>
                  <TableHead>Advance Payment</TableHead>
                  <TableHead>Balance Payment</TableHead>
                  <TableHead>Transaction No</TableHead>
                  <TableHead>ATM Charges</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((booking, index) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>In: {formatDate(booking.dateIn)}</div>
                        <div>Out: {formatDate(booking.dateOut)}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{booking.guestName}</div>
                        <div className="text-muted-foreground">{booking.reservationNumber}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{booking.bookingMode}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{booking.companyAgentName}</TableCell>
                    <TableCell>
                      {booking.pendingAmount > 0 ? (
                        <span className="text-red-600 font-medium">{formatCurrency(booking.pendingAmount)}</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <CreditCard className="h-3 w-3" />
                        <span className="text-sm">{booking.paymentMode}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{formatCurrency(booking.advanceAmount)}</div>
                        <div className="text-muted-foreground">{formatDate(booking.advanceDate)}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">
                          {booking.balanceAmount ? formatCurrency(booking.balanceAmount) : '-'}
                        </div>
                        <div className="text-muted-foreground">{formatDate(booking.balanceDate)}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-mono">{booking.transactionNumber}</TableCell>
                    <TableCell>
                      {booking.atmServiceCharges > 0 ? (
                        <span className="text-orange-600">{formatCurrency(booking.atmServiceCharges)}</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(booking.finalStatus)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Total Amount */}
          <div className="mt-6 p-4 border-t">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total Amount (Filtered Records):</span>
              <span className="text-primary">{formatCurrency(totalPayment)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentView;