// queries/events.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import eventService from '@/services/events';
import type { Event } from '@/types';
import type { NewEvent } from '@/types';
import { useAppSelector } from '@/store/hooks';

// Query keys (good practice)
export const eventKeys = {
    all: ['events'] as const,
    byUser: (username: string) => ['events', username] as const,
};

// Fetch all events for the logged-in user
export const useEvents = () => {
    const { isOnline, user } = useAppSelector((state) => state.user);

    return useQuery<Event[]>({
        queryKey: user?.username ? eventKeys.byUser(user.username) : eventKeys.all,
        queryFn: eventService.getUserEvents,
        enabled: isOnline && !!user?.username, 
    });
};

// Create event
export const useCreateEvent = () => {
    const queryClient = useQueryClient();
    const { user } = useAppSelector((state) => state.user);

    return useMutation({
        mutationFn: (newEvent: NewEvent) => eventService.create(newEvent),
        onSuccess: () => {
            // Refetch events for this specific user
            if (user?.username) {
                queryClient.invalidateQueries({
                    queryKey: eventKeys.byUser(user.username),
                });
            }
        },
    });
};

// Update event
export const useUpdateEvent = () => {
    const queryClient = useQueryClient();
    const { user } = useAppSelector((state) => state.user);

    return useMutation({
        mutationFn: (updatedEvent: Event) =>
            eventService.update(updatedEvent.id, updatedEvent),
        onMutate: async (updatedEvent) => {
            const queryKey = user?.username
                ? eventKeys.byUser(user.username)
                : eventKeys.all;

            await queryClient.cancelQueries({ queryKey });

            const previousEvents = queryClient.getQueryData<Event[]>(queryKey);

            queryClient.setQueryData<Event[]>(queryKey, (old) =>
                old ? old.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)) : []
            );

            return { previousEvents };
        },
        onSuccess: () => {
            // Refetch events after updating
            if (user?.username) {
                queryClient.invalidateQueries({
                    queryKey: eventKeys.byUser(user.username),
                });
            }
        },
    });
};