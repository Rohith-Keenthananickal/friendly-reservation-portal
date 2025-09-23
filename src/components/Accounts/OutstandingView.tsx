import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

// Mock data for outstanding payments
const mockOutstandingData = {
  agent: [
    {
      slNo: 1,
      checkInDate: '2024-01-15',
      checkOutDate: '2024-01-17',
      guestName: 'John Doe',
      reservationNumber: 'RES001',
      bookingMode: 'Agent',
      companyName: 'Travel Pro',
      pendingAmount: 15000,
      paymentStatus: 'Pending',
      paymentTransactionDate: '-'
    }
  ],
  'access-rooms': [
    {
      slNo: 1,
      checkInDate: '2024-01-18',
      checkOutDate: '2024-01-20',
      guestName: 'Jane Smith',
      reservationNumber: 'RES002',
      bookingMode: 'Access Rooms',
      companyName: 'Access Rooms',
      pendingAmount: 8000,
      paymentStatus: 'Partial',
      paymentTransactionDate: '2024-01-18'
    }
  ],
  company: [
    {
      slNo: 1,
      checkInDate: '2024-01-20',
      checkOutDate: '2024-01-22',
      guestName: 'Mike Wilson',
      reservationNumber: 'RES003',
      bookingMode: 'Company',
      companyName: 'TechCorp Ltd',
      pendingAmount: 22000,
      paymentStatus: 'Pending',
      paymentTransactionDate: '-'
    }
  ],
  direct: [],
  ota: []
};

const OutstandingView: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState('');
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Partial':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getFilteredData = () => {
    if (!selectedMode) return [];
    return mockOutstandingData[selectedMode as keyof typeof mockOutstandingData] || [];
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Link to="/accounts/settlement/payment">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Payment
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-semibold">Outstanding Payments</h1>
              <p className="text-muted-foreground">View and manage pending payments</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select value={selectedMode} onValueChange={setSelectedMode}>
            <SelectTrigger>
              <SelectValue placeholder="Select Booking Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="agent">Agent</SelectItem>
              <SelectItem value="access-rooms">Access Rooms</SelectItem>
              <SelectItem value="company">Company</SelectItem>
              <SelectItem value="direct">Direct</SelectItem>
              <SelectItem value="ota">OTA</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !dateRange.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd")} - {format(dateRange.to, "LLL dd")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Custom Date Range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={{ from: dateRange.from, to: dateRange.to }}
                onSelect={(range) => setDateRange(range || {})}
                numberOfMonths={2}
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </Card>

      {selectedMode && (
        <Card>
          <CardHeader>
            <CardTitle>
              Outstanding Payments - {selectedMode.replace('-', ' ').toUpperCase()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {getFilteredData().length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>SL No</TableHead>
                      <TableHead>Check-in Date</TableHead>
                      <TableHead>Check-out Date</TableHead>
                      <TableHead>Guest Name</TableHead>
                      <TableHead>Reservation Number</TableHead>
                      <TableHead>Booking Mode</TableHead>
                      <TableHead>Company Name</TableHead>
                      <TableHead>Pending Amount</TableHead>
                      <TableHead>Payment Status</TableHead>
                      <TableHead>Payment Transaction Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredData().map((payment) => (
                      <TableRow key={payment.slNo}>
                        <TableCell>{payment.slNo}</TableCell>
                        <TableCell>{payment.checkInDate}</TableCell>
                        <TableCell>{payment.checkOutDate}</TableCell>
                        <TableCell className="font-medium">{payment.guestName}</TableCell>
                        <TableCell>{payment.reservationNumber}</TableCell>
                        <TableCell>{payment.bookingMode}</TableCell>
                        <TableCell>{payment.companyName}</TableCell>
                        <TableCell className="font-semibold">₹{payment.pendingAmount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={getPaymentStatusColor(payment.paymentStatus)}>
                            {payment.paymentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>{payment.paymentTransactionDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No outstanding payments found for {selectedMode.replace('-', ' ')}.
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {!selectedMode && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">Please select a booking mode to view outstanding payments.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OutstandingView;