'use client';

import type { Event } from '@/types';
import confetti from 'canvas-confetti';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface SingleEventProps {
	event: Event;
}

const SingleEvent = ({ event }: SingleEventProps) => {
	const [completed, setCompleted] = useState(false);

	const handleCompleteEvent = () => {
		setCompleted(!completed);

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

	const getStatusConfig = (status: Event['status']) => {
		switch (status) {
			case 'confirmed':
				return { label: 'Confirmed', variant: 'success' };
			case 'pending':
				return { label: 'Pending', variant: 'secondary' };
			case 'urgent':
				return { label: 'Urgent', variant: 'destructive' };
			case 'cancelled':
				return { label: 'Cancelled', variant: 'outline' };
			default:
				return { label: 'Unknown', variant: 'default' };
		}
	};

	const status = getStatusConfig(event.status);

	return (
		<Card
			className={`relative p-4 transition-all duration-200 ${
				completed ? 'opacity-70' : 'hover:shadow-lg'
			}`}
		>
			<CardHeader className='flex justify-between items-start gap-4 p-0'>
				<div className='flex items-start gap-4'>
					<Checkbox
						id={`checkbox-${event.title}`}
						checked={completed}
						onClick={handleCompleteEvent}
						className='w-6 h-6 mt-1 cursor-pointer'
					/>
					<div className='flex flex-col gap-1'>
						<CardTitle
							className={`text-lg ${
								completed
									? 'line-through font-extralight text-muted-foreground'
									: 'font-bold text-card-foreground'
							}`}
						>
							{event.title}
						</CardTitle>
						{event.description && (
							<CardDescription className='text-sm text-muted-foreground leading-relaxed'>
								{event.description}
							</CardDescription>
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
				<Badge variant='outline'>{status.label}</Badge>
			</CardHeader>
		</Card>
	);
};

export default SingleEvent;
