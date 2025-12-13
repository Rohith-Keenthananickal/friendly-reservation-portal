import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calculator, Info } from 'lucide-react';

interface TaxItem {
  chargeType: string;
  taxable: number;
  cgstRate: number;
  cgst: number;
  sgstRate: number;
  sgst: number;
  igst: number;
}

interface TaxSummaryTabProps {
  taxes: TaxItem[];
}

export const TaxSummaryTab: React.FC<TaxSummaryTabProps> = ({ taxes }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const totals = taxes.reduce(
    (acc, tax) => ({
      taxable: acc.taxable + tax.taxable,
      cgst: acc.cgst + tax.cgst,
      sgst: acc.sgst + tax.sgst,
      igst: acc.igst + tax.igst,
      total: acc.total + tax.cgst + tax.sgst + tax.igst,
    }),
    { taxable: 0, cgst: 0, sgst: 0, igst: 0, total: 0 }
  );

  // HSN wise breakdown (mock data for demonstration)
  const hsnBreakdown = [
    { hsn: '996311', description: 'Accommodation Services', taxable: 27000, cgst: 1620, sgst: 1620, igst: 0 },
    { hsn: '996331', description: 'Food & Beverage Services', taxable: 8500, cgst: 212.5, sgst: 212.5, igst: 0 },
    { hsn: '996411', description: 'Transport Services', taxable: 1500, cgst: 135, sgst: 135, igst: 0 },
    { hsn: '998211', description: 'Laundry Services', taxable: 450, cgst: 40.5, sgst: 40.5, igst: 0 },
    { hsn: '999712', description: 'Spa & Wellness', taxable: 4000, cgst: 360, sgst: 360, igst: 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Tax by Category */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Tax Summary by Category
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Charge Type</TableHead>
                <TableHead className="text-right">Taxable Amount</TableHead>
                <TableHead className="text-center">CGST Rate</TableHead>
                <TableHead className="text-right">CGST Amount</TableHead>
                <TableHead className="text-center">SGST Rate</TableHead>
                <TableHead className="text-right">SGST Amount</TableHead>
                <TableHead className="text-right">IGST Amount</TableHead>
                <TableHead className="text-right">Total Tax</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taxes.map((tax, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{tax.chargeType}</TableCell>
                  <TableCell className="text-right font-mono">{formatCurrency(tax.taxable)}</TableCell>
                  <TableCell className="text-center">{tax.cgstRate}%</TableCell>
                  <TableCell className="text-right font-mono">{formatCurrency(tax.cgst)}</TableCell>
                  <TableCell className="text-center">{tax.sgstRate}%</TableCell>
                  <TableCell className="text-right font-mono">{formatCurrency(tax.sgst)}</TableCell>
                  <TableCell className="text-right font-mono">{formatCurrency(tax.igst)}</TableCell>
                  <TableCell className="text-right font-mono font-semibold">
                    {formatCurrency(tax.cgst + tax.sgst + tax.igst)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/50 font-bold">
                <TableCell>Total</TableCell>
                <TableCell className="text-right font-mono">{formatCurrency(totals.taxable)}</TableCell>
                <TableCell></TableCell>
                <TableCell className="text-right font-mono">{formatCurrency(totals.cgst)}</TableCell>
                <TableCell></TableCell>
                <TableCell className="text-right font-mono">{formatCurrency(totals.sgst)}</TableCell>
                <TableCell className="text-right font-mono">{formatCurrency(totals.igst)}</TableCell>
                <TableCell className="text-right font-mono text-primary">{formatCurrency(totals.total)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* HSN/SAC Wise Breakdown */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">HSN/SAC Wise Tax Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-28">HSN/SAC</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Taxable Amount</TableHead>
                <TableHead className="text-right">CGST</TableHead>
                <TableHead className="text-right">SGST</TableHead>
                <TableHead className="text-right">IGST</TableHead>
                <TableHead className="text-right">Total Tax</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hsnBreakdown.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono font-medium">{item.hsn}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-right font-mono">{formatCurrency(item.taxable)}</TableCell>
                  <TableCell className="text-right font-mono">{formatCurrency(item.cgst)}</TableCell>
                  <TableCell className="text-right font-mono">{formatCurrency(item.sgst)}</TableCell>
                  <TableCell className="text-right font-mono">{formatCurrency(item.igst)}</TableCell>
                  <TableCell className="text-right font-mono font-semibold">
                    {formatCurrency(item.cgst + item.sgst + item.igst)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Note */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          GST calculated as per applicable rates at line-item level. Tax rates may vary based on room tariff 
          (below ₹7,500: 12%, above ₹7,500: 18%) and service type. For inter-state supplies, IGST is applicable 
          instead of CGST + SGST.
        </AlertDescription>
      </Alert>
    </div>
  );
};
