
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { DatePickerWithRange } from '../DatePickerWithRange';
import { DateRange } from 'react-day-picker';

interface ReservationInputsProps {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
}

const ReservationInputs: React.FC<ReservationInputsProps> = ({ 
  dateRange, 
  setDateRange 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-2">
        <Label htmlFor="reservation-no">Reservation No.</Label>
        <Input
          id="reservation-no"
          placeholder="1012"
          className="input-elegant"
        />
      </div>
      
      <div className="col-span-2 space-y-2">
        <Label>Date Range</Label>
        <DatePickerWithRange date={dateRange} setDate={setDateRange} />
      </div>
    </div>
  );
};

export default ReservationInputs;
