
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { roomTypes } from '../utils/roomData';

interface RoomTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const RoomTypeSelector: React.FC<RoomTypeSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="roomType">Room Type</Label>
      <Select 
        value={value} 
        onValueChange={onChange}
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
  );
};

export default RoomTypeSelector;
