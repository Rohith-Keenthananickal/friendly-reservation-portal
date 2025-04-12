
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Search, Receipt, FileCheck, Download, Eye, Calendar, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock receipt data for demonstration
const mockReceipts = [
  {
    id: 'RCP-001',
    reservationId: 'RES-001',
    date: '2023-11-15',
    guestName: 'John Smith',
    address: '123 Main St, New York',
    email: 'john@example.com',
    phone: '555-123-4567',
    totalAmount: 12500,
    advanceAmount: 5000,
    balanceAmount: 7500,
    paymentMode: 'Cash',
    status: 'Paid',
    invoiceNo: 'INV-001',
    bookingMode: 'Agent',
  },
  {
    id: 'RCP-002',
    reservationId: 'RES-002',
    date: '2023-11-20',
    guestName: 'Sarah Johnson',
    address: '456 Park Ave, Boston',
    email: 'sarah@example.com',
    phone: '555-234-5678',
    totalAmount: 18700,
    advanceAmount: 10000,
    balanceAmount: 8700,
    paymentMode: 'Card',
    status: 'Paid',
    invoiceNo: 'INV-002',
    bookingMode: 'Company',
  },
  {
    id: 'RCP-003',
    reservationId: 'RES-003',
    date: '2023-11-22',
    guestName: 'Michael Brown',
    address: '789 Oak St, Chicago',
    email: 'mike@example.com',
    phone: '555-345-6789',
    totalAmount: 8500,
    advanceAmount: 3000,
    balanceAmount: 5500,
    paymentMode: 'UPI',
    status: 'Pending',
    invoiceNo: 'INV-003',
    bookingMode: 'Online',
  }
];

const ReceiptView = () => {
  const [activeTab, setActiveTab] = useState<string>("viewReceipt");
  const [searchReservation, setSearchReservation] = useState<string>("");
  const [filteredReceipts, setFilteredReceipts] = useState<typeof mockReceipts>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [selectedReceipt, setSelectedReceipt] = useState<(typeof mockReceipts)[0] | null>(null);
  const [showDetailView, setShowDetailView] = useState<boolean>(false);

  const handleSearch = () => {
    if (searchReservation.trim() === "") {
      setFilteredReceipts([]);
      setHasSearched(false);
      setShowDetailView(false);
      return;
    }
    
    const filtered = mockReceipts.filter(receipt => 
      receipt.reservationId.toLowerCase().includes(searchReservation.toLowerCase())
    );
    
    setFilteredReceipts(filtered);
    setHasSearched(true);
    setShowDetailView(false);
  };

  const viewReceiptDetail = (receipt: (typeof mockReceipts)[0]) => {
    setSelectedReceipt(receipt);
    setShowDetailView(true);
  };

  return (
    <div className="space-y-6 fade-up">
      <div className="flex items-center justify-between w-full mb-8">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-hotel-primary">Receipt Management</h1>
          <p className="text-muted-foreground mt-1">View and manage payment receipts</p>
        </div>
      </div>

      <Card className="border border-border/40 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Receipt className="h-5 w-5 text-primary" />
            Receipt Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="viewReceipt" value={activeTab} onValueChange={(val) => {
            setActiveTab(val);
            setShowDetailView(false);
          }} className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="viewReceipt" className="flex items-center gap-2">
                <FileCheck className="h-4 w-4" />
                View Receipt
              </TabsTrigger>
              <TabsTrigger value="addReceipt" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Add Receipt
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="viewReceipt" className="pt-6">
              {!showDetailView ? (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="w-full md:w-80">
                      <Label htmlFor="reservation-search">Search by Reservation ID</Label>
                      <div className="flex gap-2 mt-2">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="reservation-search"
                            placeholder="e.g. RES-001"
                            value={searchReservation}
                            onChange={(e) => setSearchReservation(e.target.value)}
                            className="pl-9 input-elegant"
                          />
                        </div>
                        <Button onClick={handleSearch} className="button-primary">
                          Search
                        </Button>
                      </div>
                    </div>
                  </div>

                  {hasSearched && (
                    <div className="mt-6">
                      {filteredReceipts.length > 0 ? (
                        <div className="rounded-md border shadow-sm overflow-hidden">
                          <Table>
                            <TableHeader className="bg-secondary/50">
                              <TableRow>
                                <TableHead className="font-medium">Receipt ID</TableHead>
                                <TableHead className="font-medium">Reservation ID</TableHead>
                                <TableHead className="font-medium">Guest Name</TableHead>
                                <TableHead className="font-medium">Date</TableHead>
                                <TableHead className="font-medium">Total Amount</TableHead>
                                <TableHead className="font-medium">Status</TableHead>
                                <TableHead className="font-medium">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredReceipts.map((receipt) => (
                                <TableRow key={receipt.id} className="hover:bg-secondary/30">
                                  <TableCell className="font-medium">{receipt.id}</TableCell>
                                  <TableCell>{receipt.reservationId}</TableCell>
                                  <TableCell>{receipt.guestName}</TableCell>
                                  <TableCell>{receipt.date}</TableCell>
                                  <TableCell>₹{receipt.totalAmount.toLocaleString()}</TableCell>
                                  <TableCell>
                                    <Badge variant={receipt.status === "Paid" ? "success" : "warning"}>
                                      {receipt.status}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex gap-2">
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                        onClick={() => viewReceiptDetail(receipt)}
                                        className="flex items-center gap-1"
                                      >
                                        <Eye className="h-3.5 w-3.5" />
                                        View
                                      </Button>
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                        className="flex items-center gap-1"
                                      >
                                        <Download className="h-3.5 w-3.5" />
                                        Download
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <div className="min-h-[200px] flex items-center justify-center border border-dashed rounded-md p-8 bg-muted/30">
                          <div className="text-center">
                            <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-medium mb-2">No receipts found</h3>
                            <p className="text-muted-foreground mb-4">
                              No receipts found for reservation ID: {searchReservation}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {!hasSearched && (
                    <div className="min-h-[200px] flex items-center justify-center border border-dashed rounded-md p-8 bg-muted/30">
                      <div className="text-center">
                        <Search className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Search for a reservation</h3>
                        <p className="text-muted-foreground mb-4">
                          Enter a reservation ID to view associated receipts
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowDetailView(false)}
                      className="mb-4"
                    >
                      ← Back to List
                    </Button>
                    <Button className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download Receipt
                    </Button>
                  </div>
                  
                  {selectedReceipt && (
                    <Card className="border">
                      <CardHeader className="bg-muted/30 pb-3">
                        <div className="flex justify-between">
                          <CardTitle className="text-xl">Receipt Details</CardTitle>
                          <Badge variant={selectedReceipt.status === "Paid" ? "success" : "warning"} className="text-sm py-1">
                            {selectedReceipt.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-lg font-medium mb-4">Reservation Details</h3>
                              <div className="grid grid-cols-2 gap-y-3">
                                <div className="text-muted-foreground">Reservation No:</div>
                                <div className="font-medium">{selectedReceipt.reservationId}</div>
                                
                                <div className="text-muted-foreground">Guest Name:</div>
                                <div className="font-medium">{selectedReceipt.guestName}</div>
                                
                                <div className="text-muted-foreground">Address:</div>
                                <div className="font-medium">{selectedReceipt.address}</div>
                                
                                <div className="text-muted-foreground">Email:</div>
                                <div className="font-medium">{selectedReceipt.email}</div>
                                
                                <div className="text-muted-foreground">Phone:</div>
                                <div className="font-medium">{selectedReceipt.phone}</div>
                                
                                <div className="text-muted-foreground">Booking Mode:</div>
                                <div className="font-medium">{selectedReceipt.bookingMode}</div>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="text-lg font-medium mb-4">Payment Summary</h3>
                              <div className="grid grid-cols-2 gap-y-3">
                                <div className="text-muted-foreground">Total Amount:</div>
                                <div className="font-medium">₹{selectedReceipt.totalAmount.toLocaleString()}</div>
                                
                                <div className="text-muted-foreground">Invoice No:</div>
                                <div className="font-medium">{selectedReceipt.invoiceNo}</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-lg font-medium mb-4">Advance Payment</h3>
                              <Card className="border p-4 bg-muted/20">
                                <div className="grid grid-cols-2 gap-y-3">
                                  <div className="text-muted-foreground">Receipt Date:</div>
                                  <div className="font-medium">{selectedReceipt.date}</div>
                                  
                                  <div className="text-muted-foreground">Payment Amount:</div>
                                  <div className="font-medium text-green-600">₹{selectedReceipt.advanceAmount.toLocaleString()}</div>
                                  
                                  <div className="text-muted-foreground">Payment Type:</div>
                                  <div className="font-medium">{selectedReceipt.paymentMode}</div>
                                  
                                  <div className="text-muted-foreground">Payment Status:</div>
                                  <Badge variant="success" className="w-fit">Paid</Badge>
                                </div>
                              </Card>
                            </div>
                            
                            <div>
                              <h3 className="text-lg font-medium mb-4">Balance Payment</h3>
                              <Card className="border p-4 bg-muted/20">
                                <div className="grid grid-cols-2 gap-y-3">
                                  <div className="text-muted-foreground">Receipt Date:</div>
                                  <div className="font-medium">{selectedReceipt.date}</div>
                                  
                                  <div className="text-muted-foreground">Payment Amount:</div>
                                  <div className="font-medium text-green-600">₹{selectedReceipt.balanceAmount.toLocaleString()}</div>
                                  
                                  <div className="text-muted-foreground">Payment Type:</div>
                                  <div className="font-medium">{selectedReceipt.paymentMode}</div>
                                  
                                  <div className="text-muted-foreground">Payment Status:</div>
                                  {selectedReceipt.status === "Paid" ? (
                                    <Badge variant="success" className="w-fit">Paid</Badge>
                                  ) : (
                                    <Badge variant="warning" className="w-fit">Pending</Badge>
                                  )}
                                </div>
                              </Card>
                            </div>
                            
                            <div className="pt-2">
                              <div className="flex justify-between items-center p-3 border rounded-md bg-muted/10">
                                <span className="font-semibold">Total Balance Amount:</span>
                                <span className={`text-lg font-bold ${selectedReceipt.status === "Paid" ? "text-green-600" : "text-amber-600"}`}>
                                  {selectedReceipt.status === "Paid" ? "₹0" : `₹${selectedReceipt.balanceAmount.toLocaleString()}`}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="addReceipt" className="pt-6">
              <div className="flex items-center justify-center">
                <Card className="w-full">
                  <CardContent className="pt-6">
                    <iframe 
                      src="/payment" 
                      className="w-full min-h-[600px] border-0" 
                      title="Payment Information"
                    ></iframe>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReceiptView;
