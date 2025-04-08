
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, DollarSign, FileText, Receipt, CreditCard } from 'lucide-react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

interface PaymentInformationProps {
  paymentMode: string;
  setPaymentMode: (value: string) => void;
  paymentStatus: string;
  setPaymentStatus: (value: string) => void;
}

const PaymentInformation: React.FC<PaymentInformationProps> = ({
  paymentMode,
  setPaymentMode,
  paymentStatus,
  setPaymentStatus
}) => {
  const [activeTab, setActiveTab] = useState<string>("addReceipt");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [amount, setAmount] = useState<string>("");
  const [advanceAmount, setAdvanceAmount] = useState<string>("");
  const [balanceAmount, setBalanceAmount] = useState<string>("");
  const [invoiceNumber, setInvoiceNumber] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");
  const [reservationNumber, setReservationNumber] = useState<string>("");

  return (
    <Card className="shadow-sm border-border/40 fade-up delay-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="reservationNumber">Reservation No.</Label>
                <Input 
                  id="reservationNumber" 
                  placeholder="Enter reservation number" 
                  value={reservationNumber}
                  onChange={(e) => setReservationNumber(e.target.value)}
                  className="input-elegant"
                />
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <Label htmlFor="totalAmount">Total Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="totalAmount"
                  type="text"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-9 input-elegant"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="advancePayment">Advance Payment</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="advancePayment"
                    type="text"
                    placeholder="0.00"
                    value={advanceAmount}
                    onChange={(e) => setAdvanceAmount(e.target.value)}
                    className="pl-9 input-elegant"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="balancePayment">Balance Payment</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="balancePayment"
                    type="text"
                    placeholder="0.00"
                    value={balanceAmount}
                    onChange={(e) => setBalanceAmount(e.target.value)}
                    className="pl-9 input-elegant"
                  />
                </div>
              </div>
            </div>
            
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
                <Label htmlFor="remarks">Remarks</Label>
                <Input
                  id="remarks"
                  placeholder="Add any notes here"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="input-elegant"
                />
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button type="button" className="button-primary">
                Save Receipt
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="viewReceipt" className="pt-4">
            <div className="min-h-[200px] flex items-center justify-center border border-dashed rounded-md p-8 bg-muted/30">
              <div className="text-center">
                <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No receipts selected</h3>
                <p className="text-muted-foreground mb-4">Select a reservation to view its receipts</p>
                <Button variant="outline" onClick={() => setActiveTab("addReceipt")}>
                  Add New Receipt
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PaymentInformation;
