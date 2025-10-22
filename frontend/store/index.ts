'use client';

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import eventsReducer from './slices/eventsSlice';
import type { User } from '../types';

export const store = configureStore({
	reducer: {
		user: userReducer,
		events: eventsReducer,
	},
});

// Load user from localStorage after store is created
if (typeof window !== 'undefined') {
	const storedUser = localStorage.getItem('loggedEventappUser');
	if (storedUser) {
		try {
			const parsedUser: User = JSON.parse(storedUser);
			store.dispatch({ type: 'user/setUser', payload: parsedUser });
		} catch (error) {
			console.error('Failed to parse stored user:', error);
			localStorage.removeItem('loggedEventappUser');
		}
	}
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
