
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Search, Filter, CalendarDays, ChevronDown, ArrowUpDown } from 'lucide-react';
import BookingDetailView from './BookingDetailView';

// Mock data for bookings (similar to reservations but with additional fields)
const mockBookings = [
  { 
    id: "BKG-001", 
    guestName: "John Smith", 
    checkIn: "2023-11-15", 
    checkOut: "2023-11-18", 
    roomType: "Deluxe", 
    amount: 12500, 
    paymentStatus: "paid",
    bookingMode: "company",
    bookedOn: "2023-11-10",
    source: "Direct"
  },
  { 
    id: "BKG-002", 
    guestName: "Alice Johnson", 
    checkIn: "2023-11-20", 
    checkOut: "2023-11-25", 
    roomType: "Super Deluxe", 
    amount: 18700, 
    paymentStatus: "pending",
    bookingMode: "individual",
    bookedOn: "2023-11-15",
    source: "Website"
  },
  { 
    id: "BKG-003", 
    guestName: "Robert Brown", 
    checkIn: "2023-11-22", 
    checkOut: "2023-11-24", 
    roomType: "Standard", 
    amount: 8500, 
    paymentStatus: "paid",
    bookingMode: "company",
    bookedOn: "2023-11-12",
    source: "Agent"
  },
  { 
    id: "BKG-004", 
    guestName: "Emily Davis", 
    checkIn: "2023-11-28", 
    checkOut: "2023-12-02", 
    roomType: "Premium", 
    amount: 22000, 
    paymentStatus: "partial",
    bookingMode: "individual",
    bookedOn: "2023-11-18",
    source: "OTA"
  },
  { 
    id: "BKG-005", 
    guestName: "Michael Wilson", 
    checkIn: "2023-12-05", 
    checkOut: "2023-12-08", 
    roomType: "Deluxe", 
    amount: 15000, 
    paymentStatus: "pending",
    bookingMode: "company",
    bookedOn: "2023-11-25",
    source: "Direct"
  },
];

const BookingView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [bookingModeFilter, setBookingModeFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [detailViewOpen, setDetailViewOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | undefined>(undefined);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending' | null;
  }>({ key: '', direction: null });
  
  // Filter reservations based on search and filters
  const filteredBookings = mockBookings.filter(booking => {
    // Search filter
    const matchesSearch = 
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Payment status filter
    const matchesPayment = 
      paymentFilter === "all" || 
      booking.paymentStatus === paymentFilter;
    
    // Booking mode filter
    const matchesBookingMode = 
      bookingModeFilter === "all" || 
      booking.bookingMode === bookingModeFilter;
    
    // Source filter
    const matchesSource = 
      sourceFilter === "all" || 
      booking.source.toLowerCase() === sourceFilter.toLowerCase();
    
    return matchesSearch && matchesPayment && matchesBookingMode && matchesSource;
  });

  // Sort function
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key as keyof typeof a];
    const bValue = b[sortConfig.key as keyof typeof b];
    
    if (aValue < bValue) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Function to handle sorting
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' | null = 'ascending';
    
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        direction = 'descending';
      } else if (sortConfig.direction === 'descending') {
        direction = null;
      }
    }
    
    setSortConfig({ key, direction });
  };

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
  
  // Handle opening the detailed view for a booking
  const handleViewBooking = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setDetailViewOpen(true);
  };

  return (
    <div className="space-y-6 fade-up">
      <div className="flex items-center justify-between w-full mb-8">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-hotel-primary">Booking Management</h1>
          <p className="text-muted-foreground mt-1">View and manage hotel bookings</p>
        </div>
      </div>

      <Card className="border border-border/40 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            Booking List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or booking ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-background"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="w-[150px]">
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
              
              <div className="w-[150px]">
                <Select value={bookingModeFilter} onValueChange={setBookingModeFilter}>
                  <SelectTrigger className="bg-background">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Booking Mode" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Modes</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                    <SelectItem value="individual">Individual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-[150px]">
                <Select value={sourceFilter} onValueChange={setSourceFilter}>
                  <SelectTrigger className="bg-background">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Source" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="direct">Direct</SelectItem>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="agent">Agent</SelectItem>
                    <SelectItem value="ota">OTA</SelectItem>
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
                  <TableHead 
                    className="font-medium cursor-pointer" 
                    onClick={() => requestSort('id')}
                  >
                    <div className="flex items-center">
                      Booking ID
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-medium cursor-pointer" 
                    onClick={() => requestSort('guestName')}
                  >
                    <div className="flex items-center">
                      Guest Name
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-medium cursor-pointer" 
                    onClick={() => requestSort('checkIn')}
                  >
                    <div className="flex items-center">
                      Check In
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-medium cursor-pointer" 
                    onClick={() => requestSort('checkOut')}
                  >
                    <div className="flex items-center">
                      Check Out
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="font-medium">Room Type</TableHead>
                  <TableHead className="font-medium">Source</TableHead>
                  <TableHead 
                    className="font-medium cursor-pointer" 
                    onClick={() => requestSort('amount')}
                  >
                    <div className="flex items-center">
                      Amount
                      <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedBookings.length > 0 ? (
                  sortedBookings.map((booking) => (
                    <TableRow key={booking.id} className="hover:bg-secondary/30">
                      <TableCell className="font-medium">{booking.id}</TableCell>
                      <TableCell>{booking.guestName}</TableCell>
                      <TableCell>{formatDate(booking.checkIn)}</TableCell>
                      <TableCell>{formatDate(booking.checkOut)}</TableCell>
                      <TableCell>{booking.roomType}</TableCell>
                      <TableCell>{booking.source}</TableCell>
                      <TableCell>₹{booking.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={getPaymentBadgeColor(booking.paymentStatus)} variant="outline">
                          {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleViewBooking(booking.id)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      No bookings found matching your filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination Area (Simplified for now) */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {sortedBookings.length} of {mockBookings.length} bookings
            </div>
            <div className="space-x-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Booking Detail Dialog */}
      <BookingDetailView 
        isOpen={detailViewOpen}
        onClose={() => setDetailViewOpen(false)}
        bookingId={selectedBookingId}
      />
    </div>
  );
};

export default BookingView;
