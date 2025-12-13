import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, ListFilter } from 'lucide-react';

interface ChargeItem {
  date: string;
  description: string;
  hsn: string;
  qty: number;
  rate: number;
  amount: number;
}

interface ChargesBreakdownTabProps {
  roomCharges: ChargeItem[];
  fbCharges: ChargeItem[];
  additionalServices: ChargeItem[];
}

export const ChargesBreakdownTab: React.FC<ChargesBreakdownTabProps> = ({
  roomCharges,
  fbCharges,
  additionalServices,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };
  };

  // Combine all charges with type indicator
  const allCharges = [
    ...roomCharges.map(c => ({ ...c, type: 'ROOM', outlet: 'Front Desk' })),
    ...fbCharges.map(c => ({ ...c, type: 'F&B', outlet: 'Restaurant' })),
    ...additionalServices.map(c => ({ ...c, type: 'SERVICE', outlet: 'Various' })),
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const getTypeBadge = (type: string) => {
    const styles: Record<string, string> = {
      'ROOM': 'bg-blue-100 text-blue-800 border-blue-200',
      'F&B': 'bg-orange-100 text-orange-800 border-orange-200',
      'SERVICE': 'bg-purple-100 text-purple-800 border-purple-200',
    };
    return styles[type] || 'bg-gray-100 text-gray-800';
  };

  const totalAmount = allCharges.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <ListFilter className="h-5 w-5 text-primary" />
            Detailed Charges Breakdown
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Total Items: {allCharges.length}
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-32">Date & Time</TableHead>
              <TableHead className="w-24">Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-28">Outlet/Source</TableHead>
              <TableHead className="w-24 text-center">HSN/SAC</TableHead>
              <TableHead className="w-16 text-center">Qty</TableHead>
              <TableHead className="w-24 text-right">Rate</TableHead>
              <TableHead className="w-28 text-right">Amount</TableHead>
              <TableHead className="w-16 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allCharges.map((item, index) => {
              const { date } = formatDateTime(item.date);
              return (
                <TableRow key={index} className="hover:bg-muted/30">
                  <TableCell>
                    <div className="text-sm">
                      <p className="font-medium">{date}</p>
                      <p className="text-muted-foreground text-xs">10:00 AM</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getTypeBadge(item.type)}>
                      {item.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{item.description}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{item.outlet}</TableCell>
                  <TableCell className="text-center font-mono text-sm">{item.hsn}</TableCell>
                  <TableCell className="text-center">{item.qty}</TableCell>
                  <TableCell className="text-right font-mono">{formatCurrency(item.rate)}</TableCell>
                  <TableCell className="text-right font-mono font-medium">{formatCurrency(item.amount)}</TableCell>
                  <TableCell className="text-center">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Pencil className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        
        {/* Total Row */}
        <div className="flex justify-end p-4 bg-muted/30 border-t">
          <div className="flex gap-8">
            <span className="font-semibold">Total Charges:</span>
            <span className="font-mono font-bold text-lg">{formatCurrency(totalAmount)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
