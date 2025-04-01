
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const RoomTaxFields: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="space-y-2">
        <Label htmlFor="gst">GST</Label>
        <Input
          id="gst"
          placeholder="0.00"
          className="input-elegant"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="sgst">SGST</Label>
        <Input
          id="sgst"
          placeholder="0.00"
          className="input-elegant"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="cgst">CGST</Label>
        <Input
          id="cgst"
          placeholder="0.00"
          className="input-elegant"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="igst">IGST</Label>
        <Input
          id="igst"
          placeholder="0.00"
          className="input-elegant"
        />
      </div>
    </div>
  );
};

export default RoomTaxFields;
