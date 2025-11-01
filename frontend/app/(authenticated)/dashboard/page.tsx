'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import Loading from '@/components/Loading';
import DashboardUI from '@/components/Dashboard';

const Dashboard = () => {
	const router = useRouter();
	const isLoggedIn = useAppSelector((state) => state.user.isOnline);

	useEffect(() => {
		if (!isLoggedIn) {
			router.push('/login');
		}
	}, [isLoggedIn, router]);

	if (!isLoggedIn) {
		return <Loading />;
	}

	return (
		<section className='min-h-screen w-full flex flex-col items-center justify-center bg-background'>
			<DashboardUI />
		</section>
	);
};

export default Dashboard;
