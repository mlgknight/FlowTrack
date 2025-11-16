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
			console.error('🔴 Thunk: Signup failed:', error);
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue('Signup failed. Please try again.');
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

			return { token: data.token, username: data.username };
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

	return { token: userData.token, username: userData.username };
});

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// Action to set user
		setUser: (state, action: PayloadAction<User | null>) => {
			state.user = action.payload;
			state.isOnline = !!action.payload;
		},

		// Action to logout
		logout: (state) => {
			// Remove ALL event queries (including user-specific ones)
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
				// Remove ALL event queries when new user signs up
				queryClient.removeQueries({
					predicate: (query) => query.queryKey[0] === 'events',
				});
			})
			.addCase(signupUser.rejected, (state, action) => {
				console.error('❌ Redux: Signup rejected', action.payload);
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
				// Remove ALL event queries when new user logs in
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
					// No valid user found, clear ALL event queries
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
