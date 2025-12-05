import React, { useState, useMemo } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, CalendarIcon, Grid3X3, List, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { useNavigate } from 'react-router-dom';
type SettlementStatus = 'PENDING' | 'SETTLED' | 'PARTIALLY_SETTLED';
interface Reservation {
  id: string;
  reservationNumber: string;
  guestName: string;
  totalAmount: number;
  advanceAmount: number;
  balanceAmount: number;
  pendingAmount: number;
  settlementStatus: SettlementStatus;
  checkInDate: string;
  checkOutDate: string;
}

// Mock data
const mockReservations: Reservation[] = [{
  id: '1',
  reservationNumber: 'RES-2025-001',
  guestName: 'John Doe',
  totalAmount: 15000,
  advanceAmount: 5000,
  balanceAmount: 10000,
  pendingAmount: 10000,
  settlementStatus: 'PENDING',
  checkInDate: '2025-12-01',
  checkOutDate: '2025-12-05'
}, {
  id: '2',
  reservationNumber: 'RES-2025-002',
  guestName: 'Jane Smith',
  totalAmount: 25000,
  advanceAmount: 25000,
  balanceAmount: 0,
  pendingAmount: 0,
  settlementStatus: 'SETTLED',
  checkInDate: '2025-12-02',
  checkOutDate: '2025-12-06'
}, {
  id: '3',
  reservationNumber: 'RES-2025-003',
  guestName: 'Robert Wilson',
  totalAmount: 18000,
  advanceAmount: 10000,
  balanceAmount: 8000,
  pendingAmount: 8000,
  settlementStatus: 'PARTIALLY_SETTLED',
  checkInDate: '2025-12-03',
  checkOutDate: '2025-12-07'
}, {
  id: '4',
  reservationNumber: 'RES-2025-004',
  guestName: 'Emily Brown',
  totalAmount: 32000,
  advanceAmount: 0,
  balanceAmount: 32000,
  pendingAmount: 32000,
  settlementStatus: 'PENDING',
  checkInDate: '2025-12-04',
  checkOutDate: '2025-12-08'
}, {
  id: '5',
  reservationNumber: 'RES-2025-005',
  guestName: 'Michael Johnson',
  totalAmount: 20000,
  advanceAmount: 12000,
  balanceAmount: 8000,
  pendingAmount: 8000,
  settlementStatus: 'PARTIALLY_SETTLED',
  checkInDate: '2025-12-05',
  checkOutDate: '2025-12-09'
}, {
  id: '6',
  reservationNumber: 'RES-2025-006',
  guestName: 'Sarah Davis',
  totalAmount: 28000,
  advanceAmount: 28000,
  balanceAmount: 0,
  pendingAmount: 0,
  settlementStatus: 'SETTLED',
  checkInDate: '2025-12-06',
  checkOutDate: '2025-12-10'
}, {
  id: '7',
  reservationNumber: 'RES-2025-007',
  guestName: 'David Lee',
  totalAmount: 22000,
  advanceAmount: 5000,
  balanceAmount: 17000,
  pendingAmount: 17000,
  settlementStatus: 'PENDING',
  checkInDate: '2025-12-07',
  checkOutDate: '2025-12-11'
}, {
  id: '8',
  reservationNumber: 'RES-2025-008',
  guestName: 'Amanda White',
  totalAmount: 35000,
  advanceAmount: 20000,
  balanceAmount: 15000,
  pendingAmount: 15000,
  settlementStatus: 'PARTIALLY_SETTLED',
  checkInDate: '2025-12-08',
  checkOutDate: '2025-12-12'
}];
const statusConfig: Record<SettlementStatus, {
  label: string;
  className: string;
}> = {
  PENDING: {
    label: 'Pending',
    className: 'bg-red-100 text-red-700 hover:bg-red-100'
  },
  SETTLED: {
    label: 'Settled',
    className: 'bg-green-100 text-green-700 hover:bg-green-100'
  },
  PARTIALLY_SETTLED: {
    label: 'Partially Settled',
    className: 'bg-orange-100 text-orange-700 hover:bg-orange-100'
  }
};
const ReceiptListingPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedStatuses, setSelectedStatuses] = useState<SettlementStatus[]>(['PENDING', 'PARTIALLY_SETTLED']);
  const statusOptions: {
    value: SettlementStatus;
    label: string;
  }[] = [{
    value: 'PENDING',
    label: 'Pending'
  }, {
    value: 'SETTLED',
    label: 'Settled'
  }, {
    value: 'PARTIALLY_SETTLED',
    label: 'Partially Settled'
  }];
  const toggleStatus = (status: SettlementStatus) => {
    setSelectedStatuses(prev => prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]);
  };
  const filteredReservations = useMemo(() => {
    return mockReservations.filter(reservation => {
      // Search filter
      const matchesSearch = searchQuery === '' || reservation.reservationNumber.toLowerCase().includes(searchQuery.toLowerCase()) || reservation.guestName.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(reservation.settlementStatus);

      // Date filter
      let matchesDate = true;
      if (dateRange?.from) {
        const checkIn = new Date(reservation.checkInDate);
        matchesDate = checkIn >= dateRange.from;
        if (dateRange.to) {
          matchesDate = matchesDate && checkIn <= dateRange.to;
        }
      }
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [searchQuery, selectedStatuses, dateRange]);
  const handleViewDetails = (reservationId: string) => {
    navigate(`/receipt/${reservationId}`);
  };
  return <Layout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Receipt Management</h1>
          <div className="flex items-center gap-2">
            <Button variant={viewMode === 'table' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('table')}>
              <List className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('grid')}>
              <Grid3X3 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="flex flex-wrap items-center gap-4 p-4 rounded-lg border bg-white">
          {/* Search */}
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by reservation number or guest name..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10" />
          </div>

          {/* Date Range Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="min-w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? dateRange.to ? <>
                      {format(dateRange.from, 'LLL dd, y')} - {format(dateRange.to, 'LLL dd, y')}
                    </> : format(dateRange.from, 'LLL dd, y') : <span>Filter by date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar initialFocus mode="range" defaultMonth={dateRange?.from} selected={dateRange} onSelect={setDateRange} numberOfMonths={2} />
            </PopoverContent>
          </Popover>

          {/* Payment Status Multi-select */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="min-w-[200px]">
                Payment Status ({selectedStatuses.length})
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56" align="start">
              <div className="space-y-2">
                {statusOptions.map(option => <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox id={option.value} checked={selectedStatuses.includes(option.value)} onCheckedChange={() => toggleStatus(option.value)} />
                    <label htmlFor={option.value} className="text-sm font-medium leading-none cursor-pointer">
                      {option.label}
                    </label>
                  </div>)}
              </div>
            </PopoverContent>
          </Popover>

          {dateRange && <Button variant="ghost" size="sm" onClick={() => setDateRange(undefined)}>
              Clear Date
            </Button>}
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground">
          Showing {filteredReservations.length} of {mockReservations.length} reservations
        </p>

        {/* Table View */}
        {viewMode === 'table' && <div className="border rounded-lg overflow-hidden">
            <Table className="bg-white">
              <TableHeader className="bg-accent">
                <TableRow className="bg-muted/50">
                  <TableHead>Reservation #</TableHead>
                  <TableHead>Guest Name</TableHead>
                  <TableHead className="text-right">Total Amount</TableHead>
                  <TableHead className="text-right">Advance</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                  <TableHead className="text-right">Pending</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReservations.map(reservation => <TableRow key={reservation.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{reservation.reservationNumber}</TableCell>
                    <TableCell>{reservation.guestName}</TableCell>
                    <TableCell className="text-right">₹{reservation.totalAmount.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-green-600">₹{reservation.advanceAmount.toLocaleString()}</TableCell>
                    <TableCell className="text-right">₹{reservation.balanceAmount.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-red-600">₹{reservation.pendingAmount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={statusConfig[reservation.settlementStatus].className}>
                        {statusConfig[reservation.settlementStatus].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="sm" onClick={() => handleViewDetails(reservation.id)}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>)}
                {filteredReservations.length === 0 && <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No reservations found matching your criteria
                    </TableCell>
                  </TableRow>}
              </TableBody>
            </Table>
          </div>}

        {/* Grid View */}
        {viewMode === 'grid' && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredReservations.map(reservation => <Card key={reservation.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-sm">{reservation.reservationNumber}</p>
                      <p className="text-base font-medium">{reservation.guestName}</p>
                    </div>
                    <Badge className={statusConfig[reservation.settlementStatus].className}>
                      {statusConfig[reservation.settlementStatus].label}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Amount:</span>
                      <span className="font-medium">₹{reservation.totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Advance:</span>
                      <span className="font-medium text-green-600">₹{reservation.advanceAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Balance:</span>
                      <span className="font-medium">₹{reservation.balanceAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pending:</span>
                      <span className="font-medium text-red-600">₹{reservation.pendingAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full" onClick={() => handleViewDetails(reservation.id)}>
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </CardContent>
              </Card>)}
            {filteredReservations.length === 0 && <div className="col-span-full text-center py-12 text-muted-foreground">
                No reservations found matching your criteria
              </div>}
          </div>}
      </div>
    </Layout>;
};
export default ReceiptListingPage;