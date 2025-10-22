import {
	type PayloadAction,
	createSlice,
	createAsyncThunk,
} from '@reduxjs/toolkit';
import eventService from '../../services/events';
import type { Event } from '../../types';

interface EventsState {
	eventsList: Event[];
	loading: boolean;
	error: string | null;
}

const initialState: EventsState = {
	eventsList: [],
	loading: false,
	error: null,
};

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
	await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay
	const events = await eventService.getAll();
	return events;
});

export const createEvent = createAsyncThunk(
	'events/createEvent',
	async (newEvent: Event) => {
		const createdEvent = await eventService.create(newEvent);
		return createdEvent;
	}
);

export const eventsSlice = createSlice({
	name: 'events',
	initialState,
	reducers: {
		// Set all events
		setEvents: (state, action: PayloadAction<Event[]>) => {
			state.eventsList = action.payload;
		},

		// Add one event
		addEvent: (state, action: PayloadAction<Event>) => {
			state.eventsList.push(action.payload);
		},

		// Remove an event by ID
		removeEvent: (state, action: PayloadAction<string>) => {
			state.eventsList = state.eventsList.filter(
				(event) => event.id !== action.payload
			);
		},

		// Update an event
		updateEvent: (state, action: PayloadAction<Event>) => {
			const index = state.eventsList.findIndex(
				(event) => event.id === action.payload.id
			);
			if (index !== -1) {
				state.eventsList[index] = action.payload;
			}
		},
	},

	extraReducers: (builder) => {
		// Fetch events
		builder
			.addCase(fetchEvents.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchEvents.fulfilled, (state, action) => {
				state.loading = false;
				state.eventsList = action.payload;
			})
			.addCase(fetchEvents.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch events';
			});

		// Create event
		builder
			.addCase(createEvent.pending, (state) => {
				state.loading = true;
			})
			.addCase(createEvent.fulfilled, (state, action) => {
				state.loading = false;
				state.eventsList.push(action.payload);
			})
			.addCase(createEvent.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to create event';
			});
	},
});

// Export the actions
export const { setEvents, addEvent, removeEvent, updateEvent } = eventsSlice.actions;

// Export the reducer
export default eventsSlice.reducer;
