// hooks/useAuthGuard.ts
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { initializeUser, logout } from '@/store/slices/userSlice';

export const useAuthGuard = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { isOnline, user } = useAppSelector((state) => state.user);

	// Initialize user and check token expiration
	useEffect(() => {
		dispatch(initializeUser());

		const interval = setInterval(() => {
			const storedUser = localStorage.getItem('loggedEventappUser');

			if (!storedUser) {
				dispatch(logout());
				router.push('/login');
				return;
			}

			try {
				const userData = JSON.parse(storedUser);
				const currentTime = Date.now() / 1000;

				if (currentTime > userData.tokenExpiry) {
					dispatch(logout());
					router.push('/login');
				}
			} catch (error) {
                console.log(error)
				dispatch(logout());
				router.push('/login');
			}
		}, 30000);

		return () => clearInterval(interval);
	}, [dispatch, router]);

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
		handleLogout: () => {
			dispatch(logout());
			router.push('/login');
		},
	};
};