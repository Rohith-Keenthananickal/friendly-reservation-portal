
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RoomDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (room: Room) => void;
  dateRange: DateRange | undefined;
}

interface Room {
  id: number;
  roomType: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  mealPlan: string;
  adults: number;
  children: number;
  rate: number;
  total: number;
}

const RoomDetailModal: React.FC<RoomDetailModalProps> = ({
  isOpen,
  onClose,
  onSave,
  dateRange
}) => {
  const [room, setRoom] = useState<Room>({
    id: Date.now(),
    roomType: '',
    checkIn: dateRange?.from ? dateRange.from.toISOString().split('T')[0] : '',
    checkOut: dateRange?.to ? dateRange.to.toISOString().split('T')[0] : '',
    nights: 1,
    mealPlan: 'MAP',
    adults: 2,
    children: 0,
    rate: 1500,
    total: 1500
  });

  const roomTypes = [
    { id: 1, type: 'Deluxe Room' },
    { id: 2, type: 'Super Deluxe Room' },
    { id: 3, type: 'Premium Room' },
  ];

  const mealPlans = [
    { id: 1, plan: 'MAP', name: 'Modified American Plan' },
    { id: 2, plan: 'AP', name: 'American Plan' },
    { id: 3, plan: 'CP', name: 'Continental Plan' },
    { id: 4, plan: 'EP', name: 'European Plan' },
  ];

  const updateRoom = (field: string, value: string | number) => {
    setRoom(prevRoom => {
      const updatedRoom = { ...prevRoom, [field]: value };
      
      // Recalculate total if rate or nights changes
      if (field === 'rate' || field === 'nights') {
        updatedRoom.total = Number(updatedRoom.rate) * Number(updatedRoom.nights);
      }
      
      return updatedRoom;
    });
  };

  const handleSave = () => {
    onSave(room);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Room Details</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="roomType">Room Type</Label>
            <Select 
              value={room.roomType} 
              onValueChange={(value) => updateRoom('roomType', value)}
            >
              <SelectTrigger id="roomType">
                <SelectValue placeholder="Select Room Type" />
              </SelectTrigger>
              <SelectContent>
                {roomTypes.map((type) => (
                  <SelectItem key={type.id} value={type.type}>
                    {type.type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="checkIn">Check In</Label>
              <Input 
                id="checkIn"
                type="date" 
                value={room.checkIn}
                onChange={(e) => updateRoom('checkIn', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkOut">Check Out</Label>
              <Input 
                id="checkOut"
                type="date" 
                value={room.checkOut}
                onChange={(e) => updateRoom('checkOut', e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nights">Nights</Label>
              <Input 
                id="nights"
                type="number" 
                value={room.nights}
                onChange={(e) => updateRoom('nights', parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mealPlan">Meal Plan</Label>
              <Select 
                value={room.mealPlan} 
                onValueChange={(value) => updateRoom('mealPlan', value)}
              >
                <SelectTrigger id="mealPlan">
                  <SelectValue placeholder="Select Meal Plan" />
                </SelectTrigger>
                <SelectContent>
                  {mealPlans.map((meal) => (
                    <SelectItem key={meal.id} value={meal.plan}>
                      <div className="flex items-center">
                        <span>{meal.plan}</span>
                        <span className="ml-1 text-xs text-muted-foreground">({meal.name})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="adults">Adults</Label>
              <Input 
                id="adults"
                type="number" 
                value={room.adults}
                onChange={(e) => updateRoom('adults', parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="children">Children</Label>
              <Input 
                id="children"
                type="number" 
                value={room.children}
                onChange={(e) => updateRoom('children', parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">Rate</Label>
              <Input 
                id="rate"
                type="number" 
                value={room.rate}
                onChange={(e) => updateRoom('rate', parseFloat(e.target.value))}
              />
            </div>
          </div>
          
          <div className="pt-2 border-t mt-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total:</span>
              <span className="font-semibold text-primary">₹{room.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Add Room</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RoomDetailModal;
