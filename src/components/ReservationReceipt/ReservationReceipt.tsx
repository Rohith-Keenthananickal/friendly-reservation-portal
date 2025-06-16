
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, Hotel, MapPin, Phone, Mail, Calendar, Users, CreditCard, Receipt, User } from 'lucide-react';

// Mock data structure based on the schema
const mockReceiptData = {
  hotel: {
    name: "Access Rooms Kashmir",
    logo: "/placeholder.svg",
    address: "Dal Lake Road, Srinagar, Kashmir",
    phone: "+91-194-2501234",
    email: "info@accessrooms.com"
  },
  receipt: {
    invoiceNumber: "INV-2024-001",
    reservationNumber: "RES-2024-001",
    bookedDate: "2024-01-10",
    reservationStatus: "CONFIRMED",
    bookingStatus: "CONFIRMED",
    paymentStatus: "PAID"
  },
  guestDetails: {
    guestName: "John Smith",
    phone: "+91-9876543210",
    email: "john.smith@email.com",
    address: "123 Main Street",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    pincode: "400001"
  },
  stayDetails: {
    checkInDate: "2024-01-15",
    checkOutDate: "2024-01-18",
    numberOfNights: 3,
    totalRooms: 1,
    totalPersons: 3,
    bookedRooms: [
      {
        roomTypeName: "Deluxe Lake View",
        roomInfo: {
          mealPlan: "Modified American Plan",
          beddingType: "King Bed"
        }
      }
    ]
  },
  payment: {
    billingMode: "INCLUDE_GST",
    totalAmount: 17700,
    advancePayment: 5000,
    advancePayedBy: "John Smith",
    advancePaymentDate: "2024-01-10",
    advancePaymentMode: "UPI",
    advancePaymentTransactionId: "TXN123456",
    balancePayment: 12700,
    balancePaidBy: "John Smith",
    balancePaymentDate: "2024-01-15",
    balancePaymentMode: "Card",
    balancePaymentTransactionId: "TXN789012",
    fullPaymentDoneBy: "John Smith",
    fullPaymentDate: "2024-01-15",
    fullPaymentMode: "Mixed",
    paidAmount: 17700,
    dueAmount: 0
  },
  taxes: {
    isGstIncluded: true,
    gstNumber: "15ABCDE1234F1Z5",
    gstPercentage: 9,
    taxAndGstSplitUp: {
      sgst: 675,
      cgst: 675,
      igst: 0,
      gstAmount: 1350,
      taxAmount: 1350,
      totalAmount: 17700
    }
  },
  other: {
    settleMentStatus: "SETTLED",
    remarks: "Early check-in requested. Lake view room preferred.",
    refereredBy: "Kashmir Travel Agency",
    referedByDesignation: "Travel Agent",
    note: "VIP guest - provide complimentary services"
  }
};

const ReservationReceipt = () => {
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Reservation-Receipt-${mockReceiptData.receipt.invoiceNumber}`,
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'CONFIRMED': 
      case 'PAID':
      case 'SETTLED': return 'bg-green-100 text-green-800 border-green-200';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-hotel-primary">Reservation Receipt</h1>
          <p className="text-muted-foreground mt-1">Hotel booking payment receipt</p>
        </div>
        <Button onClick={handlePrint} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <div 
        ref={componentRef} 
        className="bg-white p-8 rounded-lg shadow-sm border max-w-4xl mx-auto"
        style={{ minHeight: '297mm', width: '210mm' }}
      >
        {/* Header Section */}
        <div className="relative mb-8 pb-6 border-b-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 -mx-8 px-8 -mt-8 pt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <Hotel className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-blue-900">{mockReceiptData.hotel.name}</h1>
                <div className="flex items-center text-sm text-blue-700 mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {mockReceiptData.hotel.address}
                </div>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center text-sm text-blue-700">
                    <Phone className="h-4 w-4 mr-1" />
                    {mockReceiptData.hotel.phone}
                  </div>
                  <div className="flex items-center text-sm text-blue-700">
                    <Mail className="h-4 w-4 mr-1" />
                    {mockReceiptData.hotel.email}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-900 flex items-center">
                <Receipt className="h-6 w-6 mr-2" />
                RESERVATION RECEIPT
              </div>
              <div className="text-lg font-semibold text-blue-700 mt-1">#{mockReceiptData.receipt.invoiceNumber}</div>
              <div className="text-sm text-blue-600">Reservation: {mockReceiptData.receipt.reservationNumber}</div>
            </div>
          </div>
          
          {/* Status Badges */}
          <div className="flex justify-between items-center mt-6">
            <div className="flex space-x-3">
              <Badge className={getStatusColor(mockReceiptData.receipt.reservationStatus)} variant="outline">
                Reservation: {mockReceiptData.receipt.reservationStatus}
              </Badge>
              <Badge className={getStatusColor(mockReceiptData.receipt.bookingStatus)} variant="outline">
                Booking: {mockReceiptData.receipt.bookingStatus}
              </Badge>
              <Badge className={getStatusColor(mockReceiptData.receipt.paymentStatus)} variant="outline">
                Payment: {mockReceiptData.receipt.paymentStatus}
              </Badge>
            </div>
            <div className="text-right text-sm text-blue-700">
              <div>Booking Date: {new Date(mockReceiptData.receipt.bookedDate).toLocaleDateString()}</div>
            </div>
          </div>
        </div>

        {/* Guest & Stay Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-blue-200 bg-blue-50/30">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Guest Information
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-blue-700 font-medium">Name:</span>
                  <div className="font-semibold text-lg">{mockReceiptData.guestDetails.guestName}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-blue-700 text-sm">Phone:</span>
                    <div className="font-medium">{mockReceiptData.guestDetails.phone}</div>
                  </div>
                  <div>
                    <span className="text-blue-700 text-sm">Email:</span>
                    <div className="font-medium text-sm">{mockReceiptData.guestDetails.email}</div>
                  </div>
                </div>
                <div>
                  <span className="text-blue-700 text-sm">Address:</span>
                  <div className="font-medium text-sm mt-1">
                    {mockReceiptData.guestDetails.address}, {mockReceiptData.guestDetails.city}<br />
                    {mockReceiptData.guestDetails.state}, {mockReceiptData.guestDetails.country} - {mockReceiptData.guestDetails.pincode}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50/30">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Stay Details
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-blue-700 text-sm">Check-in:</span>
                    <div className="font-semibold">{new Date(mockReceiptData.stayDetails.checkInDate).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <span className="text-blue-700 text-sm">Check-out:</span>
                    <div className="font-semibold">{new Date(mockReceiptData.stayDetails.checkOutDate).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <span className="text-blue-700 text-sm">Nights:</span>
                    <div className="font-semibold">{mockReceiptData.stayDetails.numberOfNights}</div>
                  </div>
                  <div>
                    <span className="text-blue-700 text-sm">Rooms:</span>
                    <div className="font-semibold">{mockReceiptData.stayDetails.totalRooms}</div>
                  </div>
                  <div>
                    <span className="text-blue-700 text-sm">Guests:</span>
                    <div className="font-semibold">{mockReceiptData.stayDetails.totalPersons}</div>
                  </div>
                </div>
                <div>
                  <span className="text-blue-700 text-sm">Room Type:</span>
                  <div className="font-semibold">{mockReceiptData.stayDetails.bookedRooms[0].roomTypeName}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-blue-700 text-sm">Meal Plan:</span>
                    <div className="font-medium text-sm">{mockReceiptData.stayDetails.bookedRooms[0].roomInfo.mealPlan}</div>
                  </div>
                  <div>
                    <span className="text-blue-700 text-sm">Bedding:</span>
                    <div className="font-medium text-sm">{mockReceiptData.stayDetails.bookedRooms[0].roomInfo.beddingType}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Breakdown */}
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 mb-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-blue-900 mb-6 flex items-center">
              <CreditCard className="h-6 w-6 mr-2 text-blue-600" />
              Payment Breakdown
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Advance Payment */}
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3">Advance Payment</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Amount:</span>
                    <span className="font-semibold">₹{mockReceiptData.payment.advancePayment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Paid By:</span>
                    <span className="font-medium">{mockReceiptData.payment.advancePayedBy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Date:</span>
                    <span className="font-medium">{new Date(mockReceiptData.payment.advancePaymentDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Mode:</span>
                    <span className="font-medium">{mockReceiptData.payment.advancePaymentMode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Transaction ID:</span>
                    <span className="font-medium text-xs">{mockReceiptData.payment.advancePaymentTransactionId}</span>
                  </div>
                </div>
              </div>

              {/* Balance Payment */}
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3">Balance Payment</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Amount:</span>
                    <span className="font-semibold">₹{mockReceiptData.payment.balancePayment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Paid By:</span>
                    <span className="font-medium">{mockReceiptData.payment.balancePaidBy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Date:</span>
                    <span className="font-medium">{new Date(mockReceiptData.payment.balancePaymentDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Mode:</span>
                    <span className="font-medium">{mockReceiptData.payment.balancePaymentMode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Transaction ID:</span>
                    <span className="font-medium text-xs">{mockReceiptData.payment.balancePaymentTransactionId}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tax Details & Payment Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-blue-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">GST & Tax Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-700">GST Included:</span>
                  <span className="font-medium">{mockReceiptData.taxes.isGstIncluded ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">GST Number:</span>
                  <span className="font-medium text-sm">{mockReceiptData.taxes.gstNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">GST Rate:</span>
                  <span className="font-medium">{mockReceiptData.taxes.gstPercentage}%</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-blue-700">CGST:</span>
                  <span className="font-medium">₹{mockReceiptData.taxes.taxAndGstSplitUp.cgst.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">SGST:</span>
                  <span className="font-medium">₹{mockReceiptData.taxes.taxAndGstSplitUp.sgst.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">IGST:</span>
                  <span className="font-medium">₹{mockReceiptData.taxes.taxAndGstSplitUp.igst.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-blue-700">Total GST:</span>
                  <span>₹{mockReceiptData.taxes.taxAndGstSplitUp.gstAmount.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Payment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-700">Billing Mode:</span>
                  <span className="font-medium">{mockReceiptData.payment.billingMode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Total Amount:</span>
                  <span className="font-semibold text-lg">₹{mockReceiptData.payment.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Paid Amount:</span>
                  <span className="font-medium text-green-600">₹{mockReceiptData.payment.paidAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Due Amount:</span>
                  <span className="font-medium text-red-600">₹{mockReceiptData.payment.dueAmount.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-blue-700">Settlement Status:</span>
                  <Badge className={getStatusColor(mockReceiptData.other.settleMentStatus)} variant="outline">
                    {mockReceiptData.other.settleMentStatus}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Grand Total */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">GRAND TOTAL</h3>
              <p className="text-blue-100 text-sm">Final Amount (Including all taxes)</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">₹{mockReceiptData.taxes.taxAndGstSplitUp.totalAmount.toLocaleString()}</div>
              <div className="text-blue-100 text-sm">Payment Status: {mockReceiptData.receipt.paymentStatus}</div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        {(mockReceiptData.other.refereredBy || mockReceiptData.other.remarks || mockReceiptData.other.note) && (
          <Card className="border-blue-200 mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Additional Information</h3>
              <div className="space-y-4">
                {mockReceiptData.other.refereredBy && (
                  <div>
                    <span className="text-blue-700 font-medium">Referred By:</span>
                    <p className="text-sm mt-1">{mockReceiptData.other.refereredBy} ({mockReceiptData.other.referedByDesignation})</p>
                  </div>
                )}
                {mockReceiptData.other.remarks && (
                  <div>
                    <span className="text-blue-700 font-medium">Remarks:</span>
                    <p className="text-sm mt-1">{mockReceiptData.other.remarks}</p>
                  </div>
                )}
                {mockReceiptData.other.note && (
                  <div>
                    <span className="text-blue-700 font-medium">Note:</span>
                    <p className="text-sm mt-1">{mockReceiptData.other.note}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-blue-600 mt-8 pt-6 border-t border-blue-200">
          <p className="font-medium">Thank you for choosing {mockReceiptData.hotel.name}!</p>
          <p className="mt-1">This is a computer-generated receipt and does not require a signature.</p>
          <p className="mt-1">For any queries, please contact us at {mockReceiptData.hotel.phone} or {mockReceiptData.hotel.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ReservationReceipt;
