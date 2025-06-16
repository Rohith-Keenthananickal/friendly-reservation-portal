
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, Hotel, MapPin, Phone, Mail, Calendar, Users, CreditCard } from 'lucide-react';

// Mock data structure based on the schema
const mockVoucherData = {
  hotel: {
    name: "Access Rooms Kashmir",
    logo: "/placeholder.svg",
    address: "Dal Lake Road, Srinagar, Kashmir",
    phone: "+91-194-2501234",
    email: "info@accessrooms.com",
    gstNumber: "15ABCDE1234F1Z5"
  },
  reservation: {
    reservationNumber: "RES-2024-001",
    status: "CONFIRMED",
    checkIn: "2024-01-15",
    checkOut: "2024-01-18",
    nights: 3,
    bookingMode: "ONLINE",
    bookingDate: "2024-01-10",
    billingMode: "INCLUDE_GST"
  },
  guest: {
    name: "John Smith",
    phone: "+91-9876543210",
    email: "john.smith@email.com",
    address: "123 Main Street",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    pincode: "400001",
    documents: ["passport_front.jpg", "passport_back.jpg"]
  },
  bookedRooms: [
    {
      roomType: "Deluxe Lake View",
      adults: 2,
      children: 1,
      mealPlan: "Modified American Plan",
      beddingType: "King Bed",
      bookedDates: "15 Jan - 18 Jan 2024",
      amountPerNight: 5000,
      nights: 3,
      total: 15000,
      extraGuests: {
        withBed: 0,
        withoutBed: 1,
        mattress: 0,
        cot: 0
      }
    }
  ],
  payment: {
    totalAmount: 17700,
    paidAmount: 10000,
    dueAmount: 7700,
    paymentStatus: "PARTIAL",
    paymentType: "ADVANCE",
    transactionIds: ["TXN123456", "TXN789012"]
  },
  taxes: {
    baseAmount: 15000,
    tax: 1350,
    gst: 1350,
    cgst: 675,
    sgst: 675,
    igst: 0
  },
  reference: {
    agent: "Kashmir Travel Agency",
    company: "Mountain Tours Pvt Ltd"
  },
  remarks: "Early check-in requested. Lake view room preferred.",
  complementary: "Welcome drink and fruit basket"
};

const ReservationVoucher = () => {
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Reservation-Voucher-${mockVoucherData.reservation.reservationNumber}`,
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'CONFIRMED': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch(status) {
      case 'PAID': return 'bg-green-100 text-green-800';
      case 'PARTIAL': return 'bg-orange-100 text-orange-800';
      case 'PENDING': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-hotel-primary">Reservation Voucher</h1>
          <p className="text-muted-foreground mt-1">Hotel booking confirmation and details</p>
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
        {/* Hotel Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-amber-200">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center">
              <Hotel className="h-8 w-8 text-amber-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{mockVoucherData.hotel.name}</h1>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {mockVoucherData.hotel.address}
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-1" />
                  {mockVoucherData.hotel.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-1" />
                  {mockVoucherData.hotel.email}
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-amber-600">RESERVATION VOUCHER</div>
            <div className="text-sm text-gray-600 mt-1">#{mockVoucherData.reservation.reservationNumber}</div>
          </div>
        </div>

        {/* Reservation Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-amber-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-amber-600" />
                Reservation Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Badge className={getStatusColor(mockVoucherData.reservation.status)} variant="outline">
                    {mockVoucherData.reservation.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-in:</span>
                  <span className="font-medium">{new Date(mockVoucherData.reservation.checkIn).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-out:</span>
                  <span className="font-medium">{new Date(mockVoucherData.reservation.checkOut).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nights:</span>
                  <span className="font-medium">{mockVoucherData.reservation.nights}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking Mode:</span>
                  <span className="font-medium">{mockVoucherData.reservation.bookingMode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking Date:</span>
                  <span className="font-medium">{new Date(mockVoucherData.reservation.bookingDate).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-amber-600" />
                Guest Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{mockVoucherData.guest.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{mockVoucherData.guest.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium text-sm">{mockVoucherData.guest.email}</span>
                </div>
                <div className="pt-2">
                  <span className="text-gray-600 block mb-1">Address:</span>
                  <span className="font-medium text-sm">
                    {mockVoucherData.guest.address}, {mockVoucherData.guest.city}, {mockVoucherData.guest.state}, {mockVoucherData.guest.country} - {mockVoucherData.guest.pincode}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Room Details */}
        <Card className="border-amber-200 mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Hotel className="h-5 w-5 mr-2 text-amber-600" />
              Room & Stay Details
            </h3>
            {mockVoucherData.bookedRooms.map((room, index) => (
              <div key={index} className="border rounded-lg p-4 bg-amber-50">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <span className="text-gray-600 text-sm">Room Type:</span>
                    <p className="font-medium">{room.roomType}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Guests:</span>
                    <p className="font-medium">{room.adults} Adults, {room.children} Children</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Meal Plan:</span>
                    <p className="font-medium">{room.mealPlan}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Bedding:</span>
                    <p className="font-medium">{room.beddingType}</p>
                  </div>
                </div>
                <Separator className="my-3" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <span className="text-gray-600 text-sm">Period:</span>
                    <p className="font-medium">{room.bookedDates}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Rate/Night:</span>
                    <p className="font-medium">₹{room.amountPerNight.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Nights:</span>
                    <p className="font-medium">{room.nights}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Total:</span>
                    <p className="font-semibold text-lg text-amber-600">₹{room.total.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-amber-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-amber-600" />
                Payment Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-semibold">₹{mockVoucherData.payment.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Paid Amount:</span>
                  <span className="font-medium text-green-600">₹{mockVoucherData.payment.paidAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Due Amount:</span>
                  <span className="font-medium text-red-600">₹{mockVoucherData.payment.dueAmount.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Status:</span>
                  <Badge className={getPaymentStatusColor(mockVoucherData.payment.paymentStatus)} variant="outline">
                    {mockVoucherData.payment.paymentStatus}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Type:</span>
                  <span className="font-medium">{mockVoucherData.payment.paymentType}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">GST & Tax Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Amount:</span>
                  <span className="font-medium">₹{mockVoucherData.taxes.baseAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">CGST:</span>
                  <span className="font-medium">₹{mockVoucherData.taxes.cgst.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">SGST:</span>
                  <span className="font-medium">₹{mockVoucherData.taxes.sgst.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total GST:</span>
                  <span className="font-medium">₹{mockVoucherData.taxes.gst.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">GST Number:</span>
                  <span className="font-medium text-sm">{mockVoucherData.hotel.gstNumber}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        {(mockVoucherData.reference.agent || mockVoucherData.remarks || mockVoucherData.complementary) && (
          <Card className="border-amber-200 mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
              <div className="space-y-4">
                {mockVoucherData.reference.agent && (
                  <div>
                    <span className="text-gray-600 font-medium">Reference Agent:</span>
                    <p className="text-sm mt-1">{mockVoucherData.reference.agent}</p>
                  </div>
                )}
                {mockVoucherData.remarks && (
                  <div>
                    <span className="text-gray-600 font-medium">Remarks:</span>
                    <p className="text-sm mt-1">{mockVoucherData.remarks}</p>
                  </div>
                )}
                {mockVoucherData.complementary && (
                  <div>
                    <span className="text-gray-600 font-medium">Complementary:</span>
                    <p className="text-sm mt-1">{mockVoucherData.complementary}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-8 pt-6 border-t border-amber-200">
          <p>This is a computer-generated voucher and does not require a signature.</p>
          <p className="mt-1">For any queries, please contact us at {mockVoucherData.hotel.phone} or {mockVoucherData.hotel.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ReservationVoucher;
