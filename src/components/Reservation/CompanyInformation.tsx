
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle } from 'lucide-react';

interface CompanyInformationProps {
  bookingMode: string;
  companyName: string;
  setCompanyName: (value: string) => void;
  agentAddress: string;
  setAgentAddress: (value: string) => void;
  designation: string;
  setDesignation: (value: string) => void;
}

const CompanyInformation: React.FC<CompanyInformationProps> = ({
  bookingMode,
  companyName,
  setCompanyName,
  agentAddress,
  setAgentAddress,
  designation,
  setDesignation
}) => {
  if (bookingMode !== "company" && bookingMode !== "agent") {
    return null;
  }

  return (
    <Card className="shadow-sm border-border/40 fade-up delay-3">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">
          {bookingMode === "agent" ? "Agent Information" : "Company Information"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="companyName">
              {bookingMode === "agent" ? "Agent Name" : "Company Name"}
            </Label>
            <Input
              id="companyName"
              placeholder={bookingMode === "agent" ? "Enter agent name" : "Enter company name"}
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="input-elegant"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="designation">Designation</Label>
            <Input
              id="designation"
              placeholder="Enter designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="input-elegant"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="agentAddress">
            {bookingMode === "agent" ? "Agent Address" : "Company Address"}
          </Label>
          <Textarea
            id="agentAddress"
            placeholder={bookingMode === "agent" ? "Enter agent address" : "Enter company address"}
            value={agentAddress}
            onChange={(e) => setAgentAddress(e.target.value)}
            className="input-elegant min-h-[100px]"
          />
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

export default CompanyInformation;
