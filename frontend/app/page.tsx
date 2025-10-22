import React from 'react';

import { Particles } from '../components/magicui/particles';
import { AuroraText } from '../components/magicui/aurora-text';
import { TypingAnimation } from '../components/magicui/typing-animation';
import Link from 'next/link';

const Home = () => (
	<section className='relative w-full min-h-screen overflow-hidden bg-dark-500'>
		<Particles className='absolute inset-0 z-0' color='#fff' />

		<div className='relative z-10 flex flex-col justify-center items-center w-full min-h-screen gap-6 lg:gap-10 px-4 py-12'>
			<AuroraText className='font-bold text-4xl lg:text-7xl text-transparent bg-clip-text text-center animate-in fade-in duration-700'>
				TaskFlow
			</AuroraText>

			<TypingAnimation className='font-bold text-3xl lg:text-6xl text-light-100 text-center'>
				Get things done, effortlessly
			</TypingAnimation>

			<p className='text-light-300 text-center max-w-2xl text-base lg:text-xl mt-4 leading-relaxed'>
				Organize your life with smart task management. Capture, prioritize, and
				complete your to-dos with ease.
			</p>

			<div className='flex flex-col sm:flex-row gap-4 mt-6'>
				<Link
					href='/signup'
					className='font-bold flex justify-center items-center px-8 py-4 rounded-lg bg-primary-gradient text-primary-foreground hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-primary/50 hover:scale-105'
				>
					Get Started Free
				</Link>
				<Link
					href='/explore'
					className='font-semibold flex justify-center items-center px-8 py-4 rounded-lg border-2 border-primary text-light-100 hover:bg-primary/10 hover:border-primary-admin transition-all duration-300'
				>
					See How It Works
				</Link>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-16 max-w-5xl w-full'>
				<div className='flex flex-col items-center text-center p-8 rounded-xl bg-card/30 backdrop-blur-md border border-primary/30 hover:border-primary/60 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20'>
					<div className='text-5xl mb-4'>✓</div>
					<h3 className='text-light-100 font-semibold text-xl mb-3'>
						Simple & Intuitive
					</h3>
					<p className='text-light-300 text-sm leading-relaxed'>
						Add tasks in seconds with natural language processing
					</p>
				</div>
				<div className='flex flex-col items-center text-center p-8 rounded-xl bg-card/30 backdrop-blur-md border border-primary/30 hover:border-primary/60 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20'>
					<div className='text-5xl mb-4'>📅</div>
					<h3 className='text-light-100 font-semibold text-xl mb-3'>
						Smart Scheduling
					</h3>
					<p className='text-light-300 text-sm leading-relaxed'>
						Organize by projects, priorities, and due dates
					</p>
				</div>
				<div className='flex flex-col items-center text-center p-8 rounded-xl bg-card/30 backdrop-blur-md border border-primary/30 hover:border-primary/60 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20'>
					<div className='text-5xl mb-4'>🚀</div>
					<h3 className='text-light-100 font-semibold text-xl mb-3'>
						Stay Productive
					</h3>
					<p className='text-light-300 text-sm leading-relaxed'>
						Track progress and build better habits daily
					</p>
				</div>
			</div>
		</div>
	</section>
);

export default Home;