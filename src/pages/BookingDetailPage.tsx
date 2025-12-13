
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  Building2, 
  CreditCard, 
  Phone, 
  Mail, 
  MapPin,
  FileText,
  Printer,
  Bed,
  Users,
  Clock,
  Hash,
  Utensils
} from 'lucide-react';

const getBookingDetails = (bookingId: string) => {
  return {
    id: bookingId,
    guestName: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+91 9876543210',
    alternatePhone: '+91 9876543211',
    address: '123 Main Street, Bangalore, Karnataka 560001',
    idType: 'Aadhaar',
    idNumber: 'XXXX XXXX 4567',
    nationality: 'Indian',
    
    checkIn: '2024-01-15',
    checkOut: '2024-01-18',
    checkInTime: '14:00',
    checkOutTime: '11:00',
    nights: 3,
    
    roomType: 'Deluxe Room',
    roomNumber: '101',
    roomCategory: 'AC',
    floor: '1st Floor',
    bedType: 'King Size',
    roomView: 'Garden View',
    
    adults: 2,
    children: 1,
    extraBed: true,
    mealPlan: 'Modified American Plan (MAP)',
    specialRequests: 'Late check-in requested, Non-smoking room preferred',
    
    bookingDate: '2024-01-10',
    bookingTime: '15:30',
    source: 'Direct',
    bookedBy: 'Front Desk - Rahul',
    confirmationNumber: 'CNF-2024-001234',
    
    roomRate: 4500,
    extraBedCharge: 500,
    mealCharges: 1500,
    gstAmount: 1170,
    serviceCharge: 580,
    discountAmount: 500,
    totalAmount: 15750,
    advanceAmount: 5000,
    balanceAmount: 10750,
    paymentStatus: 'PARTIAL',
    
    companyName: 'ABC Corp Ltd.',
    companyAddress: '456 Business Park, Mumbai',
    gstNumber: '29ABCDE1234F1Z5',
    
    payments: [
      {
        id: 'PAY-001',
        date: '2024-01-10',
        amount: 5000,
        mode: 'UPI',
        transactionId: 'UPI123456789',
        receivedBy: 'Rahul',
        remarks: 'Advance payment',
      },
    ],
  };
};

const BookingDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const booking = getBookingDetails(id || '');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'PARTIAL':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'PENDING':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="space-y-6 fade-up">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/bookings')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold text-hotel-primary">Booking Details</h1>
                <Badge variant="outline" className={getPaymentStatusColor(booking.paymentStatus)}>
                  {booking.paymentStatus === 'PARTIAL' ? 'Partially Paid' : booking.paymentStatus}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1">
                {booking.id} • Confirmation: {booking.confirmationNumber}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Download Invoice
            </Button>
            <Button variant="outline">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Guest & Booking Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Guest Information */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Guest Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Guest Name</p>
                      <p className="font-semibold text-lg">{booking.guestName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{booking.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{booking.phone}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                      <span>{booking.address}</span>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">ID Proof</p>
                      <p>{booking.idType}: {booking.idNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Nationality</p>
                      <p>{booking.nationality}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stay Details */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Stay Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Check In</p>
                      <p className="font-semibold">{formatDate(booking.checkIn)}</p>
                      <p className="text-sm text-muted-foreground">{booking.checkInTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Check Out</p>
                      <p className="font-semibold">{formatDate(booking.checkOut)}</p>
                      <p className="text-sm text-muted-foreground">{booking.checkOutTime}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{booking.nights} Nights</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{booking.adults} Adults, {booking.children} Children</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bed className="h-4 w-4 text-muted-foreground" />
                      <span>Extra Bed: {booking.extraBed ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Utensils className="h-4 w-4 text-muted-foreground" />
                      <span>{booking.mealPlan}</span>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Special Requests</p>
                      <p className="text-sm">{booking.specialRequests || 'None'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Room Details */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Room Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Room Type</p>
                    <p className="font-semibold">{booking.roomType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Room Number</p>
                    <p className="font-semibold">{booking.roomNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p>{booking.roomCategory}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Floor</p>
                    <p>{booking.floor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bed Type</p>
                    <p>{booking.bedType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">View</p>
                    <p>{booking.roomView}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Information */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Hash className="h-5 w-5 text-primary" />
                  Booking Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Booking Date</p>
                    <p className="font-semibold">{formatDate(booking.bookingDate)}</p>
                    <p className="text-sm text-muted-foreground">{booking.bookingTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Source</p>
                    <Badge variant="outline" className="bg-purple-100 text-purple-800">
                      {booking.source}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Booked By</p>
                    <p>{booking.bookedBy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Confirmation #</p>
                    <p className="font-mono text-sm">{booking.confirmationNumber}</p>
                  </div>
                </div>

                {booking.companyName && (
                  <>
                    <Separator className="my-4" />
                    <div>
                      <p className="text-sm font-medium mb-3">Company Details</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Company Name</p>
                          <p>{booking.companyName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">GST Number</p>
                          <p className="font-mono text-sm">{booking.gstNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Address</p>
                          <p className="text-sm">{booking.companyAddress}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Payment History */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Payment History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {booking.payments.map((payment) => (
                    <div 
                      key={payment.id} 
                      className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <p className="font-semibold">₹{payment.amount.toLocaleString()}</p>
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            {payment.mode}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatDate(payment.date)} • {payment.remarks}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Transaction ID</p>
                        <p className="font-mono text-sm">{payment.transactionId}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Received by: {payment.receivedBy}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Payment Summary */}
          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Room Rate ({booking.nights} nights)</span>
                    <span>₹{(booking.roomRate * booking.nights).toLocaleString()}</span>
                  </div>
                  {booking.extraBed && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Extra Bed</span>
                      <span>₹{booking.extraBedCharge.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Meal Charges</span>
                    <span>₹{booking.mealCharges.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service Charge</span>
                    <span>₹{booking.serviceCharge.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST (18%)</span>
                    <span>₹{booking.gstAmount.toLocaleString()}</span>
                  </div>
                  {booking.discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{booking.discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Amount</span>
                    <span>₹{booking.totalAmount.toLocaleString()}</span>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between text-green-600">
                    <span>Advance Paid</span>
                    <span>₹{booking.advanceAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-amber-600 font-semibold">
                    <span>Balance Due</span>
                    <span>₹{booking.balanceAmount.toLocaleString()}</span>
                  </div>
                </div>

                <Button className="w-full mt-6">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Add Payment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingDetailPage;
