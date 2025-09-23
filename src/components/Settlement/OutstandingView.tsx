import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DatePickerWithRange } from '@/components/Reservation/DatePickerWithRange';
import { Download, AlertTriangle, CreditCard } from 'lucide-react';
import { DateRange } from 'react-day-picker';

// Mock data for outstanding payments
const outstandingData = {
  'Agent': [
    {
      agentName: 'Travel Pro Agency',
      bookings: [
        {
          id: 1,
          slNo: 1,
          checkInDate: '2024-01-15',
          checkOutDate: '2024-01-18',
          guestName: 'John Smith',
          reservationNumber: 'RES001',
          bookingMode: 'Agent',
          companyName: 'Travel Pro Agency',
          pendingAmount: 5000,
          paymentStatus: 'Pending',
          paymentTransactionDate: '2024-01-20'
        }
      ]
    },
    {
      agentName: 'Holiday Makers',
      bookings: [
        {
          id: 2,
          slNo: 2,
          checkInDate: '2024-01-22',
          checkOutDate: '2024-01-25',
          guestName: 'Alice Brown',
          reservationNumber: 'RES006',
          bookingMode: 'Agent',
          companyName: 'Holiday Makers',
          pendingAmount: 8000,
          paymentStatus: 'Pending',
          paymentTransactionDate: null
        }
      ]
    }
  ],
  'Access Rooms': [
    {
      agentName: 'Access Rooms Portal',
      bookings: [
        {
          id: 3,
          slNo: 3,
          checkInDate: '2024-01-25',
          checkOutDate: '2024-01-28',
          guestName: 'Mike Wilson',
          reservationNumber: 'RES003',
          bookingMode: 'Access Rooms',
          companyName: 'Access Rooms Portal',
          pendingAmount: 8000,
          paymentStatus: 'Partial',
          paymentTransactionDate: '2024-01-26'
        }
      ]
    }
  ],
  'Company': [
    {
      agentName: 'Tech Corp Ltd',
      bookings: [
        {
          id: 4,
          slNo: 4,
          checkInDate: '2024-02-05',
          checkOutDate: '2024-02-08',
          guestName: 'David Brown',
          reservationNumber: 'RES005',
          bookingMode: 'Company',
          companyName: 'Tech Corp Ltd',
          pendingAmount: 15000,
          paymentStatus: 'Pending',
          paymentTransactionDate: null
        }
      ]
    }
  ]
};

const OutstandingView = () => {
  const [selectedMode, setSelectedMode] = useState('Agent');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return <Badge className="status-paid border">Paid</Badge>;
      case 'Pending':
        return <Badge className="status-pending border">Pending</Badge>;
      case 'Partial':
        return <Badge className="status-partial border">Partial</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const currentData = outstandingData[selectedMode as keyof typeof outstandingData] || [];
  const totalPending = currentData.reduce((sum, agent) => 
    sum + agent.bookings.reduce((bookingSum, booking) => bookingSum + booking.pendingAmount, 0), 0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
            Outstanding Payments
          </h2>
          <p className="text-muted-foreground">Manage and track pending payments by booking mode</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="card-elegant">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Booking Mode</label>
              <Select value={selectedMode} onValueChange={setSelectedMode}>
                <SelectTrigger>
                  <SelectValue placeholder="Select booking mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Agent">Agent</SelectItem>
                  <SelectItem value="Access Rooms">Access Rooms</SelectItem>
                  <SelectItem value="Company">Company</SelectItem>
                  <SelectItem value="Direct">Direct</SelectItem>
                  <SelectItem value="OTA">OTA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Date Range</label>
              <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            </div>

            <div className="flex items-end">
              <Button className="w-full">Apply Filters</Button>
            </div>

            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card className="card-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-orange-600" />
            Outstanding Summary - {selectedMode}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="text-sm text-muted-foreground">Total Pending Amount</div>
              <div className="text-2xl font-bold text-orange-600">{formatCurrency(totalPending)}</div>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="text-sm text-muted-foreground">Agents/Companies</div>
              <div className="text-2xl font-bold text-red-600">{currentData.length}</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-sm text-muted-foreground">Pending Bookings</div>
              <div className="text-2xl font-bold text-blue-600">
                {currentData.reduce((sum, agent) => sum + agent.bookings.length, 0)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Outstanding Payments by Agent/Company */}
      {currentData.map((agentData, agentIndex) => (
        <Card key={agentIndex} className="card-elegant">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {agentData.agentName}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {agentData.bookings.length} pending booking(s)
                </span>
              </div>
              <div className="text-lg font-bold text-orange-600">
                {formatCurrency(agentData.bookings.reduce((sum, b) => sum + b.pendingAmount, 0))}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>SL No</TableHead>
                    <TableHead>Check-in Date</TableHead>
                    <TableHead>Check-out Date</TableHead>
                    <TableHead>Guest Name</TableHead>
                    <TableHead>Reservation Number</TableHead>
                    <TableHead>Booking Mode</TableHead>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Pending Amount</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Transaction Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agentData.bookings.map((booking) => (
                    <TableRow key={booking.id} className="hover:bg-muted/30">
                      <TableCell className="font-medium">{booking.slNo}</TableCell>
                      <TableCell className="text-sm">{formatDate(booking.checkInDate)}</TableCell>
                      <TableCell className="text-sm">{formatDate(booking.checkOutDate)}</TableCell>
                      <TableCell>
                        <div className="font-medium">{booking.guestName}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-mono text-sm bg-muted px-2 py-1 rounded">
                          {booking.reservationNumber}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{booking.bookingMode}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{booking.companyName}</TableCell>
                      <TableCell>
                        <span className="text-red-600 font-medium">{formatCurrency(booking.pendingAmount)}</span>
                      </TableCell>
                      <TableCell>{getStatusBadge(booking.paymentStatus)}</TableCell>
                      <TableCell className="text-sm">{formatDate(booking.paymentTransactionDate)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ))}

      {currentData.length === 0 && (
        <Card className="card-elegant">
          <CardContent className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">No Outstanding Payments</h3>
            <p className="text-sm text-muted-foreground">No pending payments found for {selectedMode} bookings.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OutstandingView;