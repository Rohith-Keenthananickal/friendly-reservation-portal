
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, DollarSign, Receipt, CreditCard, FileText, ArrowRight, Save } from 'lucide-react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';

const PaymentPage = () => {
  // Initialize state
  const [paymentMode, setPaymentMode] = React.useState<string>("cash");
  const [paymentStatus, setPaymentStatus] = React.useState<string>("pending");
  const [paymentType, setPaymentType] = React.useState<string>("full");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [guestName, setGuestName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<string>("");
  const [advanceAmount, setAdvanceAmount] = useState<string>("");
  const [balanceAmount, setBalanceAmount] = useState<string>("");
  const [invoiceNumber, setInvoiceNumber] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");
  const [reservationNumber, setReservationNumber] = useState<string>("");
  const [bookingMode, setBookingMode] = useState<string>("agent");
  const [showGuestDetails, setShowGuestDetails] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("addReceipt");

  // Handle recalculation of balance when amounts change
  React.useEffect(() => {
    if (totalAmount && advanceAmount) {
      const total = parseFloat(totalAmount) || 0;
      const advance = parseFloat(advanceAmount) || 0;
      setBalanceAmount((total - advance).toString());
    }
  }, [totalAmount, advanceAmount]);

  // Handle the search for reservation
  const handleSearchReservation = () => {
    if (reservationNumber) {
      setShowGuestDetails(true);
      // In a real app, this would fetch the reservation details from the API
      setGuestName("John Doe");
      setAddress("123 Main St, Anytown");
      setEmail("john@example.com");
      setPhone("555-123-4567");
      setTotalAmount("15000");
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <Card className="border border-border/40 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Receipt className="h-5 w-5 text-primary" />
            Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="addReceipt" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="addReceipt" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Add Receipt
              </TabsTrigger>
              <TabsTrigger value="viewReceipt" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                View Receipt
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="addReceipt" className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="reservationNumber">Reservation No.</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="reservationNumber" 
                      placeholder="Enter reservation number" 
                      value={reservationNumber}
                      onChange={(e) => setReservationNumber(e.target.value)}
                      className="input-elegant"
                    />
                    <Button 
                      className="button-primary"
                      onClick={handleSearchReservation}
                    >
                      Search
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="receiptDate">Receipt Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal input-elegant"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {date ? format(date, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              {showGuestDetails && (
                <Card className="border p-4 bg-muted/20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-lg mb-3">Guest Information</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 items-center">
                          <Label>Guest Name:</Label>
                          <div className="col-span-2 font-medium">{guestName}</div>
                        </div>
                        <div className="grid grid-cols-3 items-center">
                          <Label>Address:</Label>
                          <div className="col-span-2 font-medium">{address}</div>
                        </div>
                        <div className="grid grid-cols-3 items-center">
                          <Label>Email:</Label>
                          <div className="col-span-2 font-medium">{email}</div>
                        </div>
                        <div className="grid grid-cols-3 items-center">
                          <Label>Phone:</Label>
                          <div className="col-span-2 font-medium">{phone}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-lg mb-3">Booking Information</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="bookingMode">Booking Mode</Label>
                          <Select value={bookingMode} onValueChange={setBookingMode}>
                            <SelectTrigger className="input-elegant" id="bookingMode">
                              <SelectValue placeholder="Select booking mode" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="agent">Agent</SelectItem>
                              <SelectItem value="company">Company</SelectItem>
                              <SelectItem value="online">Online (OTA)</SelectItem>
                              <SelectItem value="direct">Direct</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="grid grid-cols-3 items-center">
                          <Label>Total Amount:</Label>
                          <div className="col-span-2 font-medium text-lg">₹{totalAmount}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="paymentType">Payment Type</Label>
                  <Select value={paymentType} onValueChange={setPaymentType}>
                    <SelectTrigger className="input-elegant" id="paymentType">
                      <SelectValue placeholder="Select payment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full Payment</SelectItem>
                      <SelectItem value="advance">Advance Payment</SelectItem>
                      <SelectItem value="balance">Balance Payment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="paymentMode">Payment Mode</Label>
                  <Select value={paymentMode} onValueChange={setPaymentMode}>
                    <SelectTrigger className="input-elegant" id="paymentMode">
                      <SelectValue placeholder="Select payment mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="upi">UPI</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="cheque">Cheque</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {(paymentType === "full" || paymentType === "advance") && (
                <div className="space-y-2">
                  <Label htmlFor="advanceAmount">
                    {paymentType === "full" ? "Total Amount" : "Advance Amount"}
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="advanceAmount"
                      type="text"
                      placeholder="0.00"
                      value={advanceAmount}
                      onChange={(e) => setAdvanceAmount(e.target.value)}
                      className="pl-9 input-elegant"
                    />
                  </div>
                </div>
              )}
              
              {paymentType === "balance" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="balanceAmount">Balance Amount</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="balanceAmount"
                        type="text"
                        placeholder="0.00"
                        value={balanceAmount}
                        onChange={(e) => setBalanceAmount(e.target.value)}
                        className="pl-9 input-elegant"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="invoiceNumber">Invoice No.</Label>
                  <Input
                    id="invoiceNumber"
                    placeholder="Enter invoice number"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className="input-elegant"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="paymentStatus">Payment Status</Label>
                  <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                    <SelectTrigger className="input-elegant" id="paymentStatus">
                      <SelectValue placeholder="Select payment status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="partial">Partial</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="remarks">Remarks</Label>
                <Textarea
                  id="remarks"
                  placeholder="Add any notes here"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="min-h-[80px] input-elegant"
                />
              </div>
              
              {paymentType !== "full" && (
                <div className="bg-muted/30 rounded-md p-4 border border-dashed">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Payment Summary</h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        {paymentType === "advance" 
                          ? "Advance payment will be recorded, balance will be pending." 
                          : "Balance payment will be recorded, marking the reservation as fully paid."}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Total Amount</div>
                      <div className="text-lg font-medium">₹{totalAmount || "0.00"}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="p-3 bg-muted/40 rounded-md border">
                      <div className="text-sm text-muted-foreground">Advance</div>
                      <div className="font-medium">₹{advanceAmount || "0.00"}</div>
                    </div>
                    <div className="p-3 bg-muted/40 rounded-md border">
                      <div className="text-sm text-muted-foreground">Balance</div>
                      <div className="font-medium">₹{balanceAmount || "0.00"}</div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end pt-4">
                <Button type="button" className="button-primary flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Receipt
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="viewReceipt" className="pt-4">
              <div className="min-h-[200px] flex items-center justify-center border border-dashed rounded-md p-8 bg-muted/30">
                <div className="text-center">
                  <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No receipts selected</h3>
                  <p className="text-muted-foreground mb-4">Go to the View Receipt tab to see receipt details</p>
                  <Button variant="outline" onClick={() => setActiveTab("addReceipt")}>
                    Add New Receipt
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentPage;
