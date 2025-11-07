'use client';

// hooks/useAuthGuard.ts
import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { initializeUser, logout } from '@/store/slices/userSlice';

export const useAuthGuard = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { isOnline, user } = useAppSelector((state) => state.user);

	// Centralized logout function
	const handleLogout = useCallback(() => {
		dispatch(logout());
		router.push('/login');
	}, [dispatch, router]);

	// Initialize user and check token expiration
	useEffect(() => {
		dispatch(initializeUser());

		const interval = setInterval(() => {
			const storedUser = localStorage.getItem('loggedEventappUser');

			if (!storedUser) {
				handleLogout();
				return;
			}

			try {
				const userData = JSON.parse(storedUser);
				const currentTime = Date.now() / 1000;

				if (currentTime > userData.tokenExpiry) {
					handleLogout();
				}
			} catch (error) {
				console.log(error);
				handleLogout();
			}
		}, 30000);

		return () => clearInterval(interval);
	}, [dispatch, handleLogout]);

	useEffect(() => {
		if (!isOnline) {
			router.push('/login');
		}
	}, [isOnline, router]);

	return {
		user,
		isOnline,
		dispatch,
		router,
		handleLogout,
	};
};
