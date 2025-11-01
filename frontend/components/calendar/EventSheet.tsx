'use client';

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import type { Event } from '@/types';
import { CalendarClock } from 'lucide-react';

interface EventSheetProps {
	event: Event | null;
	isOpen: boolean;
	onClose: () => void;
}

const EventSheet = ({ event, isOpen, onClose }: EventSheetProps) => {
	if (!event) return null;

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className='flex-col p-5 sm:max-w-md'>
				<SheetHeader>
					<SheetTitle>{event.title}</SheetTitle>
					<hr />
				</SheetHeader>

				<div className='space-y-6 mt-6'>
					<div className='grid grid-cols-1 gap-4'>
						<div>
							<label className='flex gap-2 text-sm font-medium text-muted-foreground'>
								<CalendarClock />
								Start
							</label>
							<p className='text-sm text-foreground mt-1'>
								{new Date(event.start).toLocaleDateString('en-US', {
									weekday: 'short',
									year: 'numeric',
									month: 'short',
									day: 'numeric',
								})}
							</p>
							<p className='font-thin  text-sm'>
								{new Date(event.start).toLocaleTimeString('en-US', {
									hour: 'numeric',
									minute: '2-digit',
									hour12: true,
								})}
							</p>
						</div>
						<div>
							<label className='flex gap-2 text-sm font-medium text-muted-foreground'>
								<CalendarClock />
								End
							</label>
							<p className='text-sm text-foreground mt-1'>
								{event.end
									? new Date(event.end).toLocaleDateString('en-US', {
											weekday: 'short',
											year: 'numeric',
											month: 'short',
											day: 'numeric',
									  })
									: 'No end date'}
							</p>
							<p className='font-thin text-sm'>
								{event.end &&
									new Date(event.end).toLocaleTimeString('en-US', {
										hour: 'numeric',
										minute: '2-digit',
										hour12: true,
									})}
							</p>
						</div>
					</div>

					{event.description && (
						<div>
							<label className='text-sm font-medium text-muted-foreground'>
								Description
							</label>
							<p className='text-sm text-foreground mt-1 bg-muted/50 rounded-md p-3'>
								{event.description}
							</p>
						</div>
					)}

					<div>
						<label className='text-sm font-medium text-muted-foreground'>
							Status
						</label>
						<div className='mt-2'>
							<Badge variant='secondary'>{event.status}</Badge>
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default EventSheet;