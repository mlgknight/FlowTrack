'use client';

import SingleEvent from '@/components/SingleEvent';
import { useEvents } from '@/queries/events';
import Loading from '@/components/Loading';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

const EventsList = () => {
	const { data: events = [], error, isError, isLoading } = useEvents();

	if (isLoading) {
		return <Loading />;
	}

	return (
		<section className='w-full max-w-4xl mx-auto space-y-6'>
			{isError && (
				<Alert
					variant='destructive'
					className='animate-in fade-in slide-in-from-top-2 duration-300'
				>
					<AlertDescription>{error.message}</AlertDescription>
				</Alert>
			)}

			{/* In Progress Section */}
			<Card>
				<CardHeader>
					<CardTitle className='text-xl'>In Progress</CardTitle>
				</CardHeader>
				<CardContent>
					{events.length === 0 ? (
						<div className='flex flex-col items-center justify-center py-16 px-4 text-center'>
							<div className='text-6xl mb-4 opacity-50'>📋</div>
							<h3 className='text-xl font-semibold text-foreground mb-2'>
								No events yet
							</h3>
							<p className='text-muted-foreground max-w-md'>
								Create your first event to get started with organizing your
								schedule
							</p>
						</div>
					) : (
						<ul className='space-y-3'>
							{events.map((event) => (
								<SingleEvent key={event.id} event={event} />
							))}
						</ul>
					)}
				</CardContent>
			</Card>

			{/* Complete Section */}
			<Card>
				<CardHeader>
					<CardTitle className='text-xl'>Complete</CardTitle>
					<CardDescription>
						Your completed events will appear here
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='flex flex-col items-center justify-center py-12 px-4 text-center'>
						<div className='text-4xl mb-3 opacity-40'>✅</div>
						<p className='text-muted-foreground'>No completed events yet</p>
					</div>
				</CardContent>
			</Card>
		</section>
	);
};

export default EventsList;
