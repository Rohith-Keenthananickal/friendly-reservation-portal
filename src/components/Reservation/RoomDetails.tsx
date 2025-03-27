
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusSquare } from 'lucide-react';
import { DatePickerWithRange } from './DatePickerWithRange';
import { DateRange } from 'react-day-picker';

interface RoomDetailsProps {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
}

const RoomDetails: React.FC<RoomDetailsProps> = ({ dateRange, setDateRange }) => {
  const roomTypes = [
    { id: 1, type: 'Deluxe Room' },
    { id: 2, type: 'Super Deluxe Room' },
    { id: 3, type: 'Premium Room' },
  ];

  const mealPlans = [
    { id: 1, plan: 'MAP' },
    { id: 2, plan: 'AP' },
    { id: 3, plan: 'CP' },
    { id: 4, plan: 'EP' },
  ];

  return (
    <Card className="shadow-sm border-border/40 fade-up delay-5">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Room Details</CardTitle>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <PlusSquare className="h-4 w-4" />
          <span>Add Room</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
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
        
        <div className="overflow-x-auto -mx-6">
          <div className="px-6 inline-block min-w-full align-middle">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/30">
                    <TableHead className="w-[120px]">Room Type</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Nights</TableHead>
                    <TableHead>Meal Plan</TableHead>
                    <TableHead>Adults</TableHead>
                    <TableHead>Children</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Select>
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {roomTypes.map((room) => (
                            <SelectItem key={room.id} value={room.type}>
                              {room.type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input type="date" className="h-9" />
                    </TableCell>
                    <TableCell>
                      <Input type="date" className="h-9" />
                    </TableCell>
                    <TableCell>
                      <Input type="number" className="h-9 w-16" placeholder="1" />
                    </TableCell>
                    <TableCell>
                      <Select>
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {mealPlans.map((meal) => (
                            <SelectItem key={meal.id} value={meal.plan}>
                              {meal.plan}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input type="number" className="h-9 w-16" placeholder="2" />
                    </TableCell>
                    <TableCell>
                      <Input type="number" className="h-9 w-16" placeholder="0" />
                    </TableCell>
                    <TableCell>
                      <Input type="number" className="h-9 w-24" placeholder="0.00" />
                    </TableCell>
                    <TableCell>
                      <Input type="number" className="h-9 w-24" placeholder="0.00" readOnly />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        
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
        
        <div className="flex justify-end pt-4">
          <Button className="button-primary min-w-[120px]">
            Save Reservation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomDetails;
