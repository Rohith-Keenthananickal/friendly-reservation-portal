
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';

interface DocumentUploadProps {
  userType: string;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ userType }) => {
  return (
    <Card className="shadow-sm border-border/40 fade-up delay-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">ID Document Upload</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="frontSide">Front Side of ID</Label>
            <div className="input-file-wrapper flex items-center justify-center border-2 border-dashed border-border p-4 h-36">
              <div className="text-center">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Click or drag and drop to upload
                </p>
                <input
                  id="frontSide"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="backSide">Back Side of ID</Label>
            <div className="input-file-wrapper flex items-center justify-center border-2 border-dashed border-border p-4 h-36">
              <div className="text-center">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Click or drag and drop to upload
                </p>
                <input
                  id="backSide"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentUpload;
