'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useAppSelector } from '../store/hooks';
import { Button } from '@/components/ui/button';
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuLink,
} from '@/components/ui/navigation-menu';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Nav = () => {
	const { isOnline } = useAppSelector((state) => state.user);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// ✅ Don't render until mounted (prevents flash)
	if (!mounted) {
		return null;
	}

	// ✅ Don't show Nav if user is logged in
	if (isOnline) {
		return null;
	}

	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/explore', label: 'Explore' },
	];

	return (
		<nav className=' sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8'>
				{/* Logo/Brand */}
				<div className='flex items-center'>
					<Link href='/' className='text-xl font-bold text-foreground'>
						TaskFlow
					</Link>
				</div>

				{/* Desktop Navigation */}
				<NavigationMenu className='hidden lg:flex'>
					<NavigationMenuList className='gap-2'>
						{navItems.map((item) => (
							<NavigationMenuItem key={item.href}>
								<NavigationMenuLink asChild>
									<Link
										href={item.href}
										className='group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50'
									>
										{item.label}
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>

				{/* Desktop Auth Buttons */}
				<div className='hidden items-center space-x-2 lg:flex'>
					<Button asChild variant='ghost' size='sm'>
						<Link href='/login'>Login</Link>
					</Button>
					<Button asChild size='sm'>
						<Link href='/signup'>Get Started</Link>
					</Button>
				</div>

				{/* Mobile Menu */}
				<Sheet>
					<SheetTrigger asChild className='lg:hidden'>
						<Button variant='ghost' size='icon'>
							<Menu className='h-5 w-5' />
							<span className='sr-only'>Toggle menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side='right' className='w-[300px] sm:w-[400px]'>
						<div className='flex flex-col gap-6'>
							<div className='flex flex-col gap-2'>
								{navItems.map((item) => (
									<Button
										key={item.href}
										asChild
										variant='ghost'
										className='w-full justify-start'
									>
										<Link href={item.href}>{item.label}</Link>
									</Button>
								))}
							</div>
							<div className='flex flex-col gap-2 border-t pt-4'>
								<Button asChild variant='outline' className='w-full'>
									<Link href='/login'>Login</Link>
								</Button>
								<Button asChild className='w-full'>
									<Link href='/signup'>Get Started</Link>
								</Button>
							</div>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</nav>
	);
};

export default Nav;
