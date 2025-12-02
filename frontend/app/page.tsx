'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Particles } from '../components/magicui/particles';
import { AuroraText } from '../components/magicui/aurora-text';
import { TypingAnimation } from '../components/magicui/typing-animation';
import { useAppSelector } from '@/store/hooks';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Footer from '@/components/Footer';

const Home = () => {
	const isLoggedIn = useAppSelector((state) => state.user.isOnline);

	if (isLoggedIn) {
		redirect('/dashboard');
	}

	return (
		<>
			<section className='relative w-full min-h-screen overflow-hidden'>
				<Particles className='absolute inset-0 z-0' color='#fff' />
					<div className='relative z-10 flex flex-col justify-center items-center w-full min-h-screen gap-6 lg:gap-10 px-4 py-12'>
						<h1 className='font-bold flex text-4xl lg:text-7xl bg-clip-text text-center animate-in fade-in duration-700'>
							<span className=' rounded-sm line-through bg-accent-foreground italic block text-muted-foreground'>
								Task
							</span>
							<AuroraText className=' font-bold text-4xl lg:text-7xl text-transparent bg-clip-text text-center'>
								Flow
							</AuroraText>
						</h1>

						<TypingAnimation className='font-bold text-3xl lg:text-6xl text-foreground text-center'>
							Get things done, effortlessly
						</TypingAnimation>

						<p className='text-muted-foreground text-center max-w-2xl text-base lg:text-xl mt-4 leading-relaxed'>
							Organize your life with smart task management. Capture,
							prioritize, and complete your to-dos with ease.
						</p>

						<div className='flex flex-col sm:flex-row gap-4 mt-6'>
							<Button
								asChild
								size='lg'
								className='text-lg font-semibold px-8 py-4 h-auto backdrop-blur-sm bg-primary/90 hover:bg-primary/80'
							>
								<Link href='/signup'>Get Started Free</Link>
							</Button>
							<Button
								asChild
								variant='outline'
								size='lg'
								className='text-lg font-semibold px-8 py-4 h-auto backdrop-blur-sm bg-background/20 border-primary/30 hover:bg-accent/50'
							>
								<Link href='/explore'>See How It Works</Link>
							</Button>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-16 max-w-5xl w-full'>
							<Card className='text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border-primary/20 hover:border-primary/40 backdrop-blur-sm bg-card/50'>
								<CardHeader>
									<CardTitle className='flex justify-center text-5xl mb-4'>
										✓
									</CardTitle>
									<CardTitle className='text-xl'>Simple & Intuitive</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className='text-base leading-relaxed'>
										Add tasks in seconds with natural language processing
									</CardDescription>
								</CardContent>
							</Card>

							<Card className='text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border-primary/20 hover:border-primary/40 backdrop-blur-sm bg-card/50'>
								<CardHeader>
									<CardTitle className='flex justify-center text-5xl mb-4'>
										📅
									</CardTitle>
									<CardTitle className='text-xl'>Smart Scheduling</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className='text-base leading-relaxed'>
										Organize by projects, priorities, and due dates
									</CardDescription>
								</CardContent>
							</Card>

							<Card className='text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border-primary/20 hover:border-primary/40 backdrop-blur-sm bg-card/50'>
								<CardHeader>
									<CardTitle className='flex justify-center text-5xl mb-4'>
										🚀
									</CardTitle>
									<CardTitle className='text-xl'>Stay Productive</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className='text-base leading-relaxed'>
										Track progress and build better habits daily
									</CardDescription>
								</CardContent>
							</Card>
						</div>
					</div>

			</section>
									<Footer />
		</>
	);
};

export default Home;
