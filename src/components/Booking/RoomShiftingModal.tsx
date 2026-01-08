import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertTriangle, ArrowRightLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface RoomShiftingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRoom: string;
  guestName: string;
}

const shiftReasons = [
  { value: 'ac_not_working', label: 'AC Not Working' },
  { value: 'no_water', label: 'No Water / Plumbing Issue' },
  { value: 'electricity', label: 'Electricity / Power Issue' },
  { value: 'maintenance', label: 'Maintenance Problem' },
  { value: 'pest_issue', label: 'Pest / Hygiene Issue' },
  { value: 'noise', label: 'Noise Disturbance' },
  { value: 'other', label: 'Other Issue' },
];

const availableRooms = [
  { value: '102', label: 'Room 102 - Deluxe Room (1st Floor)' },
  { value: '103', label: 'Room 103 - Deluxe Room (1st Floor)' },
  { value: '201', label: 'Room 201 - Deluxe Room (2nd Floor)' },
  { value: '202', label: 'Room 202 - Super Deluxe Room (2nd Floor)' },
  { value: '301', label: 'Room 301 - Suite (3rd Floor)' },
];

const RoomShiftingModal: React.FC<RoomShiftingModalProps> = ({
  isOpen,
  onClose,
  currentRoom,
  guestName,
}) => {
  const [reason, setReason] = useState('');
  const [newRoom, setNewRoom] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    if (!reason) {
      toast({
        title: "Reason Required",
        description: "Please select a reason for room shifting.",
        variant: "destructive",
      });
      return;
    }

    if (!newRoom) {
      toast({
        title: "New Room Required",
        description: "Please select a new room for the guest.",
        variant: "destructive",
      });
      return;
    }

    // Log entry would be created here
    const shiftLog = {
      oldRoom: currentRoom,
      newRoom: newRoom,
      shiftReason: reason,
      shiftedDateTime: new Date().toISOString(),
      performedBy: 'Current Staff', // Would come from auth context
      notes: notes,
    };

    console.log('Room Shift Log:', shiftLog);

    toast({
      title: "Room Shifted Successfully",
      description: `${guestName} moved from Room ${currentRoom} to Room ${newRoom}. Old room marked as Under Maintenance.`,
    });

    // Reset form
    setReason('');
    setNewRoom('');
    setNotes('');
    onClose();
  };

  const handleClose = () => {
    setReason('');
    setNewRoom('');
    setNotes('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5 text-amber-600" />
            Room Shifting
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Info Banner */}
          <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-amber-800">Issue-Based Room Move</p>
              <p className="text-amber-700 mt-1">
                No extra charges will be applied. The current room will be blocked for maintenance.
              </p>
            </div>
          </div>

          {/* Current Room Display */}
          <div>
            <Label className="text-muted-foreground">Current Room</Label>
            <p className="font-semibold text-lg">Room {currentRoom}</p>
            <p className="text-sm text-muted-foreground">Guest: {guestName}</p>
          </div>

          {/* Reason Selection */}
          <div className="space-y-2">
            <Label htmlFor="shift-reason">Reason for Shifting *</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger id="shift-reason">
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                {shiftReasons.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* New Room Selection */}
          <div className="space-y-2">
            <Label htmlFor="new-room">Move to Room *</Label>
            <Select value={newRoom} onValueChange={setNewRoom}>
              <SelectTrigger id="new-room">
                <SelectValue placeholder="Select new room" />
              </SelectTrigger>
              <SelectContent>
                {availableRooms.map((room) => (
                  <SelectItem key={room.value} value={room.value}>
                    {room.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="shift-notes">Additional Notes</Label>
            <Textarea
              id="shift-notes"
              placeholder="Enter any additional details about the issue..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Summary */}
          {reason && newRoom && (
            <div className="p-3 bg-secondary/50 rounded-lg text-sm space-y-1">
              <p className="font-medium">Summary:</p>
              <p>• Guest will be moved from Room {currentRoom} to Room {newRoom}</p>
              <p>• Room {currentRoom} will be marked as "Under Maintenance"</p>
              <p>• No additional charges will be applied</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-amber-600 hover:bg-amber-700">
            Confirm Room Shift
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RoomShiftingModal;
