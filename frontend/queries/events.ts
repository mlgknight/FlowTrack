// queries/events.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import eventService from '@/services/events';
import type { Event } from '@/types';
import type { NewEvent } from '@/types'

// Query keys (good practice)
export const eventKeys = {
	all: ['events'] as const,
};

// Fetch all events
export const useEvents = () => {
	return useQuery<Event[]>({
		queryKey: eventKeys.all,
		queryFn: eventService.getAll,
	});
};

// Create event
export const useCreateEvent = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (newEvent: NewEvent) => eventService.create(newEvent),
		onSuccess: () => {
			// Refetch events after creating
			queryClient.invalidateQueries({ queryKey: eventKeys.all });
		},
	});
};

// Update event
export const useUpdateEvent = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (updatedEvent: Event) =>
			eventService.update(updatedEvent.id, updatedEvent),
		onSuccess: () => {
			// Refetch events after updating
			queryClient.invalidateQueries({ queryKey: eventKeys.all });
		},
	});
};
