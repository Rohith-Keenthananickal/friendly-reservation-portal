import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePickerWithRange } from '@/components/Reservation/DatePickerWithRange';
import { Search, AlertTriangle, LogOut } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const TopSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bookingModeFilter, setBookingModeFilter] = useState('all');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  return (
    <div className="border-b bg-background p-4">
      {/* Top Bar - User Details */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settlement Management</h1>
          <p className="text-muted-foreground">Manage payments and financial settlements</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Outstanding Payment Button */}
          <Button 
            variant="outline" 
            className="border-orange-200 text-orange-700 hover:bg-orange-50"
            asChild
          >
            <Link to="/settlement/outstanding">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Outstanding Payments
            </Link>
          </Button>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-3 cursor-pointer">
              <Avatar>
                <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
              <div className="text-right hidden md:block">
                <p className="font-medium text-sm">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@accessrooms.com</p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by guest name or reservation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={bookingModeFilter} onValueChange={setBookingModeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by booking mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Booking Modes</SelectItem>
            <SelectItem value="Access Rooms">Access Rooms</SelectItem>
            <SelectItem value="OTA">OTA</SelectItem>
            <SelectItem value="Agent">Agent</SelectItem>
            <SelectItem value="Company">Company</SelectItem>
            <SelectItem value="Direct">Direct</SelectItem>
          </SelectContent>
        </Select>

        <DatePickerWithRange
          date={dateRange}
          setDate={setDateRange}
        />

        <div className="flex space-x-2">
          <Button className="flex-1">Apply Filters</Button>
          <Button variant="outline" className="flex-1">Reset</Button>
        </div>
      </div>
    </div>
  );
};

export default TopSection;