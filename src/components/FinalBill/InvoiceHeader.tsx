import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface HotelDetails {
  name: string;
  legalName: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
  gstin: string;
}

interface InvoiceDetails {
  number: string;
  date: string;
  financialYear: string;
  placeOfSupply: string;
  type: string;
}

interface InvoiceHeaderProps {
  hotel: HotelDetails;
  invoice: InvoiceDetails;
}

export const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({ hotel, invoice }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <Card className="border-2 print:border print:shadow-none">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hotel Details - Left Column */}
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center shrink-0">
              <img src={hotel.logo} alt={hotel.name} className="w-12 h-12 object-contain" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-foreground">{hotel.legalName}</h2>
              <p className="text-sm text-muted-foreground">{hotel.address}</p>
              <p className="text-sm text-muted-foreground">
                Phone: {hotel.phone} | Email: {hotel.email}
              </p>
              <p className="text-sm font-medium">
                GSTIN: <span className="font-mono">{hotel.gstin}</span>
              </p>
            </div>
          </div>

          {/* Invoice Details - Right Column */}
          <div className="md:text-right space-y-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-sm px-3 py-1">
              {invoice.type}
            </Badge>
            <div className="space-y-1 mt-3">
              <div className="flex md:justify-end gap-2">
                <span className="text-sm text-muted-foreground">Invoice No:</span>
                <span className="text-sm font-mono font-semibold">{invoice.number}</span>
              </div>
              <div className="flex md:justify-end gap-2">
                <span className="text-sm text-muted-foreground">Invoice Date:</span>
                <span className="text-sm font-semibold">{formatDate(invoice.date)}</span>
              </div>
              <div className="flex md:justify-end gap-2">
                <span className="text-sm text-muted-foreground">Financial Year:</span>
                <span className="text-sm">{invoice.financialYear}</span>
              </div>
              <div className="flex md:justify-end gap-2">
                <span className="text-sm text-muted-foreground">Place of Supply:</span>
                <span className="text-sm">{invoice.placeOfSupply}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
