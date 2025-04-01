
import React from 'react';
import { CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Grid3X3, PlusSquare } from 'lucide-react';

interface RoomHeaderProps {
  viewMode: 'table' | 'grid';
  setViewMode: (mode: 'table' | 'grid') => void;
  onAddRoom: () => void;
}

const RoomHeader: React.FC<RoomHeaderProps> = ({ 
  viewMode, 
  setViewMode, 
  onAddRoom 
}) => {
  return (
    <div className="pb-3 flex flex-row items-center justify-between">
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
          onClick={onAddRoom}
        >
          <PlusSquare className="h-4 w-4" />
          <span>Add Room</span>
        </Button>
      </div>
    </div>
  );
};

export default RoomHeader;
