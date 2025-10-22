import SingleEvent from '@/components/SingleEvent';
import { useAppSelector } from '@/store/hooks';

const EventsList = () => {
	const eventsList = useAppSelector((state) => state.events.eventsList);
	const apiError = useAppSelector((state) => state.events.error);

	return (
		<div className='w-full max-w-4xl mx-auto'>
			{apiError && (
				<div className='mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300'>
					{apiError}
				</div>
			)}

			{eventsList.length === 0 ? (
				<div className='flex flex-col items-center justify-center py-16 px-4 text-center'>
					<div className='text-6xl mb-4 opacity-50'>📋</div>
					<h3 className='text-xl font-semibold text-foreground mb-2'>
						No events yet
					</h3>
					<p className='text-muted-foreground max-w-md'>
						Create your first event to get started with organizing your schedule
					</p>
				</div>
			) : (
				<ul className='space-y-3'>
					{eventsList.map((event) => (
						<SingleEvent key={event.id} event={event} />
					))}
				</ul>
			)}
		</div>
	);
};

export default EventsList;
