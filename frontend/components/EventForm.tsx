import {
	type FormEvent,
	useRef,
	type Ref,
	useState,
	useEffect,
} from 'react';
import type { TogglableHandle } from './Togglable';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createEvent } from '../store/slices/eventsSlice';

interface EventFormProps {
	eventFormRef?: Ref<TogglableHandle>;
}

const EventForm = ({ eventFormRef }: EventFormProps) => {
	const dispatch = useAppDispatch();

	// Input refs
	const titleRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);
	const startRef = useRef<HTMLInputElement>(null);
	const endRef = useRef<HTMLInputElement>(null);

	const apiError = useAppSelector((state) => state.events.error);
	const [validationError, setValidationError] = useState<string | null>(null);

	// Auto-clear validation error
	useEffect(() => {
		if (validationError) {
			const timer = setTimeout(() => setValidationError(null), 5000);
			return () => clearTimeout(timer);
		}
	}, [validationError]);

	// Auto-clear API error
	useEffect(() => {
		if (apiError) {
			const timer = setTimeout(() => {
				// dispatch(clearError()) if you implement it
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [apiError]);

	const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const title = titleRef.current?.value.trim();
		const description = descriptionRef.current?.value.trim() || '';
		const start = startRef.current?.value;
		const end = endRef.current?.value || '';

		if (!title || !start) {
			setValidationError('Title and start date are required');
			return;
		}

		try {
			const newEvent = {
				title,
				description,
				start,
				end: end || undefined,
				status: 'confirmed' as const,
				backgroundColor: '#3B82F6',
			};

			await dispatch(createEvent(newEvent)).unwrap();

			// Clear fields
			if (titleRef.current) titleRef.current.value = '';
			if (descriptionRef.current) descriptionRef.current.value = '';
			if (startRef.current) startRef.current.value = '';
			if (endRef.current) endRef.current.value = '';

			// Close form if togglable ref is provided
			if (
				eventFormRef &&
				typeof eventFormRef === 'object' &&
				'current' in eventFormRef
			) {
				eventFormRef.current?.toggleVisibility();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const displayError = validationError || apiError;

	return (
		<div className='w-full max-w-2xl mx-auto'>
			{displayError && (
				<div className='mb-4 p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300'>
					{displayError}
				</div>
			)}
			<form className='bg-card border border-border rounded-xl shadow-lg p-6 space-y-4' onSubmit={handleFormSubmit}>
				<div className='space-y-2'>
					<label htmlFor='title' className='block text-sm font-medium text-card-foreground'>
						Event Title <span className='text-destructive'>*</span>
					</label>
					<input 
						ref={titleRef}
						id='title'
						type='text'
						placeholder='Enter event title'
						required
						className='w-full px-4 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all'
					/>
				</div>

				<div className='space-y-2'>
					<label htmlFor='description' className='block text-sm font-medium text-card-foreground'>
						Description
					</label>
					<textarea 
						ref={descriptionRef}
						id='description'
						placeholder='Add a description (optional)'
						rows={3}
						className='w-full px-4 py-2.5 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all resize-none'
					/>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div className='space-y-2'>
						<label htmlFor='start' className='block text-sm font-medium text-card-foreground'>
							Start Time <span className='text-destructive'>*</span>
						</label>
						<input 
							ref={startRef}
							id='start'
							type='datetime-local'
							required
							className='w-full px-4 py-2.5 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all'
						/>
					</div>

					<div className='space-y-2'>
						<label htmlFor='end' className='block text-sm font-medium text-card-foreground'>
							End Time
						</label>
						<input 
							ref={endRef}
							id='end'
							type='datetime-local'
							className='w-full px-4 py-2.5 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all'
						/>
					</div>
				</div>

				<button 
					type='submit'
					className='w-full mt-6 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
				>
					Save Event
				</button>
			</form>
		</div>
	);
};

export default EventForm;