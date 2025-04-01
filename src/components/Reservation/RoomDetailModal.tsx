
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DateRange } from 'react-day-picker';
import RoomTypeSelector from './RoomComponents/RoomTypeSelector';
import DateSelector from './RoomComponents/DateSelector';
import NightsAndMealSelector from './RoomComponents/NightsAndMealSelector';
import OccupancyAndRate from './RoomComponents/OccupancyAndRate';
import { Room } from './RoomComponents/RoomModel';

interface RoomDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (room: Room) => void;
  dateRange: DateRange | undefined;
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
          <RoomTypeSelector 
            value={room.roomType}
            onChange={(value) => updateRoom('roomType', value)}
          />
          
          <DateSelector 
            checkInDate={room.checkIn}
            checkOutDate={room.checkOut}
            onCheckInChange={(value) => updateRoom('checkIn', value)}
            onCheckOutChange={(value) => updateRoom('checkOut', value)}
          />
          
          <NightsAndMealSelector 
            nights={room.nights}
            mealPlan={room.mealPlan}
            onNightsChange={(value) => updateRoom('nights', value)}
            onMealPlanChange={(value) => updateRoom('mealPlan', value)}
          />
          
          <OccupancyAndRate 
            adults={room.adults}
            children={room.children}
            rate={room.rate}
            onAdultsChange={(value) => updateRoom('adults', value)}
            onChildrenChange={(value) => updateRoom('children', value)}
            onRateChange={(value) => updateRoom('rate', value)}
          />
          
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
