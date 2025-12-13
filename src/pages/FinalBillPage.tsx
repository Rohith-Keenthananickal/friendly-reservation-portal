import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Download, 
  Printer, 
  Mail,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { InvoiceHeader } from '@/components/FinalBill/InvoiceHeader';
import { GuestReservationInfo } from '@/components/FinalBill/GuestReservationInfo';
import { FinalBillTab } from '@/components/FinalBill/FinalBillTab';
import { ChargesBreakdownTab } from '@/components/FinalBill/ChargesBreakdownTab';
import { PaymentsReceiptsTab } from '@/components/FinalBill/PaymentsReceiptsTab';
import { TaxSummaryTab } from '@/components/FinalBill/TaxSummaryTab';
import { AuditTrailTab } from '@/components/FinalBill/AuditTrailTab';
import { InvoiceFooter } from '@/components/FinalBill/InvoiceFooter';

// Mock data for the final bill
const mockBillData = {
  bookingId: 'BKG-2024-001234',
  reservationId: 'RES-2024-001234',
  status: 'Checked-Out',
  
  // Hotel Details
  hotel: {
    name: 'Grand Palace Hotel',
    legalName: 'Grand Palace Hospitality Pvt. Ltd.',
    logo: '/placeholder.svg',
    address: '123 Marine Drive, Mumbai, Maharashtra 400001',
    phone: '+91 22 2288 8888',
    email: 'info@grandpalace.com',
    gstin: '27AABCG1234E1Z5',
  },
  
  // Invoice Details
  invoice: {
    number: 'INV-2024-000567',
    date: '2024-01-18',
    financialYear: '2024-25',
    placeOfSupply: 'Maharashtra',
    type: 'Tax Invoice',
  },
  
  // Guest Details
  guest: {
    name: 'John Smith',
    mobile: '+91 9876543210',
    email: 'john.smith@example.com',
    address: '456 Business Park, Bangalore, Karnataka 560001',
    company: 'ABC Corp Ltd.',
    gstin: '29ABCDE1234F1Z5',
  },
  
  // Reservation Details
  reservation: {
    checkIn: '2024-01-15',
    checkOut: '2024-01-18',
    nights: 3,
    rooms: ['101', '102'],
    roomTypes: ['Deluxe Room', 'Deluxe Room'],
    mealPlan: 'MAP',
    adults: 4,
    children: 1,
  },
  
  // Room Charges
  roomCharges: [
    { date: '2024-01-15', description: 'Deluxe Room 101', hsn: '996311', qty: 1, rate: 4500, amount: 4500 },
    { date: '2024-01-16', description: 'Deluxe Room 101', hsn: '996311', qty: 1, rate: 4500, amount: 4500 },
    { date: '2024-01-17', description: 'Deluxe Room 101', hsn: '996311', qty: 1, rate: 4500, amount: 4500 },
    { date: '2024-01-15', description: 'Deluxe Room 102', hsn: '996311', qty: 1, rate: 4500, amount: 4500 },
    { date: '2024-01-16', description: 'Deluxe Room 102', hsn: '996311', qty: 1, rate: 4500, amount: 4500 },
    { date: '2024-01-17', description: 'Deluxe Room 102', hsn: '996311', qty: 1, rate: 4500, amount: 4500 },
  ],
  
  // F&B Charges
  fbCharges: [
    { date: '2024-01-15', description: 'Breakfast - 4 pax', hsn: '996331', qty: 4, rate: 350, amount: 1400 },
    { date: '2024-01-15', description: 'Dinner - Restaurant', hsn: '996331', qty: 1, rate: 2500, amount: 2500 },
    { date: '2024-01-16', description: 'Breakfast - 4 pax', hsn: '996331', qty: 4, rate: 350, amount: 1400 },
    { date: '2024-01-16', description: 'Room Service - Lunch', hsn: '996331', qty: 1, rate: 1800, amount: 1800 },
    { date: '2024-01-17', description: 'Breakfast - 4 pax', hsn: '996331', qty: 4, rate: 350, amount: 1400 },
  ],
  
  // Additional Services
  additionalServices: [
    { date: '2024-01-15', description: 'Airport Pickup', hsn: '996411', qty: 1, rate: 1500, amount: 1500 },
    { date: '2024-01-16', description: 'Laundry Service', hsn: '998211', qty: 1, rate: 450, amount: 450 },
    { date: '2024-01-17', description: 'Spa Treatment', hsn: '999712', qty: 2, rate: 2000, amount: 4000 },
    { date: '2024-01-17', description: 'Extra Bed', hsn: '996311', qty: 3, rate: 500, amount: 1500 },
  ],
  
  // Discounts
  discounts: [
    { name: 'Corporate Discount (10%)', amount: 2700, reason: 'ABC Corp partnership discount' },
    { name: 'Long Stay Bonus', amount: 500, reason: 'Complimentary for 3+ nights' },
  ],
  
  // Tax Summary
  taxes: [
    { chargeType: 'Room Charges', taxable: 27000, cgstRate: 6, cgst: 1620, sgstRate: 6, sgst: 1620, igst: 0 },
    { chargeType: 'F&B Charges', taxable: 8500, cgstRate: 2.5, cgst: 212.5, sgstRate: 2.5, sgst: 212.5, igst: 0 },
    { chargeType: 'Services', taxable: 7450, cgstRate: 9, cgst: 670.5, sgstRate: 9, sgst: 670.5, igst: 0 },
  ],
  
  // Payments
  payments: [
    { date: '2024-01-10', receiptNo: 'RCP-001234', type: 'Advance', mode: 'UPI', txnRef: 'UPI123456789', collectedBy: 'Rahul', amount: 15000 },
    { date: '2024-01-15', receiptNo: 'RCP-001235', type: 'Partial', mode: 'Card', txnRef: 'CARD987654', collectedBy: 'Priya', amount: 20000 },
    { date: '2024-01-18', receiptNo: 'RCP-001236', type: 'Balance', mode: 'Cash', txnRef: '-', collectedBy: 'Rahul', amount: 14006 },
  ],
  
  // Audit Trail
  audit: [
    { action: 'Invoice Created', by: 'System', date: '2024-01-18 11:30:00', notes: 'Auto-generated on checkout' },
    { action: 'Payment Recorded', by: 'Rahul', date: '2024-01-18 11:25:00', notes: 'Final balance payment received' },
    { action: 'Check-out Processed', by: 'Rahul', date: '2024-01-18 11:00:00', notes: 'Guest checked out' },
    { action: 'Discount Applied', by: 'Manager', date: '2024-01-17 16:00:00', notes: 'Corporate discount verified' },
  ],
  
  // Summary
  summary: {
    subTotal: 42950,
    totalDiscount: 3200,
    taxableAmount: 39750,
    totalGst: 5006,
    grandTotal: 49006,
    totalPaid: 49006,
    balance: 0,
  },
};

const FinalBillPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('final-bill');
  
  const bill = mockBillData;

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'Checked-In': 'bg-green-100 text-green-800 border-green-200',
      'Checked-Out': 'bg-blue-100 text-blue-800 border-blue-200',
      'Invoiced': 'bg-purple-100 text-purple-800 border-purple-200',
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  const handleDownload = () => {
    toast({ title: 'Downloading Invoice', description: 'Invoice PDF is being generated...' });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    toast({ title: 'Email Sent', description: 'Invoice has been sent to guest email.' });
  };

  return (
    <Layout>
      <div className="space-y-6 fade-up print:space-y-4">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 pb-4 border-b print:static print:border-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="print:hidden">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-semibold text-foreground">Final Bill / Guest Folio</h1>
                  <Badge variant="outline" className={getStatusBadge(bill.status)}>
                    {bill.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-1">
                  Booking ID: {bill.bookingId} • Invoice: {bill.invoice.number}
                </p>
              </div>
            </div>
            <div className="flex gap-2 print:hidden">
              <Button variant="outline" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" onClick={handleEmail}>
                <Mail className="h-4 w-4 mr-2" />
                Email Invoice
              </Button>
            </div>
          </div>
        </div>

        {/* Invoice Header */}
        <InvoiceHeader hotel={bill.hotel} invoice={bill.invoice} />

        {/* Guest & Reservation Details */}
        <GuestReservationInfo guest={bill.guest} reservation={bill.reservation} reservationId={bill.reservationId} />

        {/* Tabbed Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="print:hidden">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="final-bill">Final Bill</TabsTrigger>
            <TabsTrigger value="charges">Charges Breakdown</TabsTrigger>
            <TabsTrigger value="payments">Payments & Receipts</TabsTrigger>
            <TabsTrigger value="tax">Tax Summary</TabsTrigger>
            <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          </TabsList>

          <TabsContent value="final-bill" className="mt-6">
            <FinalBillTab 
              roomCharges={bill.roomCharges}
              fbCharges={bill.fbCharges}
              additionalServices={bill.additionalServices}
              discounts={bill.discounts}
              taxes={bill.taxes}
              summary={bill.summary}
            />
          </TabsContent>

          <TabsContent value="charges" className="mt-6">
            <ChargesBreakdownTab 
              roomCharges={bill.roomCharges}
              fbCharges={bill.fbCharges}
              additionalServices={bill.additionalServices}
            />
          </TabsContent>

          <TabsContent value="payments" className="mt-6">
            <PaymentsReceiptsTab 
              payments={bill.payments}
              summary={bill.summary}
            />
          </TabsContent>

          <TabsContent value="tax" className="mt-6">
            <TaxSummaryTab taxes={bill.taxes} />
          </TabsContent>

          <TabsContent value="audit" className="mt-6">
            <AuditTrailTab audit={bill.audit} />
          </TabsContent>
        </Tabs>

        {/* Print-only: Show Final Bill content */}
        <div className="hidden print:block">
          <FinalBillTab 
            roomCharges={bill.roomCharges}
            fbCharges={bill.fbCharges}
            additionalServices={bill.additionalServices}
            discounts={bill.discounts}
            taxes={bill.taxes}
            summary={bill.summary}
          />
        </div>

        {/* Invoice Footer */}
        <InvoiceFooter />
      </div>
    </Layout>
  );
};

export default FinalBillPage;
