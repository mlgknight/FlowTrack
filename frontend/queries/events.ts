// queries/events.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import eventService from '../services/events';
import type { Event } from '../types';

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
		mutationFn: (newEvent: Event) => eventService.create(newEvent),
		onSuccess: () => {
			// Refetch events after creating
			queryClient.invalidateQueries({ queryKey: eventKeys.all });
		},
	});
};
