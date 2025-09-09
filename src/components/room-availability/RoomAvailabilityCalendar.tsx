import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import { CalendarDays, Ban, Trash2, Building2, BedDouble, Users, CheckCircle, Calendar, BookOpen, AlertTriangle } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
  borderColor: string;
  type: 'reservation' | 'block' | 'availability' | 'maintenance' | 'booking';
  reason?: string;
  availableRooms?: number;
  totalRooms?: number;
  roomsAffected?: number;
  extendedProps?: Record<string, unknown>;
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

interface ActionData {
  startDate: string;
  endDate: string;
  reason: string;
  actionType: 'booking' | 'block' | 'maintenance';
  roomsAffected: number[];
}

interface RoomAvailabilityCalendarProps {
  className?: string;
}

// Mock data for hotels
const mockHotels: Hotel[] = [
  { id: 'hotel-1', name: 'Grand Palace Hotel', location: 'Downtown' },
  { id: 'hotel-2', name: 'Seaside Resort', location: 'Beach Front' },
  { id: 'hotel-3', name: 'Mountain View Lodge', location: 'Hill Station' },
];

// Mock data for room types
const mockRoomTypes: Record<string, RoomType[]> = {
  'hotel-1': [
    { id: 'deluxe', name: 'Deluxe Room', totalRooms: 20, description: 'Luxury room with city view' },
    { id: 'suite', name: 'Executive Suite', totalRooms: 10, description: 'Spacious suite with premium amenities' },
    { id: 'standard', name: 'Standard Room', totalRooms: 30, description: 'Comfortable standard accommodation' },
  ],
  'hotel-2': [
    { id: 'ocean-view', name: 'Ocean View Room', totalRooms: 25, description: 'Room with stunning ocean views' },
    { id: 'beach-villa', name: 'Beach Villa', totalRooms: 8, description: 'Private villa steps from the beach' },
    { id: 'garden-room', name: 'Garden Room', totalRooms: 15, description: 'Peaceful room overlooking gardens' },
  ],
  'hotel-3': [
    { id: 'mountain-suite', name: 'Mountain Suite', totalRooms: 12, description: 'Suite with mountain panorama' },
    { id: 'cabin', name: 'Wooden Cabin', totalRooms: 6, description: 'Rustic cabin in the woods' },
    { id: 'valley-room', name: 'Valley View Room', totalRooms: 18, description: 'Room overlooking the valley' },
  ],
};

const RoomAvailabilityCalendar: React.FC<RoomAvailabilityCalendarProps> = ({
  className = '',
}) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState<{
    start: string;
    end: string;
  } | null>(null);
  const [actionData, setActionData] = useState<ActionData>({
    startDate: '',
    endDate: '',
    reason: '',
    actionType: 'booking',
    roomsAffected: [],
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

  // Generate mock events
  const generateMockEvents = (start: Date, end: Date, hotelId: string, roomTypeId: string): CalendarEvent[] => {
    const events: CalendarEvent[] = [];
    const currentDate = new Date(start);
    const endDate = new Date(end);
    
    const selectedRoomTypeData = mockRoomTypes[hotelId]?.find(rt => rt.id === roomTypeId);
    const totalRooms = selectedRoomTypeData?.totalRooms || 20;

    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      
      // Generate random availability
      const reservedRooms = Math.floor(Math.random() * totalRooms);
      const availableRooms = totalRooms - reservedRooms;
      
      // Add availability event for each day
      events.push({
        id: `availability-${dateStr}`,
        title: `${availableRooms}/${totalRooms} Available`,
        start: dateStr,
        end: dateStr,
        backgroundColor: availableRooms > 0 ? '#10B981' : 'hsl(var(--muted))',
        borderColor: availableRooms > 0 ? '#10B981' : 'hsl(var(--muted))',
        type: 'availability',
        availableRooms,
        totalRooms,
        extendedProps: { 
          type: 'availability',
          availableRooms,
          totalRooms,
        },
      });

      // Randomly add some reservations
      if (Math.random() > 0.7 && reservedRooms > 0) {
        events.push({
          id: `reservation-${dateStr}-${Math.random()}`,
          title: `${Math.ceil(reservedRooms / 2)} Reservations`,
          start: dateStr,
          end: dateStr,
          backgroundColor: '#3B82F6',
          borderColor: '#3B82F6',
          type: 'reservation',
          extendedProps: { type: 'reservation' },
        });
      }

      // Randomly add some blocks
      if (Math.random() > 0.85) {
        events.push({
          id: `block-${dateStr}-${Math.random()}`,
          title: 'Maintenance Block',
          start: dateStr,
          end: dateStr,
          backgroundColor: '#EF4444',
          borderColor: '#EF4444',
          type: 'block',
          reason: 'Scheduled maintenance',
          extendedProps: { 
            type: 'block',
            reason: 'Scheduled maintenance'
          },
        });
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return events;
  };

  // Fetch hotels (using mock data)
  const fetchHotels = useCallback(async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setHotels(mockHotels);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch hotels',
        variant: 'destructive',
      });
    }
  }, [toast]);

  // Fetch room types based on selected hotel (using mock data)
  const fetchRoomTypes = useCallback(async (hotelId: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      setRoomTypes(mockRoomTypes[hotelId] || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch room types',
        variant: 'destructive',
      });
    }
  }, [toast]);

  // Fetch events (using mock data)
  const fetchEvents = async (start: Date, end: Date) => {
    if (!selectedHotel || !selectedRoomType) return;
    
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockEvents = generateMockEvents(start, end, selectedHotel, selectedRoomType);
      setEvents(mockEvents);
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
  }, [fetchHotels]);

  // Load room types when hotel changes
  useEffect(() => {
    if (selectedHotel) {
      fetchRoomTypes(selectedHotel);
      setSelectedRoomType(''); // Reset room type selection
    }
  }, [selectedHotel, fetchRoomTypes]);

  // Handle date selection for blocking
  const handleDateSelect = (selectInfo: { start: Date; end: Date }) => {
    const start = selectInfo.start.toISOString().split('T')[0];
    const end = selectInfo.end.toISOString().split('T')[0];
    
    setSelectedDates({ start, end });
    setActionData({
      startDate: start,
      endDate: end,
      reason: '',
      actionType: 'booking',
      roomsAffected: [],
    });
    setIsModalOpen(true);
  };

  // Handle event click (for deletion)
  const handleEventClick = (clickInfo: { event: { id: string; title: string; start: Date; end: Date; backgroundColor: string; borderColor: string; extendedProps: Record<string, unknown> } }) => {
    const event = clickInfo.event;
    if (event.extendedProps.type === 'block') {
      setSelectedEvent({
        id: event.id,
        title: event.title,
        start: event.start.toISOString(),
        end: event.end.toISOString(),
        backgroundColor: event.backgroundColor,
        borderColor: event.borderColor,
        type: event.extendedProps.type as 'reservation' | 'block' | 'availability',
        reason: event.extendedProps.reason as string,
      });
      setIsDeleteModalOpen(true);
    }
  };

  // Create new action (using mock data)
  const createAction = async () => {
    if (!selectedHotel || !selectedRoomType) return;
    
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create new event based on action type
      const colors = {
        booking: { bg: '#3B82F6', border: '#3B82F6' },
        block: { bg: '#EF4444', border: '#EF4444' },
        maintenance: { bg: '#F59E0B', border: '#F59E0B' },
      };
      
      const newEvent: CalendarEvent = {
        id: `${actionData.actionType}-${Date.now()}`,
        title: `${actionData.reason || actionData.actionType} (${actionData.roomsAffected.length} rooms)`,
        start: actionData.startDate,
        end: actionData.endDate,
        backgroundColor: colors[actionData.actionType].bg,
        borderColor: colors[actionData.actionType].border,
        type: actionData.actionType as 'reservation' | 'block' | 'availability' | 'maintenance' | 'booking',
        reason: actionData.reason,
        roomsAffected: actionData.roomsAffected.length,
        extendedProps: { 
          type: actionData.actionType,
          reason: actionData.reason,
          roomsAffected: actionData.roomsAffected.length
        },
      };

      // Add to events
      setEvents(prevEvents => [...prevEvents, newEvent]);

      toast({
        title: 'Success',
        description: 'Room blocked successfully',
      });

      setIsModalOpen(false);
      setActionData({ startDate: '', endDate: '', reason: '', actionType: 'booking', roomsAffected: [] });
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

  // Delete block (using mock data)
  const deleteBlock = async () => {
    if (!selectedEvent) return;

    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Remove from events
      setEvents(prevEvents => prevEvents.filter(event => event.id !== selectedEvent.id));

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
      <div className="glass-panel p-6 fade-up">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-hotel-accent">
              <CalendarDays className="h-6 w-6 text-hotel-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-hotel-primary">Room Availability Calendar</h1>
              <p className="text-sm text-muted-foreground">Manage room availability and bookings</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <Badge variant="outline" className="flex items-center space-x-1 bg-green-50 border-green-200 text-green-700">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Available</span>
            </Badge>
            <Badge variant="outline" className="flex items-center space-x-1 bg-blue-50 border-blue-200 text-blue-700">
              <div className="w-2 h-2 rounded-full bg-hotel-highlight"></div>
              <span>Reservations</span>
            </Badge>
            <Badge variant="outline" className="flex items-center space-x-1 bg-red-50 border-red-200 text-red-700">
              <div className="w-2 h-2 rounded-full bg-destructive"></div>
              <span>Blocked</span>
            </Badge>
          </div>
        </div>

        {/* Selection Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 fade-up delay-1">
          <div className="space-y-2">
            <Label htmlFor="hotel-select" className="text-sm font-medium flex items-center space-x-2 text-hotel-primary">
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
            <Label htmlFor="room-type-select" className="text-sm font-medium flex items-center space-x-2 text-hotel-primary">
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

      {/* Summary Statistics */}
      {selectedHotel && selectedRoomType && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 fade-up delay-1">
          <Card className="card-elegant">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-hotel-accent">
                  <Building2 className="h-5 w-5 text-hotel-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Rooms</p>
                  <p className="text-2xl font-bold text-hotel-primary">
                    {roomTypes.find(rt => rt.id === selectedRoomType)?.totalRooms || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elegant">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-green-100">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Available</p>
                  <p className="text-2xl font-bold text-green-600">
                    {events.filter(e => e.type === 'availability' && e.availableRooms && e.availableRooms > 0).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elegant">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bookings</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {events.filter(e => e.type === 'reservation' || e.type === 'booking').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elegant">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-red-100">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Blocked/Maintenance</p>
                  <p className="text-2xl font-bold text-red-600">
                    {events.filter(e => e.type === 'block' || e.type === 'maintenance').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Calendar */}
      {selectedHotel && selectedRoomType ? (
        <Card className="card-elegant fade-up delay-2">
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
        <Card className="card-elegant fade-up delay-2">
          <CardContent className="p-12 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 rounded-full bg-hotel-accent">
                <CalendarDays className="h-8 w-8 text-hotel-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-hotel-primary">Select Hotel & Room Type</h3>
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
        <DialogContent className="sm:max-w-[425px] card-elegant">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-hotel-primary">
              <Calendar className="h-5 w-5 text-hotel-primary" />
              <span>Manage Room Availability</span>
            </DialogTitle>
            <DialogDescription>
              Book, block, or set maintenance for the selected date range and rooms.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="action-type" className="text-hotel-primary font-medium">Action Type</Label>
              <Select 
                value={actionData.actionType} 
                onValueChange={(value: 'booking' | 'block' | 'maintenance') => 
                  setActionData({ ...actionData, actionType: value })
                }
              >
                <SelectTrigger className="input-elegant">
                  <SelectValue placeholder="Select action type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="booking">Mark as Booked</SelectItem>
                  <SelectItem value="block">Block Rooms</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date" className="text-hotel-primary font-medium">Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={actionData.startDate}
                  onChange={(e) =>
                    setActionData({ ...actionData, startDate: e.target.value })
                  }
                  className="input-elegant"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date" className="text-hotel-primary font-medium">End Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={actionData.endDate}
                  onChange={(e) =>
                    setActionData({ ...actionData, endDate: e.target.value })
                  }
                  className="input-elegant"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rooms-affected" className="text-hotel-primary font-medium">Rooms Affected</Label>
              <Select 
                value={actionData.roomsAffected.length > 0 ? actionData.roomsAffected.join(',') : ''} 
                onValueChange={(value) => {
                  const rooms = value ? value.split(',').map(Number) : [];
                  setActionData({ ...actionData, roomsAffected: rooms });
                }}
              >
                <SelectTrigger className="input-elegant">
                  <SelectValue placeholder="Select rooms (1-20)" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      Room {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Selected: {actionData.roomsAffected.length} room(s)</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reason" className="text-hotel-primary font-medium">
                Reason {actionData.actionType === 'booking' ? 'for Booking' : actionData.actionType === 'block' ? 'for Blocking' : 'for Maintenance'}
              </Label>
              <Textarea
                id="reason"
                placeholder={`Enter reason for ${actionData.actionType}...`}
                value={actionData.reason}
                onChange={(e) =>
                  setActionData({ ...actionData, reason: e.target.value })
                }
                className="min-h-[80px] input-elegant"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="focus-ring"
            >
              Cancel
            </Button>
            <Button
              onClick={createAction}
              disabled={loading || !actionData.reason.trim() || actionData.roomsAffected.length === 0}
              className="bg-destructive hover:bg-destructive/90 focus-ring"
            >
              {loading ? 'Creating...' : `${actionData.actionType === 'booking' ? 'Book' : actionData.actionType === 'block' ? 'Block' : 'Set Maintenance'}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Block Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[425px] card-elegant">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-hotel-primary">
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
                <strong className="text-hotel-primary">Dates:</strong> {new Date(selectedEvent.start).toLocaleDateString()} - {new Date(selectedEvent.end).toLocaleDateString()}
              </div>
              {selectedEvent.reason && (
                <div className="text-sm">
                  <strong className="text-hotel-primary">Reason:</strong> {selectedEvent.reason}
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
              className="focus-ring"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={deleteBlock}
              disabled={loading}
              className="focus-ring"
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