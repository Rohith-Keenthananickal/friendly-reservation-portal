import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

// Mock data for default view
const mockBookingData = [
  {
    slNo: 1,
    dateIn: '2024-01-15',
    dateOut: '2024-01-17',
    guestName: 'John Smith',
    reservationNumber: 'RES001',
    bookingMode: 'Direct',
    companyName: null,
    bookingStatus: 'Confirmed',
    bookingAmount: 15000,
    paymentStatus: 'Paid'
  },
  {
    slNo: 2,
    dateIn: '2024-01-18',
    dateOut: '2024-01-20',
    guestName: 'Sarah Johnson',
    reservationNumber: 'RES002',
    bookingMode: 'Agent',
    companyName: 'Travel Plus',
    bookingStatus: 'Confirmed',
    bookingAmount: 25000,
    paymentStatus: 'Pending'
  },
  {
    slNo: 3,
    dateIn: '2024-01-20',
    dateOut: '2024-01-22',
    guestName: 'Mike Wilson',
    reservationNumber: 'RES003',
    bookingMode: 'Company',
    companyName: 'TechCorp Ltd',
    bookingStatus: 'Pending',
    bookingAmount: 18000,
    paymentStatus: 'Partial'
  },
];

const DefaultView: React.FC = () => {
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Partial':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

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
            <TableHead>SL No</TableHead>
            <TableHead>Date In</TableHead>
            <TableHead>Date Out</TableHead>
            <TableHead>Guest Name</TableHead>
            <TableHead>Reservation Number</TableHead>
            <TableHead>Booking Mode</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Booking Status</TableHead>
            <TableHead>Booking Amount</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockBookingData.map((booking) => (
            <TableRow key={booking.slNo}>
              <TableCell>{booking.slNo}</TableCell>
              <TableCell>{booking.dateIn}</TableCell>
              <TableCell>{booking.dateOut}</TableCell>
              <TableCell className="font-medium">{booking.guestName}</TableCell>
              <TableCell>{booking.reservationNumber}</TableCell>
              <TableCell>{booking.bookingMode}</TableCell>
              <TableCell>{booking.companyName || '-'}</TableCell>
              <TableCell>
                <Badge className={getBookingStatusColor(booking.bookingStatus)}>
                  {booking.bookingStatus}
                </Badge>
              </TableCell>
              <TableCell>₹{booking.bookingAmount.toLocaleString()}</TableCell>
              <TableCell>
                <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                  {booking.paymentStatus}
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

export default DefaultView;