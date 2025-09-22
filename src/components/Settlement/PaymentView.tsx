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
    bookingMode: 'OTA',
    companyAgentName: 'Booking.com',
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
    paymentBy: 'Guest',
    roomType: 'Deluxe Room',
    roomNo: '101',
    numberOfDays: 3,
    bookingType: 'Pay at Hotel',
    bookingStatus: 'Confirmed',
    bookingAmount: 20000
  },
  {
    id: 2,
    dateIn: '2024-01-20',
    dateOut: '2024-01-23',
    guestName: 'Sarah Johnson',
    reservationNumber: 'RES002',
    bookingMode: 'OTA',
    companyAgentName: 'Agoda',
    pendingAmount: 0,
    paymentMode: 'UPI',
    advanceAmount: 12000,
    advanceDate: '2024-01-15',
    balanceAmount: 0,
    balanceDate: '2024-01-20',
    transactionNumber: 'UPI789012',
    atmServiceCharges: 0,
    finalStatus: 'Paid',
    commissionAmount: 1800,
    hotelAmount: 10200,
    paymentBy: 'Guest',
    roomType: 'Standard Room',
    roomNo: '205',
    numberOfDays: 3,
    bookingType: 'Paid Online',
    bookingStatus: 'Checked-in',
    bookingAmount: 12000
  },
  {
    id: 3,
    dateIn: '2024-01-25',
    dateOut: '2024-01-28',
    guestName: 'Mike Wilson',
    reservationNumber: 'RES003',
    bookingMode: 'OTA',
    companyAgentName: 'Expedia',
    pendingAmount: 8000,
    paymentMode: 'Net Banking',
    advanceAmount: 10000,
    advanceDate: '2024-01-20',
    balanceAmount: 8000,
    balanceDate: null,
    transactionNumber: 'NET345678',
    atmServiceCharges: 150,
    finalStatus: 'Partial',
    commissionAmount: 2700,
    hotelAmount: 15300,
    paymentBy: 'Agent',
    roomType: 'Suite',
    roomNo: '301',
    numberOfDays: 3,
    bookingType: 'Pay at Hotel',
    bookingStatus: 'Confirmed',
    bookingAmount: 18000
  },
  {
    id: 4,
    dateIn: '2024-02-01',
    dateOut: '2024-02-04',
    guestName: 'Emma Davis',
    reservationNumber: 'RES004',
    bookingMode: 'OTA',
    companyAgentName: 'MakeMyTrip',
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
    paymentBy: 'Online',
    roomType: 'Premium Room',
    roomNo: '401',
    numberOfDays: 3,
    bookingType: 'Paid Online',
    bookingStatus: 'Checked-out',
    bookingAmount: 25000
  },
  {
    id: 5,
    dateIn: '2024-02-05',
    dateOut: '2024-02-08',
    guestName: 'David Brown',
    reservationNumber: 'RES005',
    bookingMode: 'OTA',
    companyAgentName: 'Goibibo',
    pendingAmount: 15000,
    paymentMode: 'Cheque',
    advanceAmount: 20000,
    advanceDate: '2024-01-30',
    balanceAmount: 15000,
    balanceDate: null,
    transactionNumber: 'CHQ567890',
    atmServiceCharges: 0,
    finalStatus: 'Pending',
    commissionAmount: 5250,
    hotelAmount: 29750,
    paymentBy: 'Company',
    roomType: 'Executive Suite',
    roomNo: '501',
    numberOfDays: 3,
    bookingType: 'Pay at Hotel',
    bookingStatus: 'Cancelled',
    bookingAmount: 35000
  },
  {
    id: 6,
    dateIn: '2024-02-10',
    dateOut: '2024-02-13',
    guestName: 'Lisa Anderson',
    reservationNumber: 'RES006',
    bookingMode: 'OTA',
    companyAgentName: 'Cleartrip',
    pendingAmount: 2000,
    paymentMode: 'Credit Card',
    advanceAmount: 14000,
    advanceDate: '2024-02-05',
    balanceAmount: 2000,
    balanceDate: null,
    transactionNumber: 'CC112233',
    atmServiceCharges: 50,
    finalStatus: 'Partial',
    commissionAmount: 2400,
    hotelAmount: 13600,
    paymentBy: 'Guest',
    roomType: 'Deluxe Room',
    roomNo: '102',
    numberOfDays: 3,
    bookingType: 'Pay at Hotel',
    bookingStatus: 'Confirmed',
    bookingAmount: 16000
  }
];

const PaymentView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bookingModeFilter, setBookingModeFilter] = useState('OTA');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // Filter data - Show only OTA bookings
  const filteredData = mockBookingData.filter(booking => {
    const matchesSearch = searchTerm === '' || 
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.reservationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Only show OTA bookings
    const isOTA = booking.bookingMode === 'OTA';
    
    // Date range filtering logic can be added here
    
    return matchesSearch && isOTA;
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

  const getBookingStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return <Badge variant="outline" className="text-blue-600 border-blue-600">Confirmed</Badge>;
      case 'Checked-in':
        return <Badge variant="outline" className="text-green-600 border-green-600">Checked-in</Badge>;
      case 'Checked-out':
        return <Badge variant="outline" className="text-gray-600 border-gray-600">Checked-out</Badge>;
      case 'Cancelled':
        return <Badge variant="outline" className="text-red-600 border-red-600">Cancelled</Badge>;
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
          <h1 className="text-3xl font-bold text-foreground">OTA Booking Details</h1>
          <p className="text-muted-foreground">Manage OTA bookings and payment settlements</p>
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
                <SelectValue placeholder="OTA Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="OTA">All OTA Platforms</SelectItem>
                <SelectItem value="Booking.com">Booking.com</SelectItem>
                <SelectItem value="Agoda">Agoda</SelectItem>
                <SelectItem value="Expedia">Expedia</SelectItem>
                <SelectItem value="MakeMyTrip">MakeMyTrip</SelectItem>
                <SelectItem value="Goibibo">Goibibo</SelectItem>
                <SelectItem value="Cleartrip">Cleartrip</SelectItem>
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
                  <TableHead>Guest Name</TableHead>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Room Type</TableHead>
                  <TableHead>Room No.</TableHead>
                  <TableHead>No. of Days</TableHead>
                  <TableHead>Booking Type</TableHead>
                  <TableHead>Booking Status</TableHead>
                  <TableHead>Booking Amount</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((booking, index) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.guestName}</TableCell>
                    <TableCell className="text-sm font-mono">{booking.reservationNumber}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{booking.roomType}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{booking.roomNo}</TableCell>
                    <TableCell className="text-center">{booking.numberOfDays}</TableCell>
                    <TableCell>
                      <Badge variant={booking.bookingType === 'Paid Online' ? 'default' : 'secondary'}>
                        {booking.bookingType}
                      </Badge>
                    </TableCell>
                    <TableCell>{getBookingStatusBadge(booking.bookingStatus)}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(booking.bookingAmount)}</TableCell>
                    <TableCell>{getStatusBadge(booking.finalStatus)}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </TableCell>
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