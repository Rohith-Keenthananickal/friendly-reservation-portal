
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DateRange } from 'react-day-picker';
import RoomDetailModal from './RoomDetailModal';
import RoomHeader from './RoomComponents/RoomHeader';
import ReservationInputs from './RoomComponents/ReservationInputs';
import RoomTable from './RoomComponents/RoomTable';
import RoomGrid from './RoomComponents/RoomGrid';
import RoomTaxFields from './RoomComponents/RoomTaxFields';
import RoomDetailsSummary from './RoomComponents/RoomDetailsSummary';
import { Room } from './RoomComponents/RoomModel';

interface RoomDetailsProps {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
}

const RoomDetails: React.FC<RoomDetailsProps> = ({ dateRange, setDateRange }) => {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('grid');
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: 1,
      roomType: 'Deluxe Room',
      checkIn: dateRange?.from ? dateRange.from.toISOString().split('T')[0] : '',
      checkOut: dateRange?.to ? dateRange.to.toISOString().split('T')[0] : '',
      nights: 1,
      mealPlan: 'MAP',
      adults: 2,
      children: 0,
      rate: 1500,
      total: 1500
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate total of all rooms
  const grandTotal = rooms.reduce((sum, room) => sum + room.total, 0);

  const addRoom = (newRoom: Room) => {
    setRooms([...rooms, newRoom]);
  };

  const removeRoom = (id: number) => {
    if (rooms.length > 1) {
      setRooms(rooms.filter(room => room.id !== id));
    }
  };

  // Format mealPlan display
  const getMealPlanName = (planCode: string): string => {
    const plans: Record<string, string> = {
      'MAP': 'Modified American Plan',
      'AP': 'American Plan',
      'CP': 'Continental Plan',
      'EP': 'European Plan'
    };
    return plans[planCode] || planCode;
  };

  return (
    <Card className="shadow-sm border-border/40 fade-up delay-5">
      <CardHeader className="pb-0">
        <RoomHeader 
          viewMode={viewMode} 
          setViewMode={setViewMode} 
          onAddRoom={() => setIsModalOpen(true)} 
        />
      </CardHeader>
      <CardContent className="space-y-6">
        <ReservationInputs dateRange={dateRange} setDateRange={setDateRange} />
        
        {viewMode === 'table' ? (
          <RoomTable rooms={rooms} />
        ) : (
          <RoomGrid 
            rooms={rooms} 
            removeRoom={removeRoom} 
            onAddRoom={() => setIsModalOpen(true)}
            getMealPlanName={getMealPlanName}
          />
        )}
        
        <RoomTaxFields />
        
        <RoomDetailsSummary rooms={rooms} grandTotal={grandTotal} />
        
        <RoomDetailModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={addRoom}
          dateRange={dateRange}
        />
      </CardContent>
    </Card>
  );
};

export default RoomDetails;
