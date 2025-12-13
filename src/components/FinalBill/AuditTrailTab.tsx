import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { History, User, Clock, FileText } from 'lucide-react';

interface AuditEntry {
  action: string;
  by: string;
  date: string;
  notes: string;
}

interface AuditTrailTabProps {
  audit: AuditEntry[];
}

export const AuditTrailTab: React.FC<AuditTrailTabProps> = ({ audit }) => {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      time: date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  };

  const getActionBadge = (action: string) => {
    if (action.includes('Created')) return 'bg-green-100 text-green-800';
    if (action.includes('Modified') || action.includes('Updated')) return 'bg-blue-100 text-blue-800';
    if (action.includes('Payment')) return 'bg-purple-100 text-purple-800';
    if (action.includes('Check')) return 'bg-amber-100 text-amber-800';
    if (action.includes('Discount')) return 'bg-cyan-100 text-cyan-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          Audit Trail & Activity Log
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
          
          <div className="space-y-6">
            {audit.map((entry, index) => {
              const { date, time } = formatDateTime(entry.date);
              return (
                <div key={index} className="relative pl-10">
                  {/* Timeline dot */}
                  <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-background" />
                  
                  <div className="bg-muted/30 rounded-lg p-4 border">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <Badge variant="secondary" className={getActionBadge(entry.action)}>
                        {entry.action}
                      </Badge>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{entry.by}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{date} at {time}</span>
                        </div>
                      </div>
                    </div>
                    {entry.notes && (
                      <div className="flex items-start gap-2 mt-2 text-sm">
                        <FileText className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{entry.notes}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
