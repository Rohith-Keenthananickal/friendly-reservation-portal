import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { QrCode, FileCheck } from 'lucide-react';

export const InvoiceFooter: React.FC = () => {
  return (
    <Card className="mt-6 print:shadow-none print:border">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* QR Code Placeholder */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
              <QrCode className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="text-sm">
              <p className="font-medium">Scan for e-Invoice</p>
              <p className="text-muted-foreground text-xs">IRN verification</p>
            </div>
          </div>

          {/* Authorized Signatory */}
          <div className="text-center">
            <div className="h-16 border-b border-dashed mb-2" />
            <p className="text-sm font-medium">Authorized Signatory</p>
            <p className="text-xs text-muted-foreground">For Grand Palace Hospitality Pvt. Ltd.</p>
          </div>

          {/* Guest Signature */}
          <div className="text-center">
            <div className="h-16 border-b border-dashed mb-2" />
            <p className="text-sm font-medium">Guest Signature</p>
            <p className="text-xs text-muted-foreground">Acknowledgement of receipt</p>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Legal Text */}
        <div className="space-y-3 text-xs text-muted-foreground">
          <div className="flex items-start gap-2">
            <FileCheck className="h-4 w-4 shrink-0 mt-0.5" />
            <p>
              This is a computer-generated invoice and does not require a physical signature. 
              The invoice is valid subject to realization of payment.
            </p>
          </div>
          
          <p>
            <strong>GST Declaration:</strong> We declare that this invoice shows the actual price of the 
            goods/services described and that all particulars are true and correct. Tax is payable on 
            reverse charge basis: No.
          </p>
          
          <p>
            <strong>Subject to jurisdiction:</strong> All disputes arising out of this invoice shall be 
            subject to the exclusive jurisdiction of courts in Mumbai, Maharashtra.
          </p>
          
          <div className="pt-2">
            <a href="#" className="text-primary hover:underline">Terms & Conditions</a>
            {' • '}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            {' • '}
            <a href="#" className="text-primary hover:underline">Cancellation Policy</a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
