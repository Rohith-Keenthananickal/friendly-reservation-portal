
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusSquare, Trash2, Grid3X3 } from 'lucide-react';
import { DatePickerWithRange } from './DatePickerWithRange';
import { DateRange } from 'react-day-picker';
import { Badge } from '@/components/ui/badge';

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

  const roomTypes = [
    { id: 1, type: 'Deluxe Room' },
    { id: 2, type: 'Super Deluxe Room' },
    { id: 3, type: 'Premium Room' },
  ];

  const mealPlans = [
    { id: 1, plan: 'MAP', name: 'Modified American Plan' },
    { id: 2, plan: 'AP', name: 'American Plan' },
    { id: 3, plan: 'CP', name: 'Continental Plan' },
    { id: 4, plan: 'EP', name: 'European Plan' },
  ];

  const addRoom = () => {
    const newRoom: Room = {
      id: rooms.length + 1,
      roomType: '',
      checkIn: dateRange?.from ? dateRange.from.toISOString().split('T')[0] : '',
      checkOut: dateRange?.to ? dateRange.to.toISOString().split('T')[0] : '',
      nights: 1,
      mealPlan: '',
      adults: 2,
      children: 0,
      rate: 0,
      total: 0
    };
    setRooms([...rooms, newRoom]);
  };

  const removeRoom = (id: number) => {
    if (rooms.length > 1) {
      setRooms(rooms.filter(room => room.id !== id));
    }
  };

  const updateRoom = (id: number, field: string, value: string | number) => {
    setRooms(rooms.map(room => {
      if (room.id === id) {
        const updatedRoom = { ...room, [field]: value };
        
        // Recalculate total if rate or nights changes
        if (field === 'rate' || field === 'nights') {
          updatedRoom.total = Number(updatedRoom.rate) * Number(updatedRoom.nights);
        }
        
        return updatedRoom;
      }
      return room;
    }));
  };

  // Calculate total of all rooms
  const grandTotal = rooms.reduce((sum, room) => sum + room.total, 0);

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
            onClick={addRoom}
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
                      <TableHead className="w-[60px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rooms.map(room => (
                      <TableRow key={room.id}>
                        <TableCell>
                          <Select 
                            value={room.roomType} 
                            onValueChange={(value) => updateRoom(room.id, 'roomType', value)}
                          >
                            <SelectTrigger className="h-9">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {roomTypes.map((type) => (
                                <SelectItem key={type.id} value={type.type}>
                                  {type.type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input 
                            type="date" 
                            className="h-9" 
                            value={room.checkIn}
                            onChange={(e) => updateRoom(room.id, 'checkIn', e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            type="date" 
                            className="h-9" 
                            value={room.checkOut}
                            onChange={(e) => updateRoom(room.id, 'checkOut', e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            type="number" 
                            className="h-9 w-16" 
                            value={room.nights}
                            onChange={(e) => updateRoom(room.id, 'nights', parseInt(e.target.value))}
                          />
                        </TableCell>
                        <TableCell>
                          <Select 
                            value={room.mealPlan} 
                            onValueChange={(value) => updateRoom(room.id, 'mealPlan', value)}
                          >
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
                          <Input 
                            type="number" 
                            className="h-9 w-16" 
                            value={room.adults}
                            onChange={(e) => updateRoom(room.id, 'adults', parseInt(e.target.value))}
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            type="number" 
                            className="h-9 w-16" 
                            value={room.children}
                            onChange={(e) => updateRoom(room.id, 'children', parseInt(e.target.value))}
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            type="number" 
                            className="h-9 w-24" 
                            value={room.rate}
                            onChange={(e) => updateRoom(room.id, 'rate', parseFloat(e.target.value))}
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            type="number" 
                            className="h-9 w-24" 
                            value={room.total} 
                            readOnly 
                          />
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => removeRoom(room.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
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
                  <div>
                    <Select 
                      value={room.roomType} 
                      onValueChange={(value) => updateRoom(room.id, 'roomType', value)}
                    >
                      <SelectTrigger className="h-9 min-w-[180px] bg-white/80">
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
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-muted-foreground hover:text-destructive bg-white/80 rounded-full"
                    onClick={() => removeRoom(room.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor={`check-in-${room.id}`} className="text-xs">Check In</Label>
                        <Input 
                          id={`check-in-${room.id}`}
                          type="date" 
                          className="h-9" 
                          value={room.checkIn}
                          onChange={(e) => updateRoom(room.id, 'checkIn', e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor={`check-out-${room.id}`} className="text-xs">Check Out</Label>
                        <Input 
                          id={`check-out-${room.id}`}
                          type="date" 
                          className="h-9" 
                          value={room.checkOut}
                          onChange={(e) => updateRoom(room.id, 'checkOut', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor={`nights-${room.id}`} className="text-xs">Nights</Label>
                        <Input 
                          id={`nights-${room.id}`}
                          type="number" 
                          className="h-9" 
                          value={room.nights}
                          onChange={(e) => updateRoom(room.id, 'nights', parseInt(e.target.value))}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor={`meal-${room.id}`} className="text-xs">Meal Plan</Label>
                        <Select 
                          value={room.mealPlan} 
                          onValueChange={(value) => updateRoom(room.id, 'mealPlan', value)}
                        >
                          <SelectTrigger id={`meal-${room.id}`} className="h-9">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {mealPlans.map((meal) => (
                              <SelectItem key={meal.id} value={meal.plan}>
                                <div className="flex items-center">
                                  <span>{meal.plan}</span>
                                  <span className="ml-1 text-xs text-muted-foreground">({meal.name})</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor={`adults-${room.id}`} className="text-xs">Adults</Label>
                        <Input 
                          id={`adults-${room.id}`}
                          type="number" 
                          className="h-9" 
                          value={room.adults}
                          onChange={(e) => updateRoom(room.id, 'adults', parseInt(e.target.value))}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor={`children-${room.id}`} className="text-xs">Children</Label>
                        <Input 
                          id={`children-${room.id}`}
                          type="number" 
                          className="h-9" 
                          value={room.children}
                          onChange={(e) => updateRoom(room.id, 'children', parseInt(e.target.value))}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor={`rate-${room.id}`} className="text-xs">Rate</Label>
                        <Input 
                          id={`rate-${room.id}`}
                          type="number" 
                          className="h-9" 
                          value={room.rate}
                          onChange={(e) => updateRoom(room.id, 'rate', parseFloat(e.target.value))}
                        />
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
                onClick={addRoom}
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
      </CardContent>
    </Card>
  );
};

export default RoomDetails;
