'use client';

import Loading from '@/components/Loading';
import { Alert, AlertDescription } from '@/components/ui/alert';
import CalendarView from './CalendarView';
import EventSheet from './EventSheet';
import { useCalendarLogic } from '../../hooks/useCalendarLogic';

const Calendar = () => {
  const {
    calendarEvents,
    selectedEvent,
    isOpen,
    setIsOpen,
    handleEventClick,
    handleEventDrop,
    error,
    isError,
    isLoading,
  } = useCalendarLogic();

  if (isLoading) return <Loading />;


  return (
    <section className="min-h-screen bg-background p-6">
      {isError && (
        <Alert variant="destructive" className="mb-5">
          <AlertDescription>{error && error.message}</AlertDescription>
        </Alert>
      )}

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-foreground">Calendar</h1>

        <CalendarView
          events={calendarEvents}
          onEventClick={handleEventClick}
          onEventDrop={handleEventDrop}
        />

        <EventSheet
          event={selectedEvent}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    </section>
  );
};

export default Calendar;
