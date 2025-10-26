// types.ts

export interface Event {
	id: string;
	title: string;
	description?: string;
	start: string; // ISO date string (e.g., "2025-10-19T14:30:00.000Z")
	end?: string; // ISO date string
	status?: 'confirmed' | 'pending' | 'urgent' | 'cancelled';
	backgroundColor?: string;
	user?: string; // User ID as string
}

export type NewEvent = Omit<Event, 'id'>;

export interface User {
	token: string;
	username?: string;
	name?: string;
	id?: string;
}
