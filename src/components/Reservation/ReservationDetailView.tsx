
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  User, 
  Building, 
  CreditCard, 
  ClipboardList, 
  FileText,
  Printer,
  Mail,
  X
} from "lucide-react";

interface ReservationDetailViewProps {
  isOpen: boolean;
  onClose: () => void;
  reservationId?: string;
}

const ReservationDetailView: React.FC<ReservationDetailViewProps> = ({ 
  isOpen, 
  onClose,
  reservationId 
}) => {
  // In a real application, this would fetch data based on the reservationId
  // For this example, we'll use mock data
  const reservationData = {
    id: reservationId || "RES-001",
    status: "confirmed",
    paymentStatus: "paid",
    created: "2023-11-15T14:30:00",
    guestDetails: {
      name: "John Smith",
      type: "indian",
      address: "123 Main Street, Mumbai, Maharashtra",
      idNumber: "ABCDE1234F",
      phone: "+91 98765 43210",
      email: "john.smith@example.com",
      state: "Maharashtra",
      country: "India",
      hasGST: false,
    },
    companyDetails: {
      name: "ABC Corporation",
      address: "Business Park, Andheri, Mumbai",
      designation: "Senior Manager",
      phone: "+91 98765 12345",
      email: "accounts@abccorp.com",
      state: "Maharashtra",
      country: "India"
    },
    bookingDetails: {
      mode: "company",
      reservationNumber: "1012",
      checkIn: "2023-11-15",
      checkOut: "2023-11-18",
      nights: 3,
      adults: 2,
      children: 0,
    },
    roomDetails: [
      {
        type: "Deluxe Room",
        checkIn: "2023-11-15",
        checkOut: "2023-11-18",
        nights: 3,
        mealPlan: "MAP",
        adults: 2,
        children: 0,
        rate: 4500,
        total: 13500
      }
    ],
    paymentDetails: {
      mode: "card",
      subtotal: 13500,
      gst: 2430,
      sgst: 1215,
      cgst: 1215,
      igst: 0,
      grandTotal: 15930
    },
    documents: {
      frontId: "/placeholder.svg",
      backId: "/placeholder.svg"
    },
    notes: "Guest celebrating anniversary during stay. Arrange for complimentary cake on Nov 16."
  };
  
  // Format date string to a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>;
      case 'checked-in':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Checked In</Badge>;
      case 'checked-out':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Checked Out</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Get payment status badge styling
  const getPaymentBadge = (status: string) => {
    switch(status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>;
      case 'partial':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Partial</Badge>;
      case 'refunded':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Refunded</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="sticky top-0 z-10 bg-background p-6 border-b">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <DialogTitle className="text-xl">Reservation #{reservationData.id}</DialogTitle>
              {getStatusBadge(reservationData.status)}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Printer className="h-4 w-4" />
                <span>Print</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose} className="flex items-center">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="p-6">
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="grid grid-cols-5 bg-secondary/30 mb-6">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="guest">Guest Details</TabsTrigger>
              <TabsTrigger value="booking">Booking Details</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            
            {/* Summary Tab */}
            <TabsContent value="summary" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-2">
                  <CardHeader className="bg-secondary/20 pb-3">
                    <CardTitle className="text-md font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      Reservation Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground">Reservation ID</p>
                        <p className="font-medium">{reservationData.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Created</p>
                        <p className="font-medium">{new Date(reservationData.created).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Guest Name</p>
                        <p className="font-medium">{reservationData.guestDetails.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Booking Mode</p>
                        <p className="font-medium capitalize">{reservationData.bookingDetails.mode}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Check In</p>
                        <p className="font-medium">{formatDate(reservationData.bookingDetails.checkIn)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Check Out</p>
                        <p className="font-medium">{formatDate(reservationData.bookingDetails.checkOut)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Nights</p>
                        <p className="font-medium">{reservationData.bookingDetails.nights}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Guests</p>
                        <p className="font-medium">{reservationData.bookingDetails.adults} Adults, {reservationData.bookingDetails.children} Children</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="bg-secondary/20 pb-3">
                    <CardTitle className="text-md font-medium flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-primary" />
                      Payment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Payment Status</p>
                        <div className="pt-1">{getPaymentBadge(reservationData.paymentStatus)}</div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Payment Mode</p>
                        <p className="font-medium capitalize">{reservationData.paymentDetails.mode}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Amount</p>
                        <p className="font-medium text-lg">₹{reservationData.paymentDetails.grandTotal.toLocaleString()}</p>
                      </div>
                      <div className="pt-2">
                        <Button size="sm" className="w-full">Process Payment</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="bg-secondary/20 pb-3">
                  <CardTitle className="text-md font-medium flex items-center gap-2">
                    <ClipboardList className="h-4 w-4 text-primary" />
                    Room Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-secondary/30">
                      <TableRow>
                        <TableHead>Room Type</TableHead>
                        <TableHead>Check In</TableHead>
                        <TableHead>Check Out</TableHead>
                        <TableHead>Nights</TableHead>
                        <TableHead>Meal Plan</TableHead>
                        <TableHead>Guests</TableHead>
                        <TableHead>Rate</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reservationData.roomDetails.map((room, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{room.type}</TableCell>
                          <TableCell>{formatDate(room.checkIn)}</TableCell>
                          <TableCell>{formatDate(room.checkOut)}</TableCell>
                          <TableCell>{room.nights}</TableCell>
                          <TableCell>{room.mealPlan}</TableCell>
                          <TableCell>{room.adults} Adults, {room.children} Children</TableCell>
                          <TableCell>₹{room.rate.toLocaleString()}</TableCell>
                          <TableCell>₹{room.total.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              {reservationData.notes && (
                <Card>
                  <CardHeader className="bg-secondary/20 pb-3">
                    <CardTitle className="text-md font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p>{reservationData.notes}</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            {/* Guest Details Tab */}
            <TabsContent value="guest" className="space-y-6">
              <Card>
                <CardHeader className="bg-secondary/20 pb-3">
                  <CardTitle className="text-md font-medium flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    Guest Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Guest Name</p>
                      <p className="font-medium">{reservationData.guestDetails.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Guest Type</p>
                      <p className="font-medium capitalize">{reservationData.guestDetails.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">ID Number</p>
                      <p className="font-medium">{reservationData.guestDetails.idNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{reservationData.guestDetails.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{reservationData.guestDetails.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Has GST</p>
                      <p className="font-medium">{reservationData.guestDetails.hasGST ? 'Yes' : 'No'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">State</p>
                      <p className="font-medium">{reservationData.guestDetails.state}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Country</p>
                      <p className="font-medium">{reservationData.guestDetails.country}</p>
                    </div>
                    <div className="md:col-span-3">
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">{reservationData.guestDetails.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {reservationData.bookingDetails.mode === 'company' && (
                <Card>
                  <CardHeader className="bg-secondary/20 pb-3">
                    <CardTitle className="text-md font-medium flex items-center gap-2">
                      <Building className="h-4 w-4 text-primary" />
                      Company Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground">Company Name</p>
                        <p className="font-medium">{reservationData.companyDetails.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Designation</p>
                        <p className="font-medium">{reservationData.companyDetails.designation}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">{reservationData.companyDetails.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{reservationData.companyDetails.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">State</p>
                        <p className="font-medium">{reservationData.companyDetails.state}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Country</p>
                        <p className="font-medium">{reservationData.companyDetails.country}</p>
                      </div>
                      <div className="md:col-span-3">
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p className="font-medium">{reservationData.companyDetails.address}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            {/* Booking Details Tab */}
            <TabsContent value="booking" className="space-y-6">
              <Card>
                <CardHeader className="bg-secondary/20 pb-3">
                  <CardTitle className="text-md font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    Booking Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Reservation Number</p>
                      <p className="font-medium">{reservationData.bookingDetails.reservationNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Booking Mode</p>
                      <p className="font-medium capitalize">{reservationData.bookingDetails.mode}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <div className="pt-1">{getStatusBadge(reservationData.status)}</div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Check In</p>
                      <p className="font-medium">{formatDate(reservationData.bookingDetails.checkIn)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Check Out</p>
                      <p className="font-medium">{formatDate(reservationData.bookingDetails.checkOut)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Nights</p>
                      <p className="font-medium">{reservationData.bookingDetails.nights}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Adults</p>
                      <p className="font-medium">{reservationData.bookingDetails.adults}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Children</p>
                      <p className="font-medium">{reservationData.bookingDetails.children}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="bg-secondary/20 pb-3">
                  <CardTitle className="text-md font-medium flex items-center gap-2">
                    <ClipboardList className="h-4 w-4 text-primary" />
                    Room Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-secondary/30">
                      <TableRow>
                        <TableHead>Room Type</TableHead>
                        <TableHead>Check In</TableHead>
                        <TableHead>Check Out</TableHead>
                        <TableHead>Nights</TableHead>
                        <TableHead>Meal Plan</TableHead>
                        <TableHead>Guests</TableHead>
                        <TableHead>Rate</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reservationData.roomDetails.map((room, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{room.type}</TableCell>
                          <TableCell>{formatDate(room.checkIn)}</TableCell>
                          <TableCell>{formatDate(room.checkOut)}</TableCell>
                          <TableCell>{room.nights}</TableCell>
                          <TableCell>{room.mealPlan}</TableCell>
                          <TableCell>{room.adults} Adults, {room.children} Children</TableCell>
                          <TableCell>₹{room.rate.toLocaleString()}</TableCell>
                          <TableCell>₹{room.total.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Payment Tab */}
            <TabsContent value="payment" className="space-y-6">
              <Card>
                <CardHeader className="bg-secondary/20 pb-3">
                  <CardTitle className="text-md font-medium flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-primary" />
                    Payment Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Payment Status</p>
                      <div className="pt-1">{getPaymentBadge(reservationData.paymentStatus)}</div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Payment Mode</p>
                      <p className="font-medium capitalize">{reservationData.paymentDetails.mode}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Subtotal</p>
                      <p className="font-medium">₹{reservationData.paymentDetails.subtotal.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">GST</p>
                      <p className="font-medium">₹{reservationData.paymentDetails.gst.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">SGST</p>
                      <p className="font-medium">₹{reservationData.paymentDetails.sgst.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">CGST</p>
                      <p className="font-medium">₹{reservationData.paymentDetails.cgst.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">IGST</p>
                      <p className="font-medium">₹{reservationData.paymentDetails.igst.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Grand Total</p>
                      <p className="font-medium text-lg text-primary">₹{reservationData.paymentDetails.grandTotal.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="bg-secondary/20 pb-3">
                  <CardTitle className="text-md font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    Payment Transactions
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <Table>
                    <TableHeader className="bg-secondary/30">
                      <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Mode</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">TXN-10234</TableCell>
                        <TableCell>{new Date(reservationData.created).toLocaleDateString()}</TableCell>
                        <TableCell>Card</TableCell>
                        <TableCell>₹{reservationData.paymentDetails.grandTotal.toLocaleString()}</TableCell>
                        <TableCell><Badge className="bg-green-100 text-green-800 hover:bg-green-100">Success</Badge></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader className="bg-secondary/20 pb-3">
                  <CardTitle className="text-md font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    ID Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Front Side of ID</p>
                      <div className="border rounded-md p-4 flex items-center justify-center bg-secondary/10">
                        <img 
                          src={reservationData.documents.frontId} 
                          alt="Front ID" 
                          className="max-h-[200px] object-contain"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Back Side of ID</p>
                      <div className="border rounded-md p-4 flex items-center justify-center bg-secondary/10">
                        <img 
                          src={reservationData.documents.backId} 
                          alt="Back ID" 
                          className="max-h-[200px] object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationDetailView;
