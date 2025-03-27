
import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, CalendarDays, ChevronDown } from "lucide-react";

// Mock data for reservations
const mockReservations = [
  { 
    id: "RES-001", 
    guestName: "John Smith", 
    checkIn: "2023-11-15", 
    checkOut: "2023-11-18", 
    roomType: "Deluxe", 
    amount: 12500, 
    paymentStatus: "paid",
    bookingMode: "company" 
  },
  { 
    id: "RES-002", 
    guestName: "Alice Johnson", 
    checkIn: "2023-11-20", 
    checkOut: "2023-11-25", 
    roomType: "Super Deluxe", 
    amount: 18700, 
    paymentStatus: "pending",
    bookingMode: "individual" 
  },
  { 
    id: "RES-003", 
    guestName: "Robert Brown", 
    checkIn: "2023-11-22", 
    checkOut: "2023-11-24", 
    roomType: "Standard", 
    amount: 8500, 
    paymentStatus: "paid",
    bookingMode: "company" 
  },
  { 
    id: "RES-004", 
    guestName: "Emily Davis", 
    checkIn: "2023-11-28", 
    checkOut: "2023-12-02", 
    roomType: "Premium", 
    amount: 22000, 
    paymentStatus: "partial",
    bookingMode: "individual" 
  },
  { 
    id: "RES-005", 
    guestName: "Michael Wilson", 
    checkIn: "2023-12-05", 
    checkOut: "2023-12-08", 
    roomType: "Deluxe", 
    amount: 15000, 
    paymentStatus: "pending",
    bookingMode: "company" 
  },
];

const ReservationTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [bookingModeFilter, setBookingModeFilter] = useState("all");
  
  // Filter reservations based on search and filters
  const filteredReservations = mockReservations.filter(reservation => {
    // Search filter
    const matchesSearch = 
      reservation.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Payment status filter
    const matchesPayment = 
      paymentFilter === "all" || 
      reservation.paymentStatus === paymentFilter;
    
    // Booking mode filter
    const matchesBookingMode = 
      bookingModeFilter === "all" || 
      reservation.bookingMode === bookingModeFilter;
    
    return matchesSearch && matchesPayment && matchesBookingMode;
  });

  // Function to get badge color based on payment status
  const getPaymentBadgeColor = (status: string) => {
    switch(status) {
      case 'paid':
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case 'pending':
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      case 'partial':
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

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
    <div className="space-y-6 fade-up">
      <Card className="border border-border/40">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            Reservation List
          </CardTitle>
        </CardHeader>
        
        {/* Filters Section */}
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or reservation ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-background"
              />
            </div>
            
            <div className="flex gap-3">
              <div className="w-[170px]">
                <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                  <SelectTrigger className="bg-background">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Payment Status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Payments</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-[170px]">
                <Select value={bookingModeFilter} onValueChange={setBookingModeFilter}>
                  <SelectTrigger className="bg-background">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Booking Mode" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Bookings</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                    <SelectItem value="individual">Individual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Table Section */}
          <div className="rounded-md border shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-secondary/50">
                <TableRow>
                  <TableHead className="font-medium">Reservation ID</TableHead>
                  <TableHead className="font-medium">Guest Name</TableHead>
                  <TableHead className="font-medium">Check In</TableHead>
                  <TableHead className="font-medium">Check Out</TableHead>
                  <TableHead className="font-medium">Room Type</TableHead>
                  <TableHead className="font-medium">Amount</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReservations.length > 0 ? (
                  filteredReservations.map((reservation) => (
                    <TableRow key={reservation.id} className="hover:bg-secondary/30">
                      <TableCell className="font-medium">{reservation.id}</TableCell>
                      <TableCell>{reservation.guestName}</TableCell>
                      <TableCell>{formatDate(reservation.checkIn)}</TableCell>
                      <TableCell>{formatDate(reservation.checkOut)}</TableCell>
                      <TableCell>{reservation.roomType}</TableCell>
                      <TableCell>₹{reservation.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={getPaymentBadgeColor(reservation.paymentStatus)} variant="outline">
                          {reservation.paymentStatus.charAt(0).toUpperCase() + reservation.paymentStatus.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">View</Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No reservations found matching your filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination Area (Simplified for now) */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredReservations.length} of {mockReservations.length} reservations
            </div>
            <div className="space-x-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReservationTable;
