
import React from 'react';
import { Button } from '@/components/ui/button';
import { Room } from './RoomModel';

interface RoomDetailsSummaryProps {
  rooms: Room[];
  grandTotal: number;
}

const RoomDetailsSummary: React.FC<RoomDetailsSummaryProps> = ({ rooms, grandTotal }) => {
  return (
    <div className="flex justify-between items-center pt-4 border-t">
      <div className="text-lg font-semibold">
        Grand Total: <span className="text-primary">₹{grandTotal.toFixed(2)}</span>
      </div>
      <Button className="button-primary min-w-[120px]">
        Save Reservation
      </Button>
    </div>
  );
};

export default RoomDetailsSummary;
