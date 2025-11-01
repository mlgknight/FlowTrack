'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '../store/hooks';
import Loading from '../components/Loading';
import { useState } from 'react';

export default function NotFound() {
	const [isLoading, setIsLoading] = useState(false);
	const isLoggedIn = useAppSelector((state) => state.user.isOnline);
	const router = useRouter();

	const handleReturn = () => {
		setIsLoading(true);
		if (isLoggedIn) {
			router.push('/dashboard');
		} else {
			router.push('/');
		}
	};

	if (isLoading) {
		return <Loading />;
	}

	return (
		<section className=' min-h-screen flex flex-col items-center justify-center text-center bg-background px-4 gap-6'>
			<div className='animate-in fade-in zoom-in duration-500'>
				<Image
					src='/Llama_404.png'
					alt='404 Llama'
					width={300}
					height={300}
					className='drop-shadow-2xl'
				/>
			</div>

			<div className='space-y-4 max-w-2xl animate-in slide-in-from-bottom duration-700'>
				<h3 className='text-5xl font-bold text-foreground mb-4'>
					404 - Page Not Found
				</h3>
				<p className='text-lg text-muted-foreground leading-relaxed'>
					This llama looked everywhere but could not find your page.
					<br />
					Maybe it wandered off to the mountains?
				</p>
			</div>

			<button
				onClick={handleReturn}
				className='mt-4 bg-primary hover:opacity-90 text-primary-foreground px-8 py-3 font-semibold text-lg rounded-lg cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
			>
				Return Home
			</button>
		</section>
	);
}
