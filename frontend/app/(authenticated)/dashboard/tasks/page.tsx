'use client';
import { useAppSelector } from '../../../../store/hooks';
import EventsList from '@/components/EventsList';
import EventsForm from '../../../../components/EventForm';
import Loading from '@/components/Loading';

const Tasks = () => {
	const loading = useAppSelector((state) => state.events.loading);

	return (
		<section className="min-h-screen bg-background p-6">
			<div className="max-w-7xl mx-auto space-y-6">
				<EventsForm />

				{loading ? <Loading /> : <EventsList />}
			</div>
		</section>
	);
};

export default Tasks;