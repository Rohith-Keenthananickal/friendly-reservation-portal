import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Calendar } from 'lucide-react';

interface GuestDetails {
  name: string;
  mobile: string;
  email: string;
  address: string;
  company?: string;
  gstin?: string;
}

interface ReservationDetails {
  checkIn: string;
  checkOut: string;
  nights: number;
  rooms: string[];
  roomTypes: string[];
  mealPlan: string;
  adults: number;
  children: number;
}

interface GuestReservationInfoProps {
  guest: GuestDetails;
  reservation: ReservationDetails;
  reservationId: string;
}

export const GuestReservationInfo: React.FC<GuestReservationInfoProps> = ({ 
  guest, 
  reservation, 
  reservationId 
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const getMealPlanName = (code: string) => {
    const plans: Record<string, string> = {
      'EP': 'European Plan (Room Only)',
      'CP': 'Continental Plan (Breakfast)',
      'MAP': 'Modified American Plan (Breakfast + Dinner)',
      'AP': 'American Plan (All Meals)',
    };
    return plans[code] || code;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Guest Details */}
      <Card className="print:shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            Guest Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="grid grid-cols-3 gap-2">
            <span className="text-muted-foreground">Name:</span>
            <span className="col-span-2 font-medium">{guest.name}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-muted-foreground">Mobile:</span>
            <span className="col-span-2">{guest.mobile}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-muted-foreground">Email:</span>
            <span className="col-span-2">{guest.email}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-muted-foreground">Address:</span>
            <span className="col-span-2">{guest.address}</span>
          </div>
          {guest.company && (
            <div className="grid grid-cols-3 gap-2">
              <span className="text-muted-foreground">Company:</span>
              <span className="col-span-2">{guest.company}</span>
            </div>
          )}
          {guest.gstin && (
            <div className="grid grid-cols-3 gap-2">
              <span className="text-muted-foreground">GSTIN:</span>
              <span className="col-span-2 font-mono">{guest.gstin}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reservation Details */}
      <Card className="print:shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Reservation Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="grid grid-cols-3 gap-2">
            <span className="text-muted-foreground">Reservation ID:</span>
            <span className="col-span-2 font-mono font-medium">{reservationId}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-muted-foreground">Check-in:</span>
            <span className="col-span-2">{formatDate(reservation.checkIn)}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-muted-foreground">Check-out:</span>
            <span className="col-span-2">{formatDate(reservation.checkOut)}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-muted-foreground">Duration:</span>
            <span className="col-span-2">{reservation.nights} Night(s)</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-muted-foreground">Room(s):</span>
            <span className="col-span-2">{reservation.rooms.join(', ')} ({reservation.roomTypes[0]})</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-muted-foreground">Meal Plan:</span>
            <span className="col-span-2">{getMealPlanName(reservation.mealPlan)}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-muted-foreground">Guests:</span>
            <span className="col-span-2">{reservation.adults} Adults, {reservation.children} Children</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
