import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

// Mock data for Access Rooms view
const mockAccessRoomsData = [
  {
    siNo: 1,
    customerName: 'Alice Brown',
    bookedBy: 'Access Rooms',
    bookingMode: 'Access Rooms',
    checkInDate: '2024-01-15',
    checkOutDate: '2024-01-17',
    roomType: 'Gold',
    noOfRooms: 2,
    noOfDays: 2,
    hotelTotalAmount: 20000,
    accessRoomCommission: 2000,
    accessRoomPayHotelAmount: 18000,
    advancePayment: 5000,
    accessPayHotelAdvanceAmount: 4500,
    balancePaymentMode: 'Guest',
    balancePaymentAmount: 15000,
    balancePaymentStatus: 'Paid'
  },
  {
    siNo: 2,
    customerName: 'David Lee',
    bookedBy: 'Access Rooms',
    bookingMode: 'Access Rooms',
    checkInDate: '2024-01-18',
    checkOutDate: '2024-01-21',
    roomType: 'Silver',
    noOfRooms: 1,
    noOfDays: 3,
    hotelTotalAmount: 15000,
    accessRoomCommission: 1500,
    accessRoomPayHotelAmount: 13500,
    advancePayment: 3000,
    accessPayHotelAdvanceAmount: 2700,
    balancePaymentMode: 'Agent',
    balancePaymentAmount: 12000,
    balancePaymentStatus: 'Pending'
  },
];

const AccessRoomsView: React.FC = () => {
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SI No</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Booked By</TableHead>
            <TableHead>Booking Mode</TableHead>
            <TableHead>Check-in Date</TableHead>
            <TableHead>Check-out Date</TableHead>
            <TableHead>Room Type</TableHead>
            <TableHead>No. of Rooms</TableHead>
            <TableHead>No. of Days</TableHead>
            <TableHead>Hotel Total Amount</TableHead>
            <TableHead>Access Room Commission</TableHead>
            <TableHead>Access Room Pay @Hotel Amount</TableHead>
            <TableHead>Advance Payment</TableHead>
            <TableHead>Access Pay Hotel Advance Amount</TableHead>
            <TableHead>Balance Payment Mode</TableHead>
            <TableHead>Balance Payment Amount</TableHead>
            <TableHead>Balance Payment Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockAccessRoomsData.map((booking) => (
            <TableRow key={booking.siNo}>
              <TableCell>{booking.siNo}</TableCell>
              <TableCell className="font-medium">{booking.customerName}</TableCell>
              <TableCell>{booking.bookedBy}</TableCell>
              <TableCell>{booking.bookingMode}</TableCell>
              <TableCell>{booking.checkInDate}</TableCell>
              <TableCell>{booking.checkOutDate}</TableCell>
              <TableCell>{booking.roomType}</TableCell>
              <TableCell>{booking.noOfRooms}</TableCell>
              <TableCell>{booking.noOfDays}</TableCell>
              <TableCell>₹{booking.hotelTotalAmount.toLocaleString()}</TableCell>
              <TableCell>₹{booking.accessRoomCommission.toLocaleString()}</TableCell>
              <TableCell>₹{booking.accessRoomPayHotelAmount.toLocaleString()}</TableCell>
              <TableCell>₹{booking.advancePayment.toLocaleString()}</TableCell>
              <TableCell>₹{booking.accessPayHotelAdvanceAmount.toLocaleString()}</TableCell>
              <TableCell>{booking.balancePaymentMode}</TableCell>
              <TableCell>₹{booking.balancePaymentAmount.toLocaleString()}</TableCell>
              <TableCell>
                <Badge className={getPaymentStatusColor(booking.balancePaymentStatus)}>
                  {booking.balancePaymentStatus}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AccessRoomsView;