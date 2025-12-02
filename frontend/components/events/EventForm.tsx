import { type FormEvent, useRef, type Ref } from 'react';
import type { TogglableHandle } from '../Togglable';
import { useCreateEvent } from '@/queries/events';
import Togglable from '../Togglable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface EventFormProps {
	eventFormRef?: Ref<TogglableHandle>;
}

const EventForm = ({ eventFormRef }: EventFormProps) => {
	// Input refs
	const titleRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);
	const startRef = useRef<HTMLInputElement>(null);
	const endRef = useRef<HTMLInputElement>(null);

	const { mutate, error } = useCreateEvent();

	const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const title = titleRef.current?.value.trim();
		const description = descriptionRef.current?.value.trim() || '';
		const start = startRef.current?.value;
		const end = endRef.current?.value || '';

		if (!title || !start) {
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

			mutate(newEvent);

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

	const displayError = error && error.message;

	console.log(error?.message)

	return (
		<div className='w-full max-w-2xl mx-auto'>
			{displayError && (
				<Alert variant="destructive" className="mb-4 animate-in fade-in slide-in-from-top-2 duration-300">
					<AlertDescription>{displayError}</AlertDescription>
				</Alert>
			)}
			<Togglable buttonLabel='Add Event'>
				<Card className="border-border">
					<CardContent className="p-6">
						<form onSubmit={handleFormSubmit} className="space-y-4">
							<div className='space-y-2'>
								<Label htmlFor='title'>
									Event Title <span className='text-destructive'>*</span>
								</Label>
								<Input
									ref={titleRef}
									id='title'
									type='text'
									placeholder='Enter event title'
									required
								/>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='description'>
									Description
								</Label>
								<Textarea
									ref={descriptionRef}
									id='description'
									placeholder='Add a description (optional)'
									rows={3}
								/>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='space-y-2'>
									<Label htmlFor='start'>
										Start Time <span className='text-destructive'>*</span>
									</Label>
									<Input
										ref={startRef}
										id='start'
										type='datetime-local'
										required
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='end'>
										End Time
									</Label>
									<Input
										ref={endRef}
										id='end'
										type='datetime-local'
									/>
								</div>
							</div>

							<Button
								type='submit'
								className='w-full mt-6 cursor-pointer'
								size="lg"
							>
								Save Event
							</Button>
						</form>
					</CardContent>
				</Card>
			</Togglable>
		</div>
	);
};

export default EventForm;