import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Plus, User, CalendarDays, CreditCard, FileText } from 'lucide-react';
import AddReceiptModal from '@/components/Receipt/AddReceiptModal';

type SettlementStatus = 'PENDING' | 'SETTLED' | 'PARTIALLY_SETTLED';
type PaymentType = 'ADVANCE' | 'BALANCE' | 'FULL';
type PaymentMode = 'CASH' | 'CARD' | 'ONLINE' | 'UPI' | 'BANK_TRANSFER';

interface PaymentRecord {
  id: string;
  paymentType: PaymentType;
  amount: number;
  paymentMode: PaymentMode;
  paidBy: string;
  transactionNumber: string;
  invoiceNumber: string;
  paymentDate: string;
  remarks: string;
}

interface ReservationDetail {
  id: string;
  reservationNumber: string;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  checkInDate: string;
  checkOutDate: string;
  roomType: string;
  numberOfRooms: number;
  numberOfGuests: number;
  totalAmount: number;
  advanceAmount: number;
  balanceAmount: number;
  pendingAmount: number;
  settlementStatus: SettlementStatus;
  payments: PaymentRecord[];
}

// Mock data for reservation detail
const mockReservationDetails: Record<string, ReservationDetail> = {
  '1': {
    id: '1',
    reservationNumber: 'RES-2025-001',
    guestName: 'John Doe',
    guestPhone: '+91 9876543210',
    guestEmail: 'john.doe@email.com',
    checkInDate: '2025-12-01',
    checkOutDate: '2025-12-05',
    roomType: 'Deluxe',
    numberOfRooms: 2,
    numberOfGuests: 4,
    totalAmount: 15000,
    advanceAmount: 5000,
    balanceAmount: 10000,
    pendingAmount: 10000,
    settlementStatus: 'PENDING',
    payments: [
      {
        id: 'p1',
        paymentType: 'ADVANCE',
        amount: 5000,
        paymentMode: 'UPI',
        paidBy: 'John Doe',
        transactionNumber: 'TXN123456789',
        invoiceNumber: 'INV-2025-001',
        paymentDate: '2025-11-28',
        remarks: 'Advance payment for booking confirmation'
      }
    ]
  },
  '2': {
    id: '2',
    reservationNumber: 'RES-2025-002',
    guestName: 'Jane Smith',
    guestPhone: '+91 9876543211',
    guestEmail: 'jane.smith@email.com',
    checkInDate: '2025-12-02',
    checkOutDate: '2025-12-06',
    roomType: 'Suite',
    numberOfRooms: 1,
    numberOfGuests: 2,
    totalAmount: 25000,
    advanceAmount: 25000,
    balanceAmount: 0,
    pendingAmount: 0,
    settlementStatus: 'SETTLED',
    payments: [
      {
        id: 'p2',
        paymentType: 'FULL',
        amount: 25000,
        paymentMode: 'CARD',
        paidBy: 'Jane Smith',
        transactionNumber: 'TXN987654321',
        invoiceNumber: 'INV-2025-002',
        paymentDate: '2025-12-02',
        remarks: 'Full payment at check-in'
      }
    ]
  },
  '3': {
    id: '3',
    reservationNumber: 'RES-2025-003',
    guestName: 'Robert Wilson',
    guestPhone: '+91 9876543212',
    guestEmail: 'robert.wilson@email.com',
    checkInDate: '2025-12-03',
    checkOutDate: '2025-12-07',
    roomType: 'Standard',
    numberOfRooms: 1,
    numberOfGuests: 2,
    totalAmount: 18000,
    advanceAmount: 10000,
    balanceAmount: 8000,
    pendingAmount: 8000,
    settlementStatus: 'PARTIALLY_SETTLED',
    payments: [
      {
        id: 'p3',
        paymentType: 'ADVANCE',
        amount: 10000,
        paymentMode: 'ONLINE',
        paidBy: 'Robert Wilson',
        transactionNumber: 'TXN456789123',
        invoiceNumber: 'INV-2025-003',
        paymentDate: '2025-12-01',
        remarks: 'Advance payment via net banking'
      }
    ]
  },
  '4': {
    id: '4',
    reservationNumber: 'RES-2025-004',
    guestName: 'Emily Brown',
    guestPhone: '+91 9876543213',
    guestEmail: 'emily.brown@email.com',
    checkInDate: '2025-12-04',
    checkOutDate: '2025-12-08',
    roomType: 'Deluxe',
    numberOfRooms: 3,
    numberOfGuests: 6,
    totalAmount: 32000,
    advanceAmount: 0,
    balanceAmount: 32000,
    pendingAmount: 32000,
    settlementStatus: 'PENDING',
    payments: []
  },
  '5': {
    id: '5',
    reservationNumber: 'RES-2025-005',
    guestName: 'Michael Johnson',
    guestPhone: '+91 9876543214',
    guestEmail: 'michael.johnson@email.com',
    checkInDate: '2025-12-05',
    checkOutDate: '2025-12-09',
    roomType: 'Suite',
    numberOfRooms: 2,
    numberOfGuests: 4,
    totalAmount: 20000,
    advanceAmount: 12000,
    balanceAmount: 8000,
    pendingAmount: 8000,
    settlementStatus: 'PARTIALLY_SETTLED',
    payments: [
      {
        id: 'p5',
        paymentType: 'ADVANCE',
        amount: 12000,
        paymentMode: 'CASH',
        paidBy: 'Michael Johnson',
        transactionNumber: 'CASH-001',
        invoiceNumber: 'INV-2025-005',
        paymentDate: '2025-12-03',
        remarks: 'Cash advance at reception'
      }
    ]
  },
  '6': {
    id: '6',
    reservationNumber: 'RES-2025-006',
    guestName: 'Sarah Davis',
    guestPhone: '+91 9876543215',
    guestEmail: 'sarah.davis@email.com',
    checkInDate: '2025-12-06',
    checkOutDate: '2025-12-10',
    roomType: 'Premium',
    numberOfRooms: 1,
    numberOfGuests: 2,
    totalAmount: 28000,
    advanceAmount: 28000,
    balanceAmount: 0,
    pendingAmount: 0,
    settlementStatus: 'SETTLED',
    payments: [
      {
        id: 'p6a',
        paymentType: 'ADVANCE',
        amount: 14000,
        paymentMode: 'UPI',
        paidBy: 'Sarah Davis',
        transactionNumber: 'UPI789456123',
        invoiceNumber: 'INV-2025-006A',
        paymentDate: '2025-12-04',
        remarks: '50% advance via UPI'
      },
      {
        id: 'p6b',
        paymentType: 'BALANCE',
        amount: 14000,
        paymentMode: 'CARD',
        paidBy: 'Sarah Davis',
        transactionNumber: 'CARD321654987',
        invoiceNumber: 'INV-2025-006B',
        paymentDate: '2025-12-06',
        remarks: 'Balance payment at check-in'
      }
    ]
  },
  '7': {
    id: '7',
    reservationNumber: 'RES-2025-007',
    guestName: 'David Lee',
    guestPhone: '+91 9876543216',
    guestEmail: 'david.lee@email.com',
    checkInDate: '2025-12-07',
    checkOutDate: '2025-12-11',
    roomType: 'Standard',
    numberOfRooms: 2,
    numberOfGuests: 3,
    totalAmount: 22000,
    advanceAmount: 5000,
    balanceAmount: 17000,
    pendingAmount: 17000,
    settlementStatus: 'PENDING',
    payments: [
      {
        id: 'p7',
        paymentType: 'ADVANCE',
        amount: 5000,
        paymentMode: 'BANK_TRANSFER',
        paidBy: 'David Lee',
        transactionNumber: 'NEFT147258369',
        invoiceNumber: 'INV-2025-007',
        paymentDate: '2025-12-05',
        remarks: 'NEFT transfer for advance'
      }
    ]
  },
  '8': {
    id: '8',
    reservationNumber: 'RES-2025-008',
    guestName: 'Amanda White',
    guestPhone: '+91 9876543217',
    guestEmail: 'amanda.white@email.com',
    checkInDate: '2025-12-08',
    checkOutDate: '2025-12-12',
    roomType: 'Deluxe',
    numberOfRooms: 2,
    numberOfGuests: 4,
    totalAmount: 35000,
    advanceAmount: 20000,
    balanceAmount: 15000,
    pendingAmount: 15000,
    settlementStatus: 'PARTIALLY_SETTLED',
    payments: [
      {
        id: 'p8',
        paymentType: 'ADVANCE',
        amount: 20000,
        paymentMode: 'ONLINE',
        paidBy: 'Amanda White',
        transactionNumber: 'ONLINE963852741',
        invoiceNumber: 'INV-2025-008',
        paymentDate: '2025-12-06',
        remarks: 'Online payment via website'
      }
    ]
  }
};

const statusConfig: Record<SettlementStatus, { label: string; className: string }> = {
  PENDING: { label: 'Pending', className: 'bg-red-100 text-red-700' },
  SETTLED: { label: 'Settled', className: 'bg-green-100 text-green-700' },
  PARTIALLY_SETTLED: { label: 'Partially Settled', className: 'bg-orange-100 text-orange-700' }
};

const paymentTypeConfig: Record<PaymentType, { label: string; className: string }> = {
  ADVANCE: { label: 'Advance', className: 'bg-blue-100 text-blue-700' },
  BALANCE: { label: 'Balance', className: 'bg-purple-100 text-purple-700' },
  FULL: { label: 'Full Payment', className: 'bg-green-100 text-green-700' }
};

const paymentModeConfig: Record<PaymentMode, string> = {
  CASH: 'Cash',
  CARD: 'Card',
  ONLINE: 'Online',
  UPI: 'UPI',
  BANK_TRANSFER: 'Bank Transfer'
};

const ReceiptDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const reservation = id ? mockReservationDetails[id] : null;

  if (!reservation) {
    return (
      <Layout>
        <div className="p-6 text-center">
          <p className="text-muted-foreground">Reservation not found</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate('/receipt')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Receipts
          </Button>
        </div>
      </Layout>
    );
  }

  const handleAddReceipt = (data: any) => {
    console.log('New receipt data:', data);
    // In real app, this would call an API
    setIsAddModalOpen(false);
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => navigate('/receipt')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{reservation.reservationNumber}</h1>
              <p className="text-muted-foreground">Receipt Details</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className={statusConfig[reservation.settlementStatus].className}>
              {statusConfig[reservation.settlementStatus].label}
            </Badge>
            {reservation.pendingAmount > 0 && (
              <Button onClick={() => setIsAddModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Receipt
              </Button>
            )}
          </div>
        </div>

        {/* Guest & Booking Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4" />
                Guest Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Name</p>
                  <p className="font-medium">{reservation.guestName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Phone</p>
                  <p className="font-medium">{reservation.guestPhone}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium">{reservation.guestEmail}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Check-in</p>
                  <p className="font-medium">{new Date(reservation.checkInDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Check-out</p>
                  <p className="font-medium">{new Date(reservation.checkOutDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Room Type</p>
                  <p className="font-medium">{reservation.roomType}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Rooms / Guests</p>
                  <p className="font-medium">{reservation.numberOfRooms} Rooms, {reservation.numberOfGuests} Guests</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Summary */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payment Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-xl font-bold">₹{reservation.totalAmount.toLocaleString()}</p>
              </div>
              <div className="p-4 rounded-lg bg-green-50">
                <p className="text-sm text-green-600">Advance Paid</p>
                <p className="text-xl font-bold text-green-700">₹{reservation.advanceAmount.toLocaleString()}</p>
              </div>
              <div className="p-4 rounded-lg bg-blue-50">
                <p className="text-sm text-blue-600">Balance Amount</p>
                <p className="text-xl font-bold text-blue-700">₹{reservation.balanceAmount.toLocaleString()}</p>
              </div>
              <div className="p-4 rounded-lg bg-red-50">
                <p className="text-sm text-red-600">Pending Amount</p>
                <p className="text-xl font-bold text-red-700">₹{reservation.pendingAmount.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Payment History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {reservation.payments.length > 0 ? (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Mode</TableHead>
                      <TableHead>Paid By</TableHead>
                      <TableHead>Transaction #</TableHead>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Remarks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reservation.payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>
                          {new Date(payment.paymentDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </TableCell>
                        <TableCell>
                          <Badge className={paymentTypeConfig[payment.paymentType].className}>
                            {paymentTypeConfig[payment.paymentType].label}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">₹{payment.amount.toLocaleString()}</TableCell>
                        <TableCell>{paymentModeConfig[payment.paymentMode]}</TableCell>
                        <TableCell>{payment.paidBy}</TableCell>
                        <TableCell className="font-mono text-xs">{payment.transactionNumber}</TableCell>
                        <TableCell className="font-mono text-xs">{payment.invoiceNumber}</TableCell>
                        <TableCell className="max-w-[200px] truncate" title={payment.remarks}>
                          {payment.remarks}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No payments recorded yet
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add Receipt Modal */}
        <AddReceiptModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddReceipt}
          reservationNumber={reservation.reservationNumber}
          pendingAmount={reservation.pendingAmount}
        />
      </div>
    </Layout>
  );
};

export default ReceiptDetailPage;
