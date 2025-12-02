'use client';

import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { useAppSelector } from '../store/hooks';

const Footer = () => {
	const { isOnline } = useAppSelector((state) => state.user);

	if (isOnline) {
		return;
	}

	return (
		<footer className='w-full bg-background py-0 m-0 '>
			<div className='p-10 shadow-[13px_30px_42px_30px_var(--primary)]'>
				<Card className='border-muted bg-gradient-to-t from-muted/10 to-background shadow-sm backdrop-blur'>
					<CardContent className='flex flex-col items-center justify-between gap-0 p-10 md:flex-row'>
						<p className='text-sm text-muted-foreground text-center md:text-left'>
							© {new Date().getFullYear()} FlowTrack. All rights reserved.
						</p>

						<nav className='flex gap-4 text-sm'>
							<Link
								href='/privacy'
								className='hover:text-foreground transition-colors'
							>
								Privacy
							</Link>
							<Link
								href='/terms'
								className='hover:text-foreground transition-colors'
							>
								Terms
							</Link>
							<Link
								href='/contact'
								className='hover:text-foreground transition-colors'
							>
								Contact
							</Link>
						</nav>
					</CardContent>
				</Card>
			</div>
		</footer>
	);
};

export default Footer;
