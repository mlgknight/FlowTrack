// store/slices/userSlice.ts
import {
	type PayloadAction,
	createSlice,
	createAsyncThunk,
} from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import loginService from '@/services/login';
import signupService from '@/services/signup';
import type { User } from '../../types';
import { queryClient } from '@/queries/queryClient';
import userService from '@/services/user';

interface UserState {
	user: User | null;
	isOnline: boolean;
	loading: boolean;
	error: string | null;
}

interface DecodedToken {
	exp: number;
	username: string;
	id: string;
	iat?: number;
}

const initialState: UserState = {
	user: null,
	isOnline: false,
	loading: false,
	error: null,
};

export const signupUser = createAsyncThunk(
	'user/signup',
	async (
		credentials: { username: string; name: string; password: string },
		{ rejectWithValue }
	) => {
		try {
			const data = await signupService.signup(credentials);

			const decoded: DecodedToken = jwtDecode(data.token);

			const userCredentials = {
				token: data.token,
				username: data.username,
				tokenExpiry: decoded.exp,
				id: data.id,
			};

			localStorage.setItem('token', data.token);
			localStorage.setItem(
				'loggedEventappUser',
				JSON.stringify(userCredentials)
			);

			return {
				token: data.token,
				username: data.username,
				name: data.name,
				id: data.id,
			};
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue('Signup failed. Please try again.');
		}
	}
);

export const updateUser = createAsyncThunk(
	'user/update',
	async (
		{
			id,
			updates,
		}: { id: number; updates: { username?: string; name?: string } },
		{ rejectWithValue }
	) => {
		try {
			// Call the API - service should accept partial updates
			const updated = await userService.update(id, updates);

			// Preserve stored user / token if present
			const storedRaw = localStorage.getItem('loggedEventappUser');
			const storedUser = storedRaw ? JSON.parse(storedRaw) : null;

			// Build persisted object combining existing storedUser and returned update
			const persisted = {
				...(storedUser ?? {}),
				id: updated.id ?? id,
				username:
					updated.username ?? updates.username ?? storedUser?.username ?? '',
				name: updated.name ?? updates.name ?? storedUser?.name ?? '',
				// Do not require token here; preserve the stored token if exists
				token: storedUser?.token ?? undefined,
				tokenExpiry: storedUser?.tokenExpiry ?? undefined,
			};

			localStorage.setItem('loggedEventappUser', JSON.stringify(persisted));

			// Return a consistent payload for the reducer (token may be undefined)
			return {
				id:
					typeof persisted.id === 'string'
						? Number(persisted.id)
						: persisted.id,
				username: persisted.username,
				name: persisted.name,
				token: persisted.token ?? '',
			} as User;
		} catch (error) {
			return rejectWithValue(
				error instanceof Error ? error.message : 'Failed to update user'
			);
		}
	}
);

export const loginUser = createAsyncThunk(
	'user/login',
	async (
		credentials: { username: string; password: string },
		{ rejectWithValue }
	) => {
		try {
			const data = await loginService.login(credentials);
			const decoded: DecodedToken = jwtDecode(data.token);

			const userCredentials = {
				token: data.token,
				username: data.username,
				id: decoded.id,
				tokenExpiry: decoded.exp,
			};

			localStorage.setItem('token', data.token);
			localStorage.setItem(
				'loggedEventappUser',
				JSON.stringify(userCredentials)
			);

			return {
				token: data.token,
				username: data.username,
				name: data.name,
				id: typeof decoded.id === 'string' ? Number(decoded.id) : decoded.id,
			} as User;
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue('Login failed. Please try again.');
		}
	}
);

export const initializeUser = createAsyncThunk('user/initialize', async () => {
	const storedUser = localStorage.getItem('loggedEventappUser');
	if (!storedUser) return null;

	const userData = JSON.parse(storedUser);
	const currentTime = Date.now() / 1000;

	if (currentTime > userData.tokenExpiry) {
		localStorage.removeItem('token');
		localStorage.removeItem('loggedEventappUser');
		return null;
	}

	// Return id (if present) as a number and the optional name if available
	return {
		token: userData.token,
		username: userData.username,
		id:
			userData?.id !== undefined
				? typeof userData.id === 'string'
					? Number(userData.id)
					: userData.id
				: undefined,
		name: userData?.name ?? undefined,
	} as User;
});

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User | null>) => {
			state.user = action.payload;
			state.isOnline = !!action.payload;
		},
		logout: (state) => {
			queryClient.removeQueries({
				predicate: (query) => query.queryKey[0] === 'events',
			});
			state.user = null;
			state.isOnline = false;
			state.error = null;
			localStorage.removeItem('token');
			localStorage.removeItem('loggedEventappUser');
		},
	},

	extraReducers: (builder) => {
		// Update user
		builder
			.addCase(updateUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
				state.error = null;
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.loading = false;
				state.error = (action.payload as string) || 'Failed to update user';
			});

		// Signup user
		builder
			.addCase(signupUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(signupUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
				state.isOnline = true;
				state.error = null;
				queryClient.removeQueries({
					predicate: (query) => query.queryKey[0] === 'events',
				});
			})
			.addCase(signupUser.rejected, (state, action) => {
				state.loading = false;
				state.error = (action.payload as string) || 'Failed to signup';
			});

		// Login user
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
				state.isOnline = true;
				state.error = null;
				queryClient.removeQueries({
					predicate: (query) => query.queryKey[0] === 'events',
				});
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = (action.payload as string) || 'Failed to login';
			});

		// Initialize user
		builder
			.addCase(initializeUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(initializeUser.fulfilled, (state, action) => {
				state.loading = false;
				if (action.payload) {
					state.user = action.payload;
					state.isOnline = true;
				} else {
					queryClient.removeQueries({
						predicate: (query) => query.queryKey[0] === 'events',
					});
				}
			})
			.addCase(initializeUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to initialize user';
			});
	},
});

// Export the actions
export const { setUser, logout } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
