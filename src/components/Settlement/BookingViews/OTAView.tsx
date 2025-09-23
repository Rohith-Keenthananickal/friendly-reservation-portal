import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

// Mock data for OTA bookings
const otaData = [
  {
    id: 1,
    slNo: 1,
    checkInDate: '2024-01-15',
    guestName: 'John Smith',
    bookingId: 'BKG001234',
    bookingType: 'Paid Online',
    bookingStatus: 'Confirmed',
    bookingAmount: 15000,
    paymentStatus: '₹15000 settled on 15th Jan 2024',
    paymentStatusType: 'Paid'
  },
  {
    id: 2,
    slNo: 2,
    checkInDate: '2024-01-20',
    guestName: 'Emma Davis',
    bookingId: 'BKG001235',
    bookingType: 'Pay at Hotel',
    bookingStatus: 'Confirmed',
    bookingAmount: 12000,
    paymentStatus: '₹5000 pending',
    paymentStatusType: 'Partial'
  },
  {
    id: 3,
    slNo: 3,
    checkInDate: '2024-01-25',
    guestName: 'Mike Wilson',
    bookingId: 'BKG001236',
    bookingType: 'Paid Online',
    bookingStatus: 'Pending',
    bookingAmount: 18000,
    paymentStatus: '₹18000 pending settlement',
    paymentStatusType: 'Pending'
  }
];

const OTAView = () => {
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

  const getBookingStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return <Badge className="status-paid border">Confirmed</Badge>;
      case 'Pending':
        return <Badge className="status-pending border">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (statusType: string) => {
    switch (statusType) {
      case 'Paid':
        return <Badge className="status-paid border">Paid</Badge>;
      case 'Pending':
        return <Badge className="status-pending border">Pending</Badge>;
      case 'Partial':
        return <Badge className="status-partial border">Partial</Badge>;
      default:
        return <Badge variant="secondary">{statusType}</Badge>;
    }
  };

  return (
    <Card className="card-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          OTA Bookings
          <Badge variant="outline" className="text-orange-600 border-orange-200">
            {otaData.length} bookings
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>SI No</TableHead>
                <TableHead>Check-in Date</TableHead>
                <TableHead>Guest Name</TableHead>
                <TableHead>Booking ID</TableHead>
                <TableHead>Booking Type</TableHead>
                <TableHead>Booking Status</TableHead>
                <TableHead>Booking Amount</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {otaData.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{booking.slNo}</TableCell>
                  <TableCell className="text-sm">{formatDate(booking.checkInDate)}</TableCell>
                  <TableCell>
                    <div className="font-medium">{booking.guestName}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-mono text-sm bg-muted px-2 py-1 rounded">
                      {booking.bookingId}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={booking.bookingType === 'Paid Online' 
                        ? 'bg-green-50 text-green-700 border-green-200' 
                        : 'bg-orange-50 text-orange-700 border-orange-200'
                      }
                    >
                      {booking.bookingType}
                    </Badge>
                  </TableCell>
                  <TableCell>{getBookingStatusBadge(booking.bookingStatus)}</TableCell>
                  <TableCell className="font-medium">{formatCurrency(booking.bookingAmount)}</TableCell>
                  <TableCell>
                    <div className="text-sm">{booking.paymentStatus}</div>
                  </TableCell>
                  <TableCell>{getPaymentStatusBadge(booking.paymentStatusType)}</TableCell>
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Total Booking Amount:</span>
              <div className="font-bold text-lg">{formatCurrency(otaData.reduce((sum, b) => sum + b.bookingAmount, 0))}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Confirmed Bookings:</span>
              <div className="font-bold text-lg text-green-600">{otaData.filter(b => b.bookingStatus === 'Confirmed').length}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Pending Settlements:</span>
              <div className="font-bold text-lg text-orange-600">{otaData.filter(b => b.paymentStatusType !== 'Paid').length}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OTAView;