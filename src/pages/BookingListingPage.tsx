
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  LayoutGrid, 
  List, 
  Calendar,
  User,
  Building2,
  ArrowUpDown,
  Eye
} from 'lucide-react';

type PaymentStatus = 'PAID' | 'PENDING' | 'PARTIAL';
type BookingSource = 'DIRECT' | 'AGENT' | 'OTA' | 'COMPANY' | 'WEBSITE';

interface Booking {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  roomType: string;
  roomNumber: string;
  adults: number;
  children: number;
  totalAmount: number;
  advanceAmount: number;
  balanceAmount: number;
  paymentStatus: PaymentStatus;
  source: BookingSource;
  bookedOn: string;
  mealPlan: string;
}

const paymentStatusConfig: Record<PaymentStatus, { label: string; className: string }> = {
  PAID: { label: 'Paid', className: 'bg-green-100 text-green-800 border-green-200' },
  PENDING: { label: 'Pending', className: 'bg-amber-100 text-amber-800 border-amber-200' },
  PARTIAL: { label: 'Partial', className: 'bg-blue-100 text-blue-800 border-blue-200' },
};

const sourceConfig: Record<BookingSource, { label: string; className: string }> = {
  DIRECT: { label: 'Direct', className: 'bg-purple-100 text-purple-800' },
  AGENT: { label: 'Agent', className: 'bg-indigo-100 text-indigo-800' },
  OTA: { label: 'OTA', className: 'bg-pink-100 text-pink-800' },
  COMPANY: { label: 'Company', className: 'bg-cyan-100 text-cyan-800' },
  WEBSITE: { label: 'Website', className: 'bg-teal-100 text-teal-800' },
};

const mockBookings: Booking[] = [
  {
    id: 'BKG-001',
    guestName: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+91 9876543210',
    checkIn: '2024-01-15',
    checkOut: '2024-01-18',
    nights: 3,
    roomType: 'Deluxe',
    roomNumber: '101',
    adults: 2,
    children: 1,
    totalAmount: 15750,
    advanceAmount: 5000,
    balanceAmount: 10750,
    paymentStatus: 'PARTIAL',
    source: 'DIRECT',
    bookedOn: '2024-01-10',
    mealPlan: 'MAP',
  },
  {
    id: 'BKG-002',
    guestName: 'Alice Johnson',
    email: 'alice.j@email.com',
    phone: '+91 9876543211',
    checkIn: '2024-01-20',
    checkOut: '2024-01-25',
    nights: 5,
    roomType: 'Super Deluxe',
    roomNumber: '205',
    adults: 2,
    children: 0,
    totalAmount: 25000,
    advanceAmount: 25000,
    balanceAmount: 0,
    paymentStatus: 'PAID',
    source: 'OTA',
    bookedOn: '2024-01-12',
    mealPlan: 'CP',
  },
  {
    id: 'BKG-003',
    guestName: 'Robert Brown',
    email: 'robert.b@email.com',
    phone: '+91 9876543212',
    checkIn: '2024-01-22',
    checkOut: '2024-01-24',
    nights: 2,
    roomType: 'Standard',
    roomNumber: '102',
    adults: 1,
    children: 0,
    totalAmount: 8500,
    advanceAmount: 0,
    balanceAmount: 8500,
    paymentStatus: 'PENDING',
    source: 'AGENT',
    bookedOn: '2024-01-15',
    mealPlan: 'EP',
  },
  {
    id: 'BKG-004',
    guestName: 'Emily Davis',
    email: 'emily.d@email.com',
    phone: '+91 9876543213',
    checkIn: '2024-01-28',
    checkOut: '2024-02-02',
    nights: 5,
    roomType: 'Premium Suite',
    roomNumber: '301',
    adults: 2,
    children: 2,
    totalAmount: 45000,
    advanceAmount: 20000,
    balanceAmount: 25000,
    paymentStatus: 'PARTIAL',
    source: 'COMPANY',
    bookedOn: '2024-01-18',
    mealPlan: 'AP',
  },
  {
    id: 'BKG-005',
    guestName: 'Michael Wilson',
    email: 'michael.w@email.com',
    phone: '+91 9876543214',
    checkIn: '2024-02-05',
    checkOut: '2024-02-08',
    nights: 3,
    roomType: 'Deluxe',
    roomNumber: '103',
    adults: 2,
    children: 0,
    totalAmount: 18000,
    advanceAmount: 18000,
    balanceAmount: 0,
    paymentStatus: 'PAID',
    source: 'WEBSITE',
    bookedOn: '2024-01-25',
    mealPlan: 'MAP',
  },
];

const BookingListingPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPaymentStatuses, setSelectedPaymentStatuses] = useState<PaymentStatus[]>(['PENDING', 'PARTIAL']);
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const togglePaymentStatus = (status: PaymentStatus) => {
    setSelectedPaymentStatuses(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const filteredBookings = useMemo(() => {
    return mockBookings.filter(booking => {
      const matchesSearch = 
        booking.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPayment = selectedPaymentStatuses.length === 0 || 
        selectedPaymentStatuses.includes(booking.paymentStatus);
      
      const matchesSource = selectedSource === 'all' || booking.source === selectedSource;

      return matchesSearch && matchesPayment && matchesSource;
    });
  }, [searchQuery, selectedPaymentStatuses, selectedSource]);

  const sortedBookings = useMemo(() => {
    if (!sortConfig) return filteredBookings;
    
    return [...filteredBookings].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof Booking];
      const bValue = b[sortConfig.key as keyof Booking];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredBookings, sortConfig]);

  const handleSort = (key: string) => {
    setSortConfig(prev => {
      if (prev?.key === key) {
        return prev.direction === 'asc' 
          ? { key, direction: 'desc' } 
          : null;
      }
      return { key, direction: 'asc' };
    });
  };

  const handleViewDetails = (bookingId: string) => {
    navigate(`/bookings/${bookingId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Layout>
      <div className="space-y-6 fade-up">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-hotel-primary">Bookings</h1>
            <p className="text-muted-foreground mt-1">Manage and view all bookings</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('table')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by booking ID or guest name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              {/* Source Filter */}
              <Select value={selectedSource} onValueChange={setSelectedSource}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="DIRECT">Direct</SelectItem>
                  <SelectItem value="AGENT">Agent</SelectItem>
                  <SelectItem value="OTA">OTA</SelectItem>
                  <SelectItem value="COMPANY">Company</SelectItem>
                  <SelectItem value="WEBSITE">Website</SelectItem>
                </SelectContent>
              </Select>

              {/* Payment Status Filter */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground">Payment:</span>
                {(Object.keys(paymentStatusConfig) as PaymentStatus[]).map(status => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox
                      id={`payment-${status}`}
                      checked={selectedPaymentStatuses.includes(status)}
                      onCheckedChange={() => togglePaymentStatus(status)}
                    />
                    <Label htmlFor={`payment-${status}`} className="text-sm cursor-pointer">
                      {paymentStatusConfig[status].label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground">
          Showing {sortedBookings.length} of {mockBookings.length} bookings
        </div>

        {/* Table View */}
        {viewMode === 'table' && (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/50">
                    <TableHead 
                      className="cursor-pointer"
                      onClick={() => handleSort('id')}
                    >
                      <div className="flex items-center gap-1">
                        Booking ID
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer"
                      onClick={() => handleSort('guestName')}
                    >
                      <div className="flex items-center gap-1">
                        Guest Name
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer"
                      onClick={() => handleSort('checkIn')}
                    >
                      <div className="flex items-center gap-1">
                        Check In
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead 
                      className="cursor-pointer"
                      onClick={() => handleSort('totalAmount')}
                    >
                      <div className="flex items-center gap-1">
                        Amount
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
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
                        <TableCell>{booking.roomType} - {booking.roomNumber}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={sourceConfig[booking.source].className}>
                            {sourceConfig[booking.source].label}
                          </Badge>
                        </TableCell>
                        <TableCell>₹{booking.totalAmount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={paymentStatusConfig[booking.paymentStatus].className}>
                            {paymentStatusConfig[booking.paymentStatus].label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewDetails(booking.id)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                        No bookings found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedBookings.length > 0 ? (
              sortedBookings.map((booking) => (
                <Card key={booking.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-semibold text-lg">{booking.id}</p>
                        <div className="flex items-center gap-1 text-muted-foreground mt-1">
                          <User className="h-4 w-4" />
                          <span>{booking.guestName}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 items-end">
                        <Badge variant="outline" className={paymentStatusConfig[booking.paymentStatus].className}>
                          {paymentStatusConfig[booking.paymentStatus].label}
                        </Badge>
                        <Badge variant="outline" className={sourceConfig[booking.source].className}>
                          {sourceConfig[booking.source].label}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span>{booking.roomType} - Room {booking.roomNumber}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-xs text-muted-foreground">Total</p>
                        <p className="font-semibold">₹{booking.totalAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Advance</p>
                        <p className="font-semibold text-green-600">₹{booking.advanceAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Balance</p>
                        <p className="font-semibold text-amber-600">₹{booking.balanceAmount.toLocaleString()}</p>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-4"
                      variant="outline"
                      onClick={() => handleViewDetails(booking.id)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No bookings found
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingListingPage;
