'use client';

import type { Event } from '../types';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';

interface SingleEventProps {
	event: Event;
}

const SingleEvent = ({ event }: SingleEventProps) => {
	const getStatusConfig = (status: Event['status']) => {
		switch (status) {
			case 'confirmed':
				return {
					label: 'Confirmed',
					className: 'bg-green/10 text-green-800 border border-green/30',
				};
			case 'pending':
				return {
					label: 'Pending',
					className: 'bg-blue-100/10 text-blue-100 border border-blue-100/30',
				};
			case 'urgent':
				return {
					label: 'Urgent',
					className: 'bg-red/10 text-red-800 border border-red/30',
				};
			case 'cancelled':
				return {
					label: 'Cancelled',
					className: 'bg-muted text-muted-foreground border border-border',
				};
			default:
				return {
					label: 'Unknown',
					className: 'bg-muted text-muted-foreground border border-border',
				};
		}
	};

	const handleCompleteEvent = () => {
		const defaults = {
			spread: 360,
			ticks: 50,
			gravity: 0,
			decay: 0.94,
			startVelocity: 30,
			colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8'],
		};

		const shoot = () => {
			confetti({
				...defaults,
				particleCount: 40,
				scalar: 1.2,
				shapes: ['star'],
			});
			confetti({
				...defaults,
				particleCount: 10,
				scalar: 0.75,
				shapes: ['circle'],
			});
		};

		setTimeout(shoot, 0);
		setTimeout(shoot, 100);
		setTimeout(shoot, 200);
	};

	const statusConfig = getStatusConfig(event.status);

	return (
		<li className='bg-card border border-border rounded-lg p-4 hover:border-primary/50 hover:shadow-md transition-all duration-200 group relative'>
			<div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3'>
				<div className='flex-1 space-y-2'>
					<input
						onClick={handleCompleteEvent}
						type='checkbox'
						id={`checkbox-${event.title}`}
					/>
					<h3 className='font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors'>
						{event.title}
					</h3>

					{event.description && (
						<p className='text-sm text-muted-foreground leading-relaxed'>
							{event.description}
						</p>
					)}

					<div className='flex items-center gap-2 text-xs text-muted-foreground'>
						<svg
							className='w-4 h-4'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
							/>
						</svg>
						<span>
							{new Date(event.start).toLocaleString('en-US', {
								month: 'short',
								day: 'numeric',
								hour: 'numeric',
								minute: '2-digit',
							})}
							{event.end &&
								` - ${new Date(event.end).toLocaleString('en-US', {
									month: 'short',
									day: 'numeric',
									hour: 'numeric',
									minute: '2-digit',
								})}`}
						</span>
					</div>
				</div>

				<span
					className={`text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap self-start ${statusConfig.className}`}
				>
					{statusConfig.label}
				</span>
			</div>
		</li>
	);
};

export default SingleEvent;
