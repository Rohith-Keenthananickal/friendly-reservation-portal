
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PlusCircle } from 'lucide-react';

interface GuestInformationProps {
  userType: string;
  setUserType: (value: string) => void;
  guestName: string;
  setGuestName: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
  hasGST: string;
  setHasGST: (value: string) => void;
  bookingMode: string;
  setBookingMode: (value: string) => void;
}

const GuestInformation: React.FC<GuestInformationProps> = ({
  userType,
  setUserType,
  guestName,
  setGuestName,
  address,
  setAddress,
  hasGST,
  setHasGST,
  bookingMode,
  setBookingMode
}) => {
  return (
    <Card className="shadow-sm border-border/40 fade-up delay-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Guest Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="guestName">Guest Name</Label>
            <Input
              id="guestName"
              placeholder="Enter guest name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="input-elegant"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="userType">Select User Type</Label>
            <Select value={userType} onValueChange={setUserType}>
              <SelectTrigger className="input-elegant">
                <SelectValue placeholder="Select user type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="indian">Indian</SelectItem>
                <SelectItem value="foreigner">Foreigner</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="input-elegant min-h-[100px]"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="idNumber">ID Number</Label>
            <Input
              id="idNumber"
              placeholder="Enter ID number"
              className="input-elegant"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bookingMode">Booking Mode</Label>
            <Select value={bookingMode} onValueChange={setBookingMode}>
              <SelectTrigger className="input-elegant">
                <SelectValue placeholder="Select booking mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="company">Company</SelectItem>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="agent">Agent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="flex items-center space-x-2">
              <span>Phone</span>
              <button className="text-primary hover:text-primary/80">
                <PlusCircle className="h-4 w-4" />
              </button>
            </Label>
            <Input
              placeholder="Enter phone number"
              className="input-elegant"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center space-x-2">
              <span>Email</span>
              <button className="text-primary hover:text-primary/80">
                <PlusCircle className="h-4 w-4" />
              </button>
            </Label>
            <Input
              placeholder="Enter email address"
              className="input-elegant"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>GST</Label>
          <RadioGroup
            value={hasGST}
            onValueChange={setHasGST}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="gst-yes" />
              <Label htmlFor="gst-yes" className="cursor-pointer">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="gst-no" />
              <Label htmlFor="gst-no" className="cursor-pointer">No</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              placeholder="Enter state"
              className="input-elegant"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              placeholder="Enter country"
              className="input-elegant"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GuestInformation;
