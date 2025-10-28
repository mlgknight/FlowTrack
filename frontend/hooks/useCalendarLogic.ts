import { useState } from 'react';
import { useEvents, useUpdateEvent } from '@/queries/events';
import type { EventClickArg, EventDropArg } from '@fullcalendar/core';
import type { Event } from '@/types';

export const useCalendarLogic = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data: events = [], error, isError, isLoading } = useEvents();
  const { mutate: updateEvent } = useUpdateEvent();

  // Map API events to FullCalendar format
  const calendarEvents = events.map((event) => {
    const startDate = new Date(event.start);
    const endDate = event.end ? new Date(event.end) : startDate;
    const isMultiDay = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) >= 1;

    return {
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      backgroundColor: isMultiDay ? '#88E788' : event.backgroundColor,
      extendedProps: {
        description: event.description,
        status: event.status,
        user: event.user,
      },
    };
  });

  const handleEventClick = (clickInfo: EventClickArg) => {
    setSelectedEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.start?.toISOString() || '',
      end: clickInfo.event.end?.toISOString(),
      description: clickInfo.event.extendedProps['description'] as string,
      status: clickInfo.event.extendedProps['status'] as Event['status'],
      backgroundColor: clickInfo.event.backgroundColor,
      user: (clickInfo.event.extendedProps['user'] as string) || '',
    });
    setIsOpen(true);
  };

  const handleEventDrop = (dropInfo: EventDropArg) => {
    updateEvent({
      id: dropInfo.event.id,
      title: dropInfo.event.title,
      start: dropInfo.event.start?.toISOString() || '',
      end: dropInfo.event.end?.toISOString(),
      description: dropInfo.event.extendedProps['description'] as string,
      status: dropInfo.event.extendedProps['status'] as Event['status'],
      backgroundColor: dropInfo.event.backgroundColor,
      user: (dropInfo.event.extendedProps['user'] as string) || '',
    });
  };

  return {
    calendarEvents,
    selectedEvent,
    isOpen,
    setIsOpen,
    handleEventClick,
    handleEventDrop,
    error,
    isError,
    isLoading,
  };
};
