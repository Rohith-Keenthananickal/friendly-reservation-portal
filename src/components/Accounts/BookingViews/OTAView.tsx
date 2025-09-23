import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

// Mock data for OTA view
const mockOTAData = [
  {
    siNo: 1,
    checkInDate: '2024-01-15',
    guestName: 'Emma Wilson',
    bookingId: 'OTA001',
    bookingType: 'Paid Online',
    bookingStatus: 'Confirmed',
    bookingAmount: 12000,
    paymentStatus: '₹12000 settled on 15th Jan 2024'
  },
  {
    siNo: 2,
    checkInDate: '2024-01-18',
    guestName: 'Robert Taylor',
    bookingId: 'OTA002',
    bookingType: 'Pay at Hotel',
    bookingStatus: 'Confirmed',
    bookingAmount: 18000,
    paymentStatus: '₹8000 advance, ₹10000 pending'
  },
  {
    siNo: 3,
    checkInDate: '2024-01-20',
    guestName: 'Lisa Garcia',
    bookingId: 'OTA003',
    bookingType: 'Paid Online',
    bookingStatus: 'Pending',
    bookingAmount: 15000,
    paymentStatus: 'Pending confirmation'
  },
];

const OTAView: React.FC = () => {
  const getBookingStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SI No</TableHead>
            <TableHead>Check-in Date</TableHead>
            <TableHead>Guest Name</TableHead>
            <TableHead>Booking ID</TableHead>
            <TableHead>Booking Type</TableHead>
            <TableHead>Booking Status</TableHead>
            <TableHead>Booking Amount</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Details View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockOTAData.map((booking) => (
            <TableRow key={booking.siNo}>
              <TableCell>{booking.siNo}</TableCell>
              <TableCell>{booking.checkInDate}</TableCell>
              <TableCell className="font-medium">{booking.guestName}</TableCell>
              <TableCell>{booking.bookingId}</TableCell>
              <TableCell>{booking.bookingType}</TableCell>
              <TableCell>
                <Badge className={getBookingStatusColor(booking.bookingStatus)}>
                  {booking.bookingStatus}
                </Badge>
              </TableCell>
              <TableCell>₹{booking.bookingAmount.toLocaleString()}</TableCell>
              <TableCell className="max-w-xs">
                <div className="text-sm">{booking.paymentStatus}</div>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OTAView;