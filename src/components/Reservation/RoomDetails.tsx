
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusSquare, Grid3X3 } from 'lucide-react';
import { DatePickerWithRange } from './DatePickerWithRange';
import { DateRange } from 'react-day-picker';
import { Badge } from '@/components/ui/badge';
import RoomDetailModal from './RoomDetailModal';

interface RoomDetailsProps {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
}

interface Room {
  id: number;
  roomType: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  mealPlan: string;
  adults: number;
  children: number;
  rate: number;
  total: number;
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
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Room Details</CardTitle>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className={viewMode === 'grid' ? 'bg-primary/10' : ''}
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusSquare className="h-4 w-4" />
            <span>Add Room</span>
          </Button>
        </div>
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
        
        {viewMode === 'table' ? (
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
                    {rooms.map(room => (
                      <TableRow key={room.id}>
                        <TableCell className="font-medium">{room.roomType}</TableCell>
                        <TableCell>{room.checkIn}</TableCell>
                        <TableCell>{room.checkOut}</TableCell>
                        <TableCell>{room.nights}</TableCell>
                        <TableCell>{room.mealPlan}</TableCell>
                        <TableCell>{room.adults}</TableCell>
                        <TableCell>{room.children}</TableCell>
                        <TableCell>₹{room.rate.toFixed(2)}</TableCell>
                        <TableCell>₹{room.total.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms.map(room => (
              <Card key={room.id} className="overflow-hidden border-border/40">
                <div className="bg-primary/5 p-4 flex justify-between items-center">
                  <div className="font-medium">{room.roomType || "Room Type Not Selected"}</div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-muted-foreground hover:text-destructive bg-white/80 rounded-full"
                    onClick={() => removeRoom(room.id)}
                  >
                    <span className="sr-only">Remove Room</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
                  </Button>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs text-muted-foreground">Check In</Label>
                        <p>{room.checkIn}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Check Out</Label>
                        <p>{room.checkOut}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs text-muted-foreground">Nights</Label>
                        <p>{room.nights}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Meal Plan</Label>
                        <p>{room.mealPlan} <span className="text-xs text-muted-foreground">({getMealPlanName(room.mealPlan)})</span></p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <Label className="text-xs text-muted-foreground">Adults</Label>
                        <p>{room.adults}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Children</Label>
                        <p>{room.children}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Rate</Label>
                        <p>₹{room.rate.toFixed(2)}</p>
                      </div>
                    </div>
                    
                    <div className="pt-2 flex justify-between items-center border-t">
                      <span className="text-sm font-medium">Total Amount</span>
                      <Badge variant="secondary" className="text-sm font-semibold">₹{room.total.toFixed(2)}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className="flex items-center justify-center h-full">
              <Button 
                onClick={() => setIsModalOpen(true)}
                variant="outline" 
                className="h-full w-full border-dashed text-muted-foreground hover:text-primary hover:border-primary min-h-[240px]"
              >
                <div className="flex flex-col items-center gap-2">
                  <PlusSquare className="h-6 w-6" />
                  <span>Add Another Room</span>
                </div>
              </Button>
            </div>
          </div>
        )}
        
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
        
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-lg font-semibold">
            Grand Total: <span className="text-primary">₹{grandTotal.toFixed(2)}</span>
          </div>
          <Button className="button-primary min-w-[120px]">
            Save Reservation
          </Button>
        </div>
        
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
