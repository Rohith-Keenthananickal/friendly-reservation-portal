
import React from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetDescription,
  SheetClose
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Calendar, User, Building, CreditCard, FileText, Bed, X } from 'lucide-react';

interface BookingDetailViewProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId?: string;
}

// Mock detailed booking data
const getBookingDetails = (bookingId: string) => {
  return {
    id: bookingId,
    guestName: "John Smith",
    email: "john.smith@example.com",
    phone: "+91 9876543210",
    checkIn: "2023-11-15",
    checkOut: "2023-11-18",
    nights: 3,
    adults: 2,
    children: 1,
    roomType: "Deluxe",
    mealPlan: "Modified American Plan",
    roomRate: 4500,
    taxAmount: 750,
    totalAmount: 15750,
    paymentStatus: "Paid",
    paymentMode: "Credit Card",
    bookingSource: "Direct",
    bookingDate: "2023-11-10",
    specialRequests: "Late check-in requested",
    companyName: "ABC Corp Ltd.",
    gstNumber: "29ABCDE1234F1Z5",
    address: "123 Main St, Bangalore, Karnataka",
    agentName: "Travel Easy"
  };
};

const BookingDetailView: React.FC<BookingDetailViewProps> = ({ 
  isOpen, 
  onClose, 
  bookingId 
}) => {
  if (!bookingId) return null;
  
  const booking = getBookingDetails(bookingId);
  
  // Format date to display in a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-2xl w-[90vw] overflow-y-auto">
        <SheetHeader className="mb-5">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl">Booking Details</SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
          <SheetDescription>
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">{booking.id}</span>
              <Badge variant="outline" className="bg-green-100 text-green-800">
                {booking.paymentStatus}
              </Badge>
            </div>
          </SheetDescription>
        </SheetHeader>
        
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid grid-cols-3 w-full mb-4">
            <TabsTrigger value="details" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Details
            </TabsTrigger>
            <TabsTrigger value="guest" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Guest
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payment
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Check In</h3>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="font-semibold">{formatDate(booking.checkIn)}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Check Out</h3>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="font-semibold">{formatDate(booking.checkOut)}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Duration</h3>
                      <span>{booking.nights} Nights</span>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Booking Date</h3>
                      <span>{formatDate(booking.bookingDate)}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Room Type</h3>
                      <div className="flex items-center gap-2">
                        <Bed className="h-4 w-4 text-primary" />
                        <span className="font-semibold">{booking.roomType}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Meal Plan</h3>
                      <span>{booking.mealPlan}</span>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Occupancy</h3>
                      <span>{booking.adults} Adults, {booking.children} Children</span>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Special Requests</h3>
                      <span>{booking.specialRequests || "None"}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Booking Source</h3>
                  <div className="flex items-center gap-2">
                    <span>{booking.bookingSource}</span>
                    {booking.agentName && (
                      <span className="text-muted-foreground">via {booking.agentName}</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="guest" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Guest Name</h3>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      <span className="font-semibold">{booking.guestName}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                      <span>{booking.email}</span>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Phone</h3>
                      <span>{booking.phone}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Address</h3>
                    <span>{booking.address}</span>
                  </div>
                </div>
                
                {booking.companyName && (
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="text-sm font-medium mb-4">Company Information</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Company Name</h3>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-primary" />
                          <span>{booking.companyName}</span>
                        </div>
                      </div>
                      
                      {booking.gstNumber && (
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">GST Number</h3>
                          <span>{booking.gstNumber}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payment" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Payment Status</h3>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        {booking.paymentStatus}
                      </Badge>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Payment Mode</h3>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-primary" />
                        <span>{booking.paymentMode}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Room Rate</h3>
                      <span>₹{booking.roomRate.toLocaleString()}/night</span>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Tax</h3>
                      <span>₹{booking.taxAmount.toLocaleString()}</span>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Amount</h3>
                      <span className="font-semibold">₹{booking.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <div className="flex justify-between">
                    <Button variant="outline">Download Invoice</Button>
                    <Button variant="outline">View Receipts</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex justify-end space-x-4">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button>Print Details</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingDetailView;
