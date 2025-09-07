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
import { useToast } from '@/hooks/use-toast';
import { CalendarDays, Ban, Trash2 } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
  borderColor: string;
  type: 'reservation' | 'block';
  reason?: string;
  extendedProps?: any;
}

interface BlockData {
  startDate: string;
  endDate: string;
  reason: string;
}

interface RoomAvailabilityCalendarProps {
  roomId: string;
  className?: string;
}

const RoomAvailabilityCalendar: React.FC<RoomAvailabilityCalendarProps> = ({
  roomId,
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
  const calendarRef = useRef<FullCalendar>(null);
  const { toast } = useToast();

  // Fetch events from API
  const fetchEvents = async (start: Date, end: Date) => {
    try {
      setLoading(true);
      const startDate = start.toISOString().split('T')[0];
      const endDate = end.toISOString().split('T')[0];
      
      const response = await axios.get(
        `/api/rooms/${roomId}/availability`,
        {
          params: { start: startDate, end: endDate }
        }
      );

      const formattedEvents: CalendarEvent[] = response.data.map((event: any) => ({
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
      }));

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
    try {
      setLoading(true);
      const response = await axios.post(`/api/rooms/${roomId}/block`, {
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
    if (!selectedEvent) return;

    try {
      setLoading(true);
      await axios.delete(`/api/rooms/${roomId}/block/${selectedEvent.id}`);

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
    <div className={`p-6 space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CalendarDays className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Room Availability Calendar</h2>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded bg-primary"></div>
            <span>Reservations</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded bg-destructive"></div>
            <span>Blocked</span>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-card rounded-lg border shadow-sm">
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
          className="p-4"
        />
      </div>

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