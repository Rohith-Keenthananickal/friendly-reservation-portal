
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { PlusSquare } from 'lucide-react';
import { Room } from './RoomModel';

interface RoomGridProps {
  rooms: Room[];
  removeRoom: (id: number) => void;
  onAddRoom: () => void;
  getMealPlanName: (plan: string) => string;
}

const RoomGrid: React.FC<RoomGridProps> = ({ 
  rooms, 
  removeRoom, 
  onAddRoom,
  getMealPlanName 
}) => {
  return (
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
          onClick={onAddRoom}
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
  );
};

export default RoomGrid;
