import {
	type PayloadAction,
	createSlice,
	createAsyncThunk,
} from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import loginService from '../../services/login';
import type { User } from '../../types';

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

export const loginUser = createAsyncThunk(
	'user/login',
	async (credentials: { username: string; password: string }) => {
		const data = await loginService.login(credentials);
		const decoded: DecodedToken = jwtDecode(data.token);

		const userCredentials = {
			token: data.token,
			username: data.username,
			tokenExpiry: decoded.exp,
		};

		localStorage.setItem('token', data.token);
		localStorage.setItem('loggedEventappUser', JSON.stringify(userCredentials));

		return { token: data.token, username: data.username };
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
			state.user = null;
			state.isOnline = false;
			state.error = null;
			localStorage.removeItem('token');
			localStorage.removeItem('loggedEventappUser');
		},
	},

	extraReducers: (builder) => {
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
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to login';
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
