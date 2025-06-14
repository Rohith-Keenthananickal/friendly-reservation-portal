
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Search, 
  Filter, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  Check, 
  FileText,
  Edit,
  Calendar
} from 'lucide-react';

// Mock data for settlement
const mockSettlementData = [
  {
    id: "SET-001",
    guestName: "John Smith",
    checkOutDate: "2023-11-18",
    roomType: "Deluxe",
    totalAmount: 3000,
    paymentStatus: "paid",
    isVerified: true,
    transactionId: "khy7757599",
    bookingMode: "Company",
    paymentMode: "Gateway",
    advancePayment: 900, // 30%
    commission: 300, // 10%
    payAfterCommission: 600,
    balancePayment: 2100,
    hasPaymentSlip: true,
    adminNotes: "Payment verified successfully"
  },
  {
    id: "SET-002",
    guestName: "Alice Johnson",
    checkOutDate: "2023-11-25",
    roomType: "Super Deluxe",
    totalAmount: 4500,
    paymentStatus: "pending",
    isVerified: false,
    transactionId: null,
    bookingMode: "Direct",
    paymentMode: "Cash",
    advancePayment: 1350,
    commission: 450,
    payAfterCommission: 900,
    balancePayment: 3150,
    hasPaymentSlip: false,
    adminNotes: ""
  },
  {
    id: "SET-003",
    guestName: "Robert Brown",
    checkOutDate: "2023-11-24",
    roomType: "Standard",
    totalAmount: 2500,
    paymentStatus: "paid",
    isVerified: true,
    transactionId: "abc1234567",
    bookingMode: "Agent",
    paymentMode: "UPI",
    advancePayment: 750,
    commission: 250,
    payAfterCommission: 500,
    balancePayment: 1750,
    hasPaymentSlip: true,
    adminNotes: "Agent booking confirmed"
  }
];

const SettlementView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [modeFilter, setModeFilter] = useState("all");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  // Filter data based on search and filters
  const filteredData = mockSettlementData.filter(item => {
    const matchesSearch = 
      item.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || item.paymentStatus === statusFilter;
    const matchesPayment = paymentFilter === "all" || item.paymentMode.toLowerCase() === paymentFilter;
    const matchesMode = modeFilter === "all" || item.bookingMode.toLowerCase() === modeFilter;
    
    return matchesSearch && matchesStatus && matchesPayment && matchesMode;
  });

  const toggleRowExpansion = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const getPaymentBadgeVariant = (status: string) => {
    switch(status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleExportExcel = () => {
    console.log("Exporting to Excel...");
    // Implementation for Excel export would go here
  };

  const handleVerifyPayment = (id: string) => {
    console.log(`Verifying payment for ${id}`);
    // Implementation for payment verification would go here
  };

  const handleViewSlip = (id: string) => {
    console.log(`Viewing payment slip for ${id}`);
    // Implementation for viewing payment slip would go here
  };

  return (
    <div className="space-y-6 fade-up">
      <div className="flex items-center justify-between w-full mb-8">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-hotel-primary">Access Rooms Booking Settlement</h1>
          <p className="text-muted-foreground mt-1">Manage and track booking settlements</p>
        </div>
        <Button onClick={handleExportExcel} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Excel
        </Button>
      </div>

      <Card className="border border-border/40 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Settlement
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-muted/20 rounded-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by guest name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-background"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="w-[140px]">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-background">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="All Status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-[140px]">
                <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                  <SelectTrigger className="bg-background">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="All Payments" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Payments</SelectItem>
                    <SelectItem value="gateway">Gateway</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-[140px]">
                <Select value={modeFilter} onValueChange={setModeFilter}>
                  <SelectTrigger className="bg-background">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="All Modes" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Modes</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                    <SelectItem value="direct">Direct</SelectItem>
                    <SelectItem value="agent">Agent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button variant="outline" size="sm">
                Clear All
              </Button>
            </div>
          </div>
          
          {/* Main Table */}
          <div className="rounded-md border shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-secondary/50">
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead className="font-medium">Guest Name</TableHead>
                  <TableHead className="font-medium">Check-out Date</TableHead>
                  <TableHead className="font-medium">Room Type</TableHead>
                  <TableHead className="font-medium">Total Amount</TableHead>
                  <TableHead className="font-medium">Payment Status</TableHead>
                  <TableHead className="font-medium">Transaction ID</TableHead>
                  <TableHead className="font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <React.Fragment key={item.id}>
                    <TableRow className="hover:bg-secondary/30">
                      <TableCell>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleRowExpansion(item.id)}
                          >
                            {expandedRows.has(item.id) ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                      </TableCell>
                      <TableCell className="font-medium">{item.guestName}</TableCell>
                      <TableCell>{formatDate(item.checkOutDate)}</TableCell>
                      <TableCell>{item.roomType}</TableCell>
                      <TableCell>₹{item.totalAmount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={getPaymentBadgeVariant(item.paymentStatus)}>
                          {item.paymentStatus.charAt(0).toUpperCase() + item.paymentStatus.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {item.transactionId ? (
                          <button className="text-blue-600 hover:underline font-mono text-sm">
                            {item.transactionId}
                          </button>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {!item.isVerified && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleVerifyPayment(item.id)}
                              className="text-green-600 border-green-600 hover:bg-green-50"
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Verify
                            </Button>
                          )}
                          {item.hasPaymentSlip && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewSlip(item.id)}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              Slip
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                    
                    {/* Advanced View - Expandable Content */}
                    <TableRow className={expandedRows.has(item.id) ? "" : "hidden"}>
                      <TableCell colSpan={8} className="p-0">
                        <Collapsible open={expandedRows.has(item.id)}>
                          <CollapsibleContent>
                            <div className="p-6 bg-muted/20 border-t">
                              <h4 className="font-medium mb-4 text-lg">Advanced Details</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="space-y-4">
                                  <h5 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Booking Information</h5>
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span className="text-sm">Booking Mode:</span>
                                      <span className="text-sm font-medium">{item.bookingMode}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm">Payment Mode:</span>
                                      <span className="text-sm font-medium">{item.paymentMode}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="space-y-4">
                                  <h5 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Payment Breakdown</h5>
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span className="text-sm">Advance @ Payment Gateway (30%):</span>
                                      <span className="text-sm font-medium">₹{item.advancePayment.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm">Access Rooms Commission (10%):</span>
                                      <span className="text-sm font-medium">₹{item.commission.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm">Pay @ Property after Commission:</span>
                                      <span className="text-sm font-medium">₹{item.payAfterCommission.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between border-t pt-2">
                                      <span className="text-sm font-medium">Balance Payment:</span>
                                      <span className="text-sm font-medium">₹{item.balancePayment.toLocaleString()}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="space-y-4">
                                  <h5 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Actions & Notes</h5>
                                  <div className="space-y-3">
                                    {item.hasPaymentSlip && (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleViewSlip(item.id)}
                                        className="w-full justify-start"
                                      >
                                        <FileText className="h-4 w-4 mr-2" />
                                        View Payment Slip
                                      </Button>
                                    )}
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">Admin Notes:</label>
                                      <div className="flex gap-2">
                                        <Input
                                          placeholder="Add notes..."
                                          defaultValue={item.adminNotes}
                                          className="text-sm"
                                        />
                                        <Button size="sm" variant="outline">
                                          <Edit className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredData.length} of {mockSettlementData.length} settlements
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

export default SettlementView;
