'use client';

import type { Event } from '../types';
import confetti from 'canvas-confetti';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

interface SingleEventProps {
	event: Event;
}

// animate-[spin_2s_ease-in-out] add to checkmark on complete

const SingleEvent = ({ event }: SingleEventProps) => {
	const [toggle, setToggle] = useState<boolean>(false);

	let eventClassNames: string;
	let textClassNames: string;

	if (toggle) {
		eventClassNames =
			'relative bg-card border border-green-400 rounded-xl p-6 shadow-md opacity-70 transition-all duration-200';
		textClassNames =
			'font-extralight text-lg text-muted-foreground line-through transition-colors';
	} else {
		eventClassNames =
			'relative bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-200 group';
		textClassNames =
			'font-bold text-lg text-card-foreground group-hover:text-primary transition-colors';
	}

	const getStatusConfig = (status: Event['status']) => {
		switch (status) {
			case 'confirmed':
				return {
					label: 'Confirmed',
					className: 'bg-green-100 text-green-800 border border-green-200',
				};
			case 'pending':
				return {
					label: 'Pending',
					className: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
				};
			case 'urgent':
				return {
					label: 'Urgent',
					className: 'bg-red-100 text-red-800 border border-red-200',
				};
			case 'cancelled':
				return {
					label: 'Cancelled',
					className: 'bg-gray-200 text-gray-600 border border-gray-300',
				};
			default:
				return {
					label: 'Unknown',
					className: 'bg-muted text-muted-foreground border border-border',
				};
		}
	};

	const handleCompleteEvent = () => {
		setToggle(!toggle);
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
		<li className={eventClassNames}>
			<div className='flex flex-row items-start justify-between gap-4'>
				<div className='flex items-start gap-4'>
					<Checkbox
						className='cursor-pointer rounded-xl w-6 h-6 mt-1'
						onClick={handleCompleteEvent}
						id={`checkbox-${event.title}`}
					/>
					<div className='flex flex-col gap-1'>
						<h3 className={textClassNames}>{event.title}</h3>
						{event.description && (
							<p className='text-sm text-muted-foreground leading-relaxed'>
								{event.description}
							</p>
						)}
						<div className='flex items-center gap-2 text-xs text-muted-foreground mt-2'>
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
