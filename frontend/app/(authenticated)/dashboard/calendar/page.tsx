'use client';

import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'; // ADD THIS
import listPlugin from '@fullcalendar/list'; // ADD THIS (optional)
import interactionPlugin from '@fullcalendar/interaction';
import type { EventClickArg, EventDropArg } from '@fullcalendar/core';
import Loading from '@/components/Loading';
import { useEvents } from '@/queries/events';
import type { Event } from '@/types';
import { useUpdateEvent } from '@/queries/events';

const Calendar = () => {
	const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const { data: events = [], error, isError, isLoading } = useEvents();
	const { mutate: updateEvent } = useUpdateEvent();
	// Map your events to FullCalendar format
	const calendarEvents = events.map((event) => {
		const startDate = new Date(event.start);
		const endDate = event.end ? new Date(event.end) : startDate;
		const durationMs = endDate.getTime() - startDate.getTime();
		const durationDays = durationMs / (1000 * 60 * 60 * 24);

		const isMultiDay = durationDays >= 1;
		const multiDayColor = '#88E788';

		return {
			id: event.id,
			title: event.title,
			start: event.start,
			end: event.end,
			backgroundColor: isMultiDay ? multiDayColor : event.backgroundColor,
			extendedProps: {
				description: event.description,
				status: event.status,
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

		console.log('Event clicked:', {
			title: clickInfo.event.title,
			extendedProps: clickInfo.event.extendedProps,
		});
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

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			{isError ? (
				<div className='mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300'>
					{error.message}
				</div>
			) : (
				''
			)}

			<section className='min-h-screen bg-background p-6'>
				<div className='max-w-7xl mx-auto'>
					<h1 className='text-3xl font-bold mb-6 text-foreground'>Calendar</h1>

					<div className='bg-card border b border-border rounded-lg shadow-sm p-6'>
						<FullCalendar
							plugins={[
								dayGridPlugin,
								interactionPlugin,
								timeGridPlugin,
								listPlugin,
							]}
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
							initialView='dayGridMonth'
							weekends
							editable
							eventDrop={handleEventDrop}
							events={calendarEvents}
							eventClick={handleEventClick}
							eventClassNames='cursor-pointer hover:opacity-80 transition-opacity'
							height='auto'
							firstDay={1}
							selectable
							unselectAuto
							dayHeaderFormat={{ weekday: 'long' }}
						/>
					</div>

					{/* Event Details Preview */}
					{isOpen && selectedEvent && (
						<div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
							<div className='bg-card border border-border rounded-xl shadow-xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200'>
								<div className='flex items-center justify-between mb-4'>
									<h2 className='text-2xl font-semibold text-card-foreground'>
										Event Details
									</h2>
									<button
										onClick={() => setIsOpen(false)}
										className=' cursor-pointer text-muted-foreground hover:text-foreground transition-colors'
									>
										<svg
											className='w-6 h-6'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M6 18L18 6M6 6l12 12'
											/>
										</svg>
									</button>
								</div>

								<div className='space-y-4'>
									<div>
										<label className='text-sm font-medium text-muted-foreground'>
											Title
										</label>
										<p className='text-lg text-card-foreground mt-1'>
											{selectedEvent.title}
										</p>
									</div>

									<div className='flex flex-col gap-4'>
										<div>
											<label className='text-sm font-medium text-muted-foreground'>
												Start
											</label>
											<p className='text-sm text-card-foreground mt-1'>
												{new Date(selectedEvent.start).toLocaleString()}
											</p>
										</div>
										<div>
											<label className='text-sm font-medium text-muted-foreground'>
												End
											</label>
											<p className='text-sm text-card-foreground mt-1'>
												{selectedEvent.end
													? new Date(selectedEvent.end).toLocaleString()
													: 'No End date'}
											</p>
										</div>
									</div>

									{selectedEvent.description && (
										<div>
											<label className='text-sm font-medium text-muted-foreground'>
												Description
											</label>
											<p className='text-sm text-card-foreground mt-1 bg-muted/50 rounded-md p-3'>
												{selectedEvent.description}
											</p>
										</div>
									)}

									<div>
										<label className='text-sm font-medium text-muted-foreground'>
											Status
										</label>
										<span className=' m-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mt-2'>
											{selectedEvent.status}
										</span>
									</div>
								</div>

								<div className='flex gap-3 mt-6'>
									<button
										onClick={() => setIsOpen(false)}
										className=' cursor-pointer flex-1 px-2 py-2.5  bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-opacity'
									>
										Close
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</section>
		</>
	);
};

export default Calendar;
