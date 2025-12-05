import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

type PaymentType = 'ADVANCE' | 'BALANCE' | 'FULL';
type PaymentMode = 'CASH' | 'CARD' | 'ONLINE' | 'UPI' | 'BANK_TRANSFER';

interface AddReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ReceiptFormData) => void;
  reservationNumber: string;
  pendingAmount: number;
}

interface ReceiptFormData {
  paymentType: PaymentType;
  amount: number;
  paymentMode: PaymentMode;
  paidBy: string;
  transactionNumber: string;
  invoiceNumber: string;
  paymentDate: Date;
  remarks: string;
}

const AddReceiptModal: React.FC<AddReceiptModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  reservationNumber,
  pendingAmount,
}) => {
  const [formData, setFormData] = useState<ReceiptFormData>({
    paymentType: 'BALANCE',
    amount: pendingAmount,
    paymentMode: 'CASH',
    paidBy: '',
    transactionNumber: '',
    invoiceNumber: `INV-${Date.now()}`,
    paymentDate: new Date(),
    remarks: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form
    setFormData({
      paymentType: 'BALANCE',
      amount: pendingAmount,
      paymentMode: 'CASH',
      paidBy: '',
      transactionNumber: '',
      invoiceNumber: `INV-${Date.now()}`,
      paymentDate: new Date(),
      remarks: '',
    });
  };

  const updateField = <K extends keyof ReceiptFormData>(
    field: K,
    value: ReceiptFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Receipt - {reservationNumber}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Payment Type */}
            <div className="space-y-2">
              <Label htmlFor="paymentType">Payment Type</Label>
              <Select
                value={formData.paymentType}
                onValueChange={(value: PaymentType) => updateField('paymentType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADVANCE">Advance</SelectItem>
                  <SelectItem value="BALANCE">Balance</SelectItem>
                  <SelectItem value="FULL">Full Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => updateField('amount', Number(e.target.value))}
                placeholder="Enter amount"
                max={pendingAmount}
              />
              <p className="text-xs text-muted-foreground">
                Pending: ₹{pendingAmount.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Payment Mode */}
            <div className="space-y-2">
              <Label htmlFor="paymentMode">Payment Mode</Label>
              <Select
                value={formData.paymentMode}
                onValueChange={(value: PaymentMode) => updateField('paymentMode', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CASH">Cash</SelectItem>
                  <SelectItem value="CARD">Card</SelectItem>
                  <SelectItem value="ONLINE">Online</SelectItem>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Payment Date */}
            <div className="space-y-2">
              <Label>Payment Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !formData.paymentDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.paymentDate
                      ? format(formData.paymentDate, 'PPP')
                      : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.paymentDate}
                    onSelect={(date) => date && updateField('paymentDate', date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Paid By */}
          <div className="space-y-2">
            <Label htmlFor="paidBy">Paid By</Label>
            <Input
              id="paidBy"
              value={formData.paidBy}
              onChange={(e) => updateField('paidBy', e.target.value)}
              placeholder="Enter payer's name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Transaction Number */}
            <div className="space-y-2">
              <Label htmlFor="transactionNumber">Transaction Number</Label>
              <Input
                id="transactionNumber"
                value={formData.transactionNumber}
                onChange={(e) => updateField('transactionNumber', e.target.value)}
                placeholder="Enter transaction #"
              />
            </div>

            {/* Invoice Number */}
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={(e) => updateField('invoiceNumber', e.target.value)}
                placeholder="Enter invoice #"
              />
            </div>
          </div>

          {/* Remarks */}
          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea
              id="remarks"
              value={formData.remarks}
              onChange={(e) => updateField('remarks', e.target.value)}
              placeholder="Enter any additional notes..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Receipt</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReceiptModal;
