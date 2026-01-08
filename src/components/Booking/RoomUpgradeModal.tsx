import React, { useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowUpCircle, CreditCard, IndianRupee } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

interface RoomUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRoom: string;
  currentRoomType: string;
  currentRate: number;
  remainingNights: number;
  guestName: string;
}

const upgradeReasons = [
  { value: 'guest_request', label: 'Guest Request' },
  { value: 'better_facilities', label: 'Better Facilities Required' },
  { value: 'special_occasion', label: 'Special Occasion' },
  { value: 'group_requirement', label: 'Group / Family Requirement' },
  { value: 'other', label: 'Other Reason' },
];

const paymentModes = [
  { value: 'cash', label: 'Cash' },
  { value: 'card', label: 'Card' },
  { value: 'upi', label: 'UPI' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
];

const availableUpgradeRooms = [
  { value: '202', label: 'Room 202 - Super Deluxe Room', type: 'Super Deluxe Room', rate: 5500 },
  { value: '203', label: 'Room 203 - Super Deluxe Room', type: 'Super Deluxe Room', rate: 5500 },
  { value: '301', label: 'Room 301 - Premium Suite', type: 'Premium Suite', rate: 7500 },
  { value: '302', label: 'Room 302 - Premium Suite', type: 'Premium Suite', rate: 7500 },
  { value: '401', label: 'Room 401 - Executive Suite', type: 'Executive Suite', rate: 10000 },
];

const RoomUpgradeModal: React.FC<RoomUpgradeModalProps> = ({
  isOpen,
  onClose,
  currentRoom,
  currentRoomType,
  currentRate,
  remainingNights,
  guestName,
}) => {
  const [selectedRoom, setSelectedRoom] = useState('');
  const [reason, setReason] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [transactionRef, setTransactionRef] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const selectedRoomDetails = useMemo(() => {
    return availableUpgradeRooms.find((room) => room.value === selectedRoom);
  }, [selectedRoom]);

  const tariffDifference = useMemo(() => {
    if (!selectedRoomDetails) return 0;
    return (selectedRoomDetails.rate - currentRate) * remainingNights;
  }, [selectedRoomDetails, currentRate, remainingNights]);

  const handleSubmit = () => {
    if (!selectedRoom) {
      toast({
        title: "Room Required",
        description: "Please select a room for upgrade.",
        variant: "destructive",
      });
      return;
    }

    if (!reason) {
      toast({
        title: "Reason Required",
        description: "Please select a reason for upgrade.",
        variant: "destructive",
      });
      return;
    }

    if (!paymentMode) {
      toast({
        title: "Payment Mode Required",
        description: "Please select a payment mode.",
        variant: "destructive",
      });
      return;
    }

    if (!confirmed) {
      toast({
        title: "Confirmation Required",
        description: "Please confirm the upgrade charges with the guest.",
        variant: "destructive",
      });
      return;
    }

    // Upgrade log would be created here
    const upgradeLog = {
      oldRoom: currentRoom,
      oldRoomCategory: currentRoomType,
      newRoom: selectedRoom,
      newRoomCategory: selectedRoomDetails?.type,
      tariffDifference: tariffDifference,
      paymentMode: paymentMode,
      transactionRef: transactionRef,
      upgradeReason: reason,
      approvedBy: 'Current Staff', // Would come from auth context
      notes: notes,
      upgradeDateTime: new Date().toISOString(),
    };

    console.log('Room Upgrade Log:', upgradeLog);

    toast({
      title: "Room Upgraded Successfully",
      description: `${guestName} upgraded to ${selectedRoomDetails?.type}. Upgrade charge: ₹${tariffDifference.toLocaleString()}`,
    });

    // Reset form
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setSelectedRoom('');
    setReason('');
    setPaymentMode('');
    setTransactionRef('');
    setNotes('');
    setConfirmed(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowUpCircle className="h-5 w-5 text-green-600" />
            Room Upgrade
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Info Banner */}
          <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <CreditCard className="h-5 w-5 text-green-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-green-800">Paid Room Upgrade</p>
              <p className="text-green-700 mt-1">
                Additional charges will be collected based on tariff difference.
              </p>
            </div>
          </div>

          {/* Current Room Display */}
          <div className="grid grid-cols-2 gap-4 p-3 bg-secondary/30 rounded-lg">
            <div>
              <Label className="text-muted-foreground text-xs">Current Room</Label>
              <p className="font-semibold">Room {currentRoom}</p>
              <p className="text-sm text-muted-foreground">{currentRoomType}</p>
            </div>
            <div>
              <Label className="text-muted-foreground text-xs">Current Rate / Night</Label>
              <p className="font-semibold">₹{currentRate.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">{remainingNights} nights remaining</p>
            </div>
          </div>

          {/* Upgrade Room Selection */}
          <div className="space-y-2">
            <Label htmlFor="upgrade-room">Upgrade to Room *</Label>
            <Select value={selectedRoom} onValueChange={setSelectedRoom}>
              <SelectTrigger id="upgrade-room">
                <SelectValue placeholder="Select higher category room" />
              </SelectTrigger>
              <SelectContent>
                {availableUpgradeRooms.map((room) => (
                  <SelectItem key={room.value} value={room.value}>
                    <div className="flex justify-between items-center gap-4">
                      <span>{room.label}</span>
                      <span className="text-muted-foreground">₹{room.rate.toLocaleString()}/night</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tariff Difference Display */}
          {selectedRoomDetails && (
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">New Rate / Night</span>
                <span>₹{selectedRoomDetails.rate.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Rate Difference / Night</span>
                <span>₹{(selectedRoomDetails.rate - currentRate).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Remaining Nights</span>
                <span>{remainingNights}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Upgrade Charge</span>
                <span className="text-lg font-bold text-primary flex items-center">
                  <IndianRupee className="h-4 w-4" />
                  {tariffDifference.toLocaleString()}
                </span>
              </div>
            </div>
          )}

          {/* Reason Selection */}
          <div className="space-y-2">
            <Label htmlFor="upgrade-reason">Upgrade Reason *</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger id="upgrade-reason">
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                {upgradeReasons.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Payment Details */}
          <div className="space-y-2">
            <Label htmlFor="payment-mode">Payment Mode *</Label>
            <Select value={paymentMode} onValueChange={setPaymentMode}>
              <SelectTrigger id="payment-mode">
                <SelectValue placeholder="Select payment mode" />
              </SelectTrigger>
              <SelectContent>
                {paymentModes.map((mode) => (
                  <SelectItem key={mode.value} value={mode.value}>
                    {mode.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {paymentMode && paymentMode !== 'cash' && (
            <div className="space-y-2">
              <Label htmlFor="transaction-ref">Transaction Reference</Label>
              <Input
                id="transaction-ref"
                placeholder="Enter transaction ID / reference number"
                value={transactionRef}
                onChange={(e) => setTransactionRef(e.target.value)}
              />
            </div>
          )}

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="upgrade-notes">Additional Notes</Label>
            <Textarea
              id="upgrade-notes"
              placeholder="Enter any additional details..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>

          {/* Guest Confirmation */}
          <div className="p-3 border rounded-lg">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="guest-confirmed"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="guest-confirmed" className="text-sm cursor-pointer">
                I confirm that the upgrade charges have been communicated to and approved by the guest.
              </Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
            Confirm Upgrade & Collect Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RoomUpgradeModal;
