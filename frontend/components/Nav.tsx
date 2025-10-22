'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useAppSelector } from '../store/hooks';

import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
} from '@/components/ui/navigation-menu';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Nav = () => {
	const isLoggedIn = useAppSelector((state) => state.user.isOnline);

	if (isLoggedIn) {
		return;
	}

	return (
		<nav className='sticky top-0 z-50 w-full border-b border-primary bg-dark-100'>
			<div className='mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8'>
				{/* Mobile Menu */}
				<div className='lg:hidden'>
					<DropdownMenu>
						<DropdownMenuTrigger className='rounded-md p-2 hover:bg-dark-200 focus:outline-none focus:ring-2 focus:ring-primary'>
							<Menu className='h-5 w-5 text-light-300' />
						</DropdownMenuTrigger>
						<DropdownMenuContent className='w-56 border border-primary bg-dark-100 text-light-300'>
							{['/', '/about', '/explore'].map((path, i) => (
								<DropdownMenuItem key={path} asChild>
									<Link
										href={path}
										className='w-full cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-dark-200'
									>
										{['Home', 'About', 'Explore'][i]}
									</Link>
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				{/* Desktop Nav */}
				<NavigationMenu className='hidden text-light-300 lg:block'>
					<NavigationMenuList className='flex items-center space-x-1 lg:space-x-3'>
						{['/', '/about', '/explore'].map((path, i) => (
							<NavigationMenuItem key={path}>
								<Link
									href={path}
									className='rounded-md px-3 py-2 text-sm transition-colors hover:bg-dark-200 hover:text-light-100 lg:px-4 lg:text-base'
								>
									{['Home', 'About', 'Explore'][i]}
								</Link>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>

				{/* Auth Buttons - Conditional rendering here */}

				<div className='flex items-center space-x-2 lg:space-x-4'>
					{isLoggedIn && (
						<Link
							href='/dashboard'
							className='rounded-lg bg-primary bg-primary-gradient px-3 py-2 text-sm text-primary-foreground shadow-lg shadow-purple-500/20 transition-colors hover:bg-primary/90 hover:shadow-purple-500/30 lg:px-4 lg:text-base'
						>
							Dashboard
						</Link>
					)}
					<>
						<Link
							href='/login'
							className='rounded-md px-3 py-2 text-sm text-light-300 transition-colors hover:bg-dark-200 hover:text-light-100 lg:px-4 lg:text-base'
						>
							Login
						</Link>
						<Link
							href='/signup'
							className='rounded-lg bg-primary bg-primary-gradient px-3 py-2 text-sm text-primary-foreground shadow-lg shadow-purple-500/20 transition-colors hover:bg-primary/90 hover:shadow-purple-500/30 lg:px-4 lg:text-base'
						>
							Get Started
						</Link>
					</>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
