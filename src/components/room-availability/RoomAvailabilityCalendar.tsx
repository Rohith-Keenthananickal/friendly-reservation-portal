import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { CalendarDays, Ban, Trash2, Building2, BedDouble, Users, CheckCircle } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
  borderColor: string;
  type: 'reservation' | 'block' | 'availability';
  reason?: string;
  availableRooms?: number;
  totalRooms?: number;
  extendedProps?: any;
}

interface Hotel {
  id: string;
  name: string;
  location?: string;
}

interface RoomType {
  id: string;
  name: string;
  totalRooms: number;
  description?: string;
}

interface BlockData {
  startDate: string;
  endDate: string;
  reason: string;
}

interface RoomAvailabilityCalendarProps {
  className?: string;
}

const RoomAvailabilityCalendar: React.FC<RoomAvailabilityCalendarProps> = ({
  className = '',
}) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState<{
    start: string;
    end: string;
  } | null>(null);
  const [blockData, setBlockData] = useState<BlockData>({
    startDate: '',
    endDate: '',
    reason: '',
  });
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<string>('');
  const [selectedRoomType, setSelectedRoomType] = useState<string>('');
  const calendarRef = useRef<FullCalendar>(null);
  const { toast } = useToast();

  // Fetch hotels
  const fetchHotels = async () => {
    try {
      const response = await axios.get('/api/hotels');
      setHotels(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch hotels',
        variant: 'destructive',
      });
    }
  };

  // Fetch room types based on selected hotel
  const fetchRoomTypes = async (hotelId: string) => {
    try {
      const response = await axios.get(`/api/hotels/${hotelId}/room-types`);
      setRoomTypes(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch room types',
        variant: 'destructive',
      });
    }
  };

  // Fetch events from API
  const fetchEvents = async (start: Date, end: Date) => {
    if (!selectedHotel || !selectedRoomType) return;
    
    try {
      setLoading(true);
      const startDate = start.toISOString().split('T')[0];
      const endDate = end.toISOString().split('T')[0];
      
      const response = await axios.get(
        `/api/hotels/${selectedHotel}/room-types/${selectedRoomType}/availability`,
        {
          params: { start: startDate, end: endDate }
        }
      );

      const formattedEvents: CalendarEvent[] = response.data.map((event: any) => {
        if (event.type === 'availability') {
          return {
            id: event.id || `availability-${event.date}`,
            title: `${event.availableRooms}/${event.totalRooms} Available`,
            start: event.date,
            end: event.date,
            backgroundColor: event.availableRooms > 0 ? 'hsl(142 71% 45%)' : 'hsl(var(--muted))',
            borderColor: event.availableRooms > 0 ? 'hsl(142 71% 45%)' : 'hsl(var(--muted))',
            type: 'availability',
            availableRooms: event.availableRooms,
            totalRooms: event.totalRooms,
            extendedProps: { 
              ...event.extendedProps,
              availableRooms: event.availableRooms,
              totalRooms: event.totalRooms,
            },
          };
        }
        
        return {
          id: event.id,
          title: event.title,
          start: event.start,
          end: event.end,
          backgroundColor: event.type === 'reservation' 
            ? 'hsl(var(--primary))' 
            : 'hsl(var(--destructive))',
          borderColor: event.type === 'reservation' 
            ? 'hsl(var(--primary))' 
            : 'hsl(var(--destructive))',
          type: event.type,
          reason: event.reason,
          extendedProps: event.extendedProps || {},
        };
      });

      setEvents(formattedEvents);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch room availability data',
        variant: 'destructive',
      });
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    fetchHotels();
  }, []);

  // Load room types when hotel changes
  useEffect(() => {
    if (selectedHotel) {
      fetchRoomTypes(selectedHotel);
      setSelectedRoomType(''); // Reset room type selection
    }
  }, [selectedHotel]);

  // Handle date selection for blocking
  const handleDateSelect = (selectInfo: any) => {
    const start = selectInfo.start.toISOString().split('T')[0];
    const end = selectInfo.end.toISOString().split('T')[0];
    
    setSelectedDates({ start, end });
    setBlockData({
      startDate: start,
      endDate: end,
      reason: '',
    });
    setIsModalOpen(true);
  };

  // Handle event click (for deletion)
  const handleEventClick = (clickInfo: any) => {
    const event = clickInfo.event;
    if (event.extendedProps.type === 'block') {
      setSelectedEvent({
        id: event.id,
        title: event.title,
        start: event.start.toISOString(),
        end: event.end.toISOString(),
        backgroundColor: event.backgroundColor,
        borderColor: event.borderColor,
        type: event.extendedProps.type,
        reason: event.extendedProps.reason,
      });
      setIsDeleteModalOpen(true);
    }
  };

  // Create new block
  const createBlock = async () => {
    if (!selectedHotel || !selectedRoomType) return;
    
    try {
      setLoading(true);
      const response = await axios.post(`/api/hotels/${selectedHotel}/room-types/${selectedRoomType}/block`, {
        startDate: blockData.startDate,
        endDate: blockData.endDate,
        reason: blockData.reason,
      });

      // Refresh calendar
      const calendarApi = calendarRef.current?.getApi();
      if (calendarApi) {
        const view = calendarApi.view;
        await fetchEvents(view.activeStart, view.activeEnd);
      }

      toast({
        title: 'Success',
        description: 'Room blocked successfully',
      });

      setIsModalOpen(false);
      setBlockData({ startDate: '', endDate: '', reason: '' });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create block',
        variant: 'destructive',
      });
      console.error('Error creating block:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete block
  const deleteBlock = async () => {
    if (!selectedEvent || !selectedHotel || !selectedRoomType) return;

    try {
      setLoading(true);
      await axios.delete(`/api/hotels/${selectedHotel}/room-types/${selectedRoomType}/block/${selectedEvent.id}`);

      // Refresh calendar
      const calendarApi = calendarRef.current?.getApi();
      if (calendarApi) {
        const view = calendarApi.view;
        await fetchEvents(view.activeStart, view.activeEnd);
      }

      toast({
        title: 'Success',
        description: 'Block deleted successfully',
      });

      setIsDeleteModalOpen(false);
      setSelectedEvent(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete block',
        variant: 'destructive',
      });
      console.error('Error deleting block:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="glass-panel p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <CalendarDays className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Room Availability Calendar</h1>
              <p className="text-sm text-muted-foreground">Manage room availability and bookings</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <Badge variant="outline" className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Available</span>
            </Badge>
            <Badge variant="outline" className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>Reservations</span>
            </Badge>
            <Badge variant="outline" className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-destructive"></div>
              <span>Blocked</span>
            </Badge>
          </div>
        </div>

        {/* Selection Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="hotel-select" className="text-sm font-medium flex items-center space-x-2">
              <Building2 className="h-4 w-4" />
              <span>Select Hotel</span>
            </Label>
            <Select value={selectedHotel} onValueChange={setSelectedHotel}>
              <SelectTrigger className="input-elegant">
                <SelectValue placeholder="Choose a hotel" />
              </SelectTrigger>
              <SelectContent className="bg-popover border border-border shadow-lg">
                {hotels.map((hotel) => (
                  <SelectItem key={hotel.id} value={hotel.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{hotel.name}</span>
                      {hotel.location && (
                        <span className="text-xs text-muted-foreground">{hotel.location}</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="room-type-select" className="text-sm font-medium flex items-center space-x-2">
              <BedDouble className="h-4 w-4" />
              <span>Select Room Type</span>
            </Label>
            <Select 
              value={selectedRoomType} 
              onValueChange={setSelectedRoomType}
              disabled={!selectedHotel}
            >
              <SelectTrigger className="input-elegant">
                <SelectValue placeholder="Choose a room type" />
              </SelectTrigger>
              <SelectContent className="bg-popover border border-border shadow-lg">
                {roomTypes.map((roomType) => (
                  <SelectItem key={roomType.id} value={roomType.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{roomType.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {roomType.totalRooms} rooms total
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Calendar */}
      {selectedHotel && selectedRoomType ? (
        <Card className="card-elegant">
          <CardContent className="p-0">
            <div className="p-6">
              <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                events={events}
                select={handleDateSelect}
                eventClick={handleEventClick}
                datesSet={(dateInfo) => {
                  fetchEvents(dateInfo.start, dateInfo.end);
                }}
                height="auto"
                eventDisplay="block"
                eventResizableFromStart={false}
                eventDurationEditable={false}
                selectAllow={(selectInfo) => {
                  // Only allow selection in the future
                  return selectInfo.start >= new Date();
                }}
                eventContent={(eventInfo) => {
                  const { event } = eventInfo;
                  if (event.extendedProps.type === 'availability') {
                    return (
                      <div className="p-1 text-xs font-medium text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{event.extendedProps.availableRooms}/{event.extendedProps.totalRooms}</span>
                        </div>
                      </div>
                    );
                  }
                  return { html: event.title };
                }}
              />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="card-elegant">
          <CardContent className="p-12 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 rounded-full bg-muted">
                <CalendarDays className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Select Hotel & Room Type</h3>
                <p className="text-muted-foreground">
                  Please select both a hotel and room type to view the availability calendar
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Block Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Ban className="h-5 w-5 text-destructive" />
              <span>Block Room Dates</span>
            </DialogTitle>
            <DialogDescription>
              Block the selected date range for this room. Blocked dates will not be available for bookings.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={blockData.startDate}
                  onChange={(e) =>
                    setBlockData({ ...blockData, startDate: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={blockData.endDate}
                  onChange={(e) =>
                    setBlockData({ ...blockData, endDate: e.target.value })
                  }
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Blocking</Label>
              <Textarea
                id="reason"
                placeholder="Enter reason for blocking these dates..."
                value={blockData.reason}
                onChange={(e) =>
                  setBlockData({ ...blockData, reason: e.target.value })
                }
                className="min-h-[80px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={createBlock}
              disabled={loading || !blockData.reason.trim()}
              className="bg-destructive hover:bg-destructive/90"
            >
              {loading ? 'Creating...' : 'Block Dates'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Block Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Trash2 className="h-5 w-5 text-destructive" />
              <span>Delete Block</span>
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this block? The dates will become available for booking again.
            </DialogDescription>
          </DialogHeader>
          
          {selectedEvent && (
            <div className="py-4 space-y-2">
              <div className="text-sm">
                <strong>Dates:</strong> {new Date(selectedEvent.start).toLocaleDateString()} - {new Date(selectedEvent.end).toLocaleDateString()}
              </div>
              {selectedEvent.reason && (
                <div className="text-sm">
                  <strong>Reason:</strong> {selectedEvent.reason}
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={deleteBlock}
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Delete Block'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomAvailabilityCalendar;