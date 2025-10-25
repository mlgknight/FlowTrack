'use client';

import EventsList from '@/components/EventsList';
import EventsForm from '../../../../components/EventForm';

const Tasks = () => {
	return (
		<section className='min-h-screen bg-background p-6'>
			<div className='max-w-7xl mx-auto space-y-6'>
				<EventsForm />

				<EventsList />
			</div>
		</section>
	);
};

export default Tasks;
