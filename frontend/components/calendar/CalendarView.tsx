'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import type { EventClickArg, EventDropArg } from '@fullcalendar/core';
import { Card, CardContent } from '@/components/ui/card';
import { Event } from '@/types'

interface CalendarViewProps {
  events: Event[];
  onEventClick: (info: EventClickArg) => void;
  onEventDrop: (info: EventDropArg) => void;
}

const CalendarView = ({ events, onEventClick, onEventDrop }: CalendarViewProps) => {
  return (
    <Card className="border-border">
      <CardContent className="p-6">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
          }}
          buttonText={{
            today: 'Go to Today',
            month: 'Month View',
            week: 'Week View',
            day: 'Day View',
            list: 'Agenda',
          }}
          initialView="dayGridMonth"
          weekends
          editable
          eventDrop={onEventDrop}
          events={events}
          eventClick={onEventClick}
          eventClassNames="cursor-pointer hover:opacity-80 transition-opacity"
          height="auto"
          firstDay={1}
          selectable
          unselectAuto
          dayHeaderFormat={{ weekday: 'long' }}
        />
      </CardContent>
    </Card>
  );
};

export default CalendarView;
