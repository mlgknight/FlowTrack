'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import type { Event } from '@/types';

interface EventSheetProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventSheet = ({ event, isOpen, onClose }: EventSheetProps) => {
  if (!event) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="p-3 sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Event Details</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Title</label>
            <p className="text-lg font-semibold text-foreground mt-1">{event.title}</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Start</label>
              <p className="text-sm text-foreground mt-1">{new Date(event.start).toLocaleString()}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">End</label>
              <p className="text-sm text-foreground mt-1">{event.end ? new Date(event.end).toLocaleString() : 'No End date'}</p>
            </div>
          </div>

          {event.description && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">Description</label>
              <p className="text-sm text-foreground mt-1 bg-muted/50 rounded-md p-3">{event.description}</p>
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-muted-foreground">Status</label>
            <div className="mt-2">
              <Badge variant="secondary">{event.status}</Badge>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EventSheet;
