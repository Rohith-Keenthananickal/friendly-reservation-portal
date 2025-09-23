import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, CreditCard } from 'lucide-react';

// Mock data for all booking modes
const defaultBookingData = [
  {
    id: 1,
    slNo: 1,
    dateIn: '2024-01-15',
    dateOut: '2024-01-18',
    guestName: 'John Smith',
    reservationNumber: 'RES001',
    bookingMode: 'Agent',
    companyName: 'Travel Pro Agency',
    bookingStatus: 'Confirmed',
    bookingAmount: 20000,
    paymentStatus: 'Pending'
  },
  {
    id: 2,
    slNo: 2,
    dateIn: '2024-01-20',
    dateOut: '2024-01-23',
    guestName: 'Sarah Johnson',
    reservationNumber: 'RES002',
    bookingMode: 'Direct',
    companyName: '-',
    bookingStatus: 'Confirmed',
    bookingAmount: 12000,
    paymentStatus: 'Paid'
  },
  {
    id: 3,
    slNo: 3,
    dateIn: '2024-01-25',
    dateOut: '2024-01-28',
    guestName: 'Mike Wilson',
    reservationNumber: 'RES003',
    bookingMode: 'Access Rooms',
    companyName: 'Access Rooms Portal',
    bookingStatus: 'Confirmed',
    bookingAmount: 18000,
    paymentStatus: 'Partial'
  },
  {
    id: 4,
    slNo: 4,
    dateIn: '2024-02-01',
    dateOut: '2024-02-04',
    guestName: 'Emma Davis',
    reservationNumber: 'RES004',
    bookingMode: 'OTA',
    companyName: 'Booking.com',
    bookingStatus: 'Confirmed',
    bookingAmount: 25000,
    paymentStatus: 'Paid'
  },
  {
    id: 5,
    slNo: 5,
    dateIn: '2024-02-05',
    dateOut: '2024-02-08',
    guestName: 'David Brown',
    reservationNumber: 'RES005',
    bookingMode: 'Company',
    companyName: 'Tech Corp Ltd',
    bookingStatus: 'Pending',
    bookingAmount: 35000,
    paymentStatus: 'Pending'
  }
];

const DefaultView = () => {
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return <Badge className="status-paid border">Paid</Badge>;
      case 'Pending':
        return <Badge className="status-pending border">Pending</Badge>;
      case 'Partial':
        return <Badge className="status-partial border">Partial</Badge>;
      case 'Confirmed':
        return <Badge className="status-paid border">Confirmed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getBookingModeBadge = (mode: string) => {
    const colors = {
      'Agent': 'bg-blue-50 text-blue-700 border-blue-200',
      'Direct': 'bg-green-50 text-green-700 border-green-200',
      'Access Rooms': 'bg-purple-50 text-purple-700 border-purple-200',
      'OTA': 'bg-orange-50 text-orange-700 border-orange-200',
      'Company': 'bg-gray-50 text-gray-700 border-gray-200'
    };
    
    return (
      <Badge variant="outline" className={colors[mode as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200'}>
        {mode}
      </Badge>
    );
  };

  return (
    <Card className="card-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          All Booking Details
          <Badge variant="outline" className="text-primary border-primary/20">
            {defaultBookingData.length} bookings
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>SL No</TableHead>
                <TableHead>Date In</TableHead>
                <TableHead>Date Out</TableHead>
                <TableHead>Guest Name</TableHead>
                <TableHead>Reservation No</TableHead>
                <TableHead>Booking Mode</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead>Booking Status</TableHead>
                <TableHead>Booking Amount</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {defaultBookingData.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{booking.slNo}</TableCell>
                  <TableCell className="text-sm">{formatDate(booking.dateIn)}</TableCell>
                  <TableCell className="text-sm">{formatDate(booking.dateOut)}</TableCell>
                  <TableCell>
                    <div className="font-medium">{booking.guestName}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-mono text-sm bg-muted px-2 py-1 rounded">
                      {booking.reservationNumber}
                    </div>
                  </TableCell>
                  <TableCell>{getBookingModeBadge(booking.bookingMode)}</TableCell>
                  <TableCell className="text-sm">{booking.companyName}</TableCell>
                  <TableCell>{getStatusBadge(booking.bookingStatus)}</TableCell>
                  <TableCell className="font-medium">{formatCurrency(booking.bookingAmount)}</TableCell>
                  <TableCell>{getStatusBadge(booking.paymentStatus)}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Total Summary */}
        <div className="mt-6 p-4 border-t bg-muted/30 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Total Booking Amount:</span>
              <div className="font-bold text-lg">{formatCurrency(defaultBookingData.reduce((sum, b) => sum + b.bookingAmount, 0))}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Confirmed Bookings:</span>
              <div className="font-bold text-lg text-green-600">{defaultBookingData.filter(b => b.bookingStatus === 'Confirmed').length}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Paid Bookings:</span>
              <div className="font-bold text-lg text-green-600">{defaultBookingData.filter(b => b.paymentStatus === 'Paid').length}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Pending Payments:</span>
              <div className="font-bold text-lg text-red-600">{defaultBookingData.filter(b => b.paymentStatus === 'Pending').length}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DefaultView;