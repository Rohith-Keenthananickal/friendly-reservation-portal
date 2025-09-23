import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, User, Search, CreditCard } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface TopSectionProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  bookingMode: string;
  setBookingMode: (value: string) => void;
  dateRange: { from?: Date; to?: Date };
  setDateRange: (range: { from?: Date; to?: Date }) => void;
}

const TopSection: React.FC<TopSectionProps> = ({
  searchTerm,
  setSearchTerm,
  bookingMode,
  setBookingMode,
  dateRange,
  setDateRange,
}) => {
  return (
    <Card className="p-6 mb-6">
      {/* User Details Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Accounts Dashboard</h1>
          <p className="text-muted-foreground">Manage bookings and payments</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <span className="font-medium">John Doe</span>
          </div>
          <Button variant="outline" size="sm">
            Logout
          </Button>
        </div>
      </div>

      {/* Search & Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by Guest Name or Reservation Number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={bookingMode} onValueChange={setBookingMode}>
          <SelectTrigger>
            <SelectValue placeholder="Select Booking Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Modes</SelectItem>
            <SelectItem value="access-rooms">Access Rooms</SelectItem>
            <SelectItem value="ota">OTA</SelectItem>
            <SelectItem value="agent">Agent</SelectItem>
            <SelectItem value="company">Company</SelectItem>
            <SelectItem value="direct">Direct</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left font-normal",
                !dateRange.from && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd")} - {format(dateRange.to, "LLL dd")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={{ from: dateRange.from, to: dateRange.to }}
              onSelect={(range) => setDateRange(range || {})}
              numberOfMonths={2}
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>

        <Link to="/accounts/outstanding">
          <Button className="w-full">
            <CreditCard className="mr-2 h-4 w-4" />
            Outstanding Payment
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default TopSection;