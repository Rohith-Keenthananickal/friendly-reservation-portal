
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface DateSelectorProps {
  checkInDate: string;
  checkOutDate: string;
  onCheckInChange: (value: string) => void;
  onCheckOutChange: (value: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ 
  checkInDate, 
  checkOutDate, 
  onCheckInChange, 
  onCheckOutChange 
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="checkIn">Check In</Label>
        <Input 
          id="checkIn"
          type="date" 
          value={checkInDate}
          onChange={(e) => onCheckInChange(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="checkOut">Check Out</Label>
        <Input 
          id="checkOut"
          type="date" 
          value={checkOutDate}
          onChange={(e) => onCheckOutChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default DateSelector;
