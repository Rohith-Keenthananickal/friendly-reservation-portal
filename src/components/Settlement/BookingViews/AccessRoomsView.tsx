import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

// Mock data for Access Rooms bookings
const accessRoomsData = [
  {
    id: 1,
    slNo: 1,
    customerName: 'John Smith',
    bookedBy: 'Access Rooms Portal',
    bookingMode: 'Access Rooms',
    checkInDate: '2024-01-15',
    checkOutDate: '2024-01-18',
    roomType: 'Gold',
    noOfRooms: 2,
    noOfDays: 3,
    hotelTotalAmount: 18000,
    accessRoomCommission: 1800,
    accessRoomPayHotelAmount: 16200,
    advancePayment: 15000,
    accessPayHotelAdvanceAmount: 13500,
    balancePaymentMode: 'Guest',
    balancePaymentAmount: 3000,
    balanceStatus: 'Pending'
  },
  {
    id: 2,
    slNo: 2,
    customerName: 'Sarah Johnson',
    bookedBy: 'Access Rooms Portal',
    bookingMode: 'Access Rooms',
    checkInDate: '2024-01-20',
    checkOutDate: '2024-01-23',
    roomType: 'Silver',
    noOfRooms: 1,
    noOfDays: 3,
    hotelTotalAmount: 12000,
    accessRoomCommission: 1200,
    accessRoomPayHotelAmount: 10800,
    advancePayment: 12000,
    accessPayHotelAdvanceAmount: 10800,
    balancePaymentMode: 'Guest',
    balancePaymentAmount: 0,
    balanceStatus: 'Paid'
  }
];

const AccessRoomsView = () => {
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

  const getBalanceStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return <Badge className="status-paid border">Paid</Badge>;
      case 'Pending':
        return <Badge className="status-pending border">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Card className="card-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Access Rooms Bookings
          <Badge variant="outline" className="text-blue-600 border-blue-200">
            {accessRoomsData.length} bookings
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>SI No</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Booked By</TableHead>
                <TableHead>Booking Mode</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Room Type</TableHead>
                <TableHead>Rooms</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Hotel Total</TableHead>
                <TableHead>AR Commission</TableHead>
                <TableHead>AR Pay Hotel</TableHead>
                <TableHead>Advance Payment</TableHead>
                <TableHead>AR Advance</TableHead>
                <TableHead>Balance Mode</TableHead>
                <TableHead>Balance Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accessRoomsData.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{booking.slNo}</TableCell>
                  <TableCell>
                    <div className="font-medium">{booking.customerName}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-blue-600 border-blue-200">
                      {booking.bookedBy}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{booking.bookingMode}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{formatDate(booking.checkInDate)}</TableCell>
                  <TableCell className="text-sm">{formatDate(booking.checkOutDate)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      {booking.roomType}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{booking.noOfRooms}</TableCell>
                  <TableCell className="text-center">{booking.noOfDays}</TableCell>
                  <TableCell className="font-medium">{formatCurrency(booking.hotelTotalAmount)}</TableCell>
                  <TableCell className="text-blue-600 font-medium">{formatCurrency(booking.accessRoomCommission)}</TableCell>
                  <TableCell className="font-medium">{formatCurrency(booking.accessRoomPayHotelAmount)}</TableCell>
                  <TableCell className="font-medium">{formatCurrency(booking.advancePayment)}</TableCell>
                  <TableCell className="text-blue-600 font-medium">{formatCurrency(booking.accessPayHotelAdvanceAmount)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{booking.balancePaymentMode}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {booking.balancePaymentAmount > 0 ? formatCurrency(booking.balancePaymentAmount) : '-'}
                  </TableCell>
                  <TableCell>{getBalanceStatusBadge(booking.balanceStatus)}</TableCell>
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
              <span className="text-muted-foreground">Total Hotel Amount:</span>
              <div className="font-bold text-lg">{formatCurrency(accessRoomsData.reduce((sum, b) => sum + b.hotelTotalAmount, 0))}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Total AR Commission:</span>
              <div className="font-bold text-lg text-blue-600">{formatCurrency(accessRoomsData.reduce((sum, b) => sum + b.accessRoomCommission, 0))}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Total Advance:</span>
              <div className="font-bold text-lg">{formatCurrency(accessRoomsData.reduce((sum, b) => sum + b.advancePayment, 0))}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Pending Balance:</span>
              <div className="font-bold text-lg text-orange-600">{formatCurrency(accessRoomsData.reduce((sum, b) => sum + b.balancePaymentAmount, 0))}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccessRoomsView;