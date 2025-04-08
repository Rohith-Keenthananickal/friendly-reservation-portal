
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Search, Receipt, FileCheck } from 'lucide-react';

// Mock receipt data for demonstration
const mockReceipts = [
  {
    id: 'RCP-001',
    reservationId: 'RES-001',
    date: '2023-11-15',
    amount: 12500,
    paymentMode: 'Cash',
    status: 'Paid',
    invoiceNo: 'INV-001'
  },
  {
    id: 'RCP-002',
    reservationId: 'RES-002',
    date: '2023-11-20',
    amount: 18700,
    paymentMode: 'Card',
    status: 'Paid',
    invoiceNo: 'INV-002'
  },
  {
    id: 'RCP-003',
    reservationId: 'RES-003',
    date: '2023-11-22',
    amount: 8500,
    paymentMode: 'UPI',
    status: 'Partial',
    invoiceNo: 'INV-003'
  }
];

const ReceiptView = () => {
  const [activeTab, setActiveTab] = useState<string>("viewReceipt");
  const [searchReservation, setSearchReservation] = useState<string>("");
  const [filteredReceipts, setFilteredReceipts] = useState<typeof mockReceipts>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSearch = () => {
    if (searchReservation.trim() === "") {
      setFilteredReceipts([]);
      setHasSearched(false);
      return;
    }
    
    const filtered = mockReceipts.filter(receipt => 
      receipt.reservationId.toLowerCase().includes(searchReservation.toLowerCase())
    );
    
    setFilteredReceipts(filtered);
    setHasSearched(true);
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
          <Tabs defaultValue="viewReceipt" value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                              <TableHead className="font-medium">Date</TableHead>
                              <TableHead className="font-medium">Amount</TableHead>
                              <TableHead className="font-medium">Payment Mode</TableHead>
                              <TableHead className="font-medium">Status</TableHead>
                              <TableHead className="font-medium">Invoice No.</TableHead>
                              <TableHead className="font-medium">Action</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredReceipts.map((receipt) => (
                              <TableRow key={receipt.id} className="hover:bg-secondary/30">
                                <TableCell className="font-medium">{receipt.id}</TableCell>
                                <TableCell>{receipt.reservationId}</TableCell>
                                <TableCell>{receipt.date}</TableCell>
                                <TableCell>₹{receipt.amount.toLocaleString()}</TableCell>
                                <TableCell>{receipt.paymentMode}</TableCell>
                                <TableCell>{receipt.status}</TableCell>
                                <TableCell>{receipt.invoiceNo}</TableCell>
                                <TableCell>
                                  <Button size="sm" variant="outline">
                                    View
                                  </Button>
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
