
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Room } from './RoomModel';

interface RoomTableProps {
  rooms: Room[];
}

const RoomTable: React.FC<RoomTableProps> = ({ rooms }) => {
  return (
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
  );
};

export default RoomTable;
