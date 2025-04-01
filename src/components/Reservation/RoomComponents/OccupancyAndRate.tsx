
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface OccupancyAndRateProps {
  adults: number;
  children: number;
  rate: number;
  onAdultsChange: (value: number) => void;
  onChildrenChange: (value: number) => void;
  onRateChange: (value: number) => void;
}

const OccupancyAndRate: React.FC<OccupancyAndRateProps> = ({
  adults,
  children,
  rate,
  onAdultsChange,
  onChildrenChange,
  onRateChange
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label htmlFor="adults">Adults</Label>
        <Input 
          id="adults"
          type="number" 
          value={adults}
          onChange={(e) => onAdultsChange(parseInt(e.target.value))}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="children">Children</Label>
        <Input 
          id="children"
          type="number" 
          value={children}
          onChange={(e) => onChildrenChange(parseInt(e.target.value))}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="rate">Rate</Label>
        <Input 
          id="rate"
          type="number" 
          value={rate}
          onChange={(e) => onRateChange(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};

export default OccupancyAndRate;
