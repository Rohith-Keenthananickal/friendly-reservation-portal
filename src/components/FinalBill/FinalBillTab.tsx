import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Building2, Utensils, Sparkles, Tag, Calculator } from 'lucide-react';

interface ChargeItem {
  date: string;
  description: string;
  hsn: string;
  qty: number;
  rate: number;
  amount: number;
}

interface Discount {
  name: string;
  amount: number;
  reason: string;
}

interface TaxItem {
  chargeType: string;
  taxable: number;
  cgstRate: number;
  cgst: number;
  sgstRate: number;
  sgst: number;
  igst: number;
}

interface Summary {
  subTotal: number;
  totalDiscount: number;
  taxableAmount: number;
  totalGst: number;
  grandTotal: number;
  totalPaid: number;
  balance: number;
}

interface FinalBillTabProps {
  roomCharges: ChargeItem[];
  fbCharges: ChargeItem[];
  additionalServices: ChargeItem[];
  discounts: Discount[];
  taxes: TaxItem[];
  summary: Summary;
}

export const FinalBillTab: React.FC<FinalBillTabProps> = ({
  roomCharges,
  fbCharges,
  additionalServices,
  discounts,
  taxes,
  summary,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
    });
  };

  const ChargesTable = ({ 
    items, 
    icon, 
    title 
  }: { 
    items: ChargeItem[]; 
    icon: React.ReactNode; 
    title: string;
  }) => (
    <Card className="print:shadow-none print:border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-24">Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-24 text-center">HSN/SAC</TableHead>
              <TableHead className="w-16 text-center">Qty</TableHead>
              <TableHead className="w-24 text-right">Rate</TableHead>
              <TableHead className="w-28 text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-mono text-sm">{formatDate(item.date)}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell className="text-center font-mono text-sm">{item.hsn}</TableCell>
                <TableCell className="text-center">{item.qty}</TableCell>
                <TableCell className="text-right font-mono">{formatCurrency(item.rate)}</TableCell>
                <TableCell className="text-right font-mono font-medium">{formatCurrency(item.amount)}</TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-muted/30 font-medium">
              <TableCell colSpan={5} className="text-right">Sub Total:</TableCell>
              <TableCell className="text-right font-mono">
                {formatCurrency(items.reduce((sum, item) => sum + item.amount, 0))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Room Charges */}
      <ChargesTable 
        items={roomCharges} 
        icon={<Building2 className="h-4 w-4 text-primary" />} 
        title="Room Charges" 
      />

      {/* Food & Beverage */}
      <ChargesTable 
        items={fbCharges} 
        icon={<Utensils className="h-4 w-4 text-primary" />} 
        title="Food & Beverage" 
      />

      {/* Additional Services */}
      <ChargesTable 
        items={additionalServices} 
        icon={<Sparkles className="h-4 w-4 text-primary" />} 
        title="Additional Services" 
      />

      {/* Discounts & Adjustments */}
      {discounts.length > 0 && (
        <Card className="border-dashed bg-green-50/50 dark:bg-green-950/20 print:shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2 text-green-700 dark:text-green-400">
              <Tag className="h-4 w-4" />
              Discounts & Adjustments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {discounts.map((discount, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium text-green-700 dark:text-green-400">{discount.name}</p>
                    <p className="text-sm text-muted-foreground">{discount.reason}</p>
                  </div>
                  <span className="font-mono font-semibold text-green-700 dark:text-green-400">
                    -{formatCurrency(discount.amount)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tax Breakdown */}
      <Card className="print:shadow-none print:border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Calculator className="h-4 w-4 text-primary" />
            Tax Breakdown (GST)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Charge Type</TableHead>
                <TableHead className="text-right">Taxable Amount</TableHead>
                <TableHead className="text-center">CGST %</TableHead>
                <TableHead className="text-right">CGST</TableHead>
                <TableHead className="text-center">SGST %</TableHead>
                <TableHead className="text-right">SGST</TableHead>
                <TableHead className="text-right">IGST</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taxes.map((tax, index) => (
                <TableRow key={index}>
                  <TableCell>{tax.chargeType}</TableCell>
                  <TableCell className="text-right font-mono">{formatCurrency(tax.taxable)}</TableCell>
                  <TableCell className="text-center">{tax.cgstRate}%</TableCell>
                  <TableCell className="text-right font-mono">{formatCurrency(tax.cgst)}</TableCell>
                  <TableCell className="text-center">{tax.sgstRate}%</TableCell>
                  <TableCell className="text-right font-mono">{formatCurrency(tax.sgst)}</TableCell>
                  <TableCell className="text-right font-mono">{formatCurrency(tax.igst)}</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/30 font-medium">
                <TableCell>Total</TableCell>
                <TableCell className="text-right font-mono">
                  {formatCurrency(taxes.reduce((sum, t) => sum + t.taxable, 0))}
                </TableCell>
                <TableCell></TableCell>
                <TableCell className="text-right font-mono">
                  {formatCurrency(taxes.reduce((sum, t) => sum + t.cgst, 0))}
                </TableCell>
                <TableCell></TableCell>
                <TableCell className="text-right font-mono">
                  {formatCurrency(taxes.reduce((sum, t) => sum + t.sgst, 0))}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {formatCurrency(taxes.reduce((sum, t) => sum + t.igst, 0))}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Final Amount Summary */}
      <Card className="bg-primary/5 border-primary/20 print:shadow-none">
        <CardContent className="p-6">
          <div className="max-w-md ml-auto space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Sub Total</span>
              <span className="font-mono">{formatCurrency(summary.subTotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount</span>
              <span className="font-mono">-{formatCurrency(summary.totalDiscount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Taxable Amount</span>
              <span className="font-mono">{formatCurrency(summary.taxableAmount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total GST</span>
              <span className="font-mono">{formatCurrency(summary.totalGst)}</span>
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between text-xl font-bold">
              <span>Grand Total</span>
              <span className="font-mono text-primary">{formatCurrency(summary.grandTotal)}</span>
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between text-sm text-green-600">
              <span>Total Paid</span>
              <span className="font-mono">{formatCurrency(summary.totalPaid)}</span>
            </div>
            <div className={`flex justify-between font-semibold ${summary.balance > 0 ? 'text-amber-600' : 'text-green-600'}`}>
              <span>{summary.balance > 0 ? 'Balance Due' : 'Amount Settled'}</span>
              <span className="font-mono">{formatCurrency(Math.abs(summary.balance))}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
