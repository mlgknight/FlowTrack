'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuTrigger,
	NavigationMenuContent,
	NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { Home, CheckSquare, Calendar, Settings, Plus } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { initializeUser, logout } from '../../store/slices/userSlice';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	// Redux logic related to user
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user.user);
	const isOnline = useAppSelector((state) => state.user.isOnline);
	const router = useRouter();
	const pathname = usePathname();

	const menuItems = [
		{ path: '/dashboard', icon: Home, label: 'Dashboard' },
		{ path: '/dashboard/tasks', icon: CheckSquare, label: 'Tasks' },
		{ path: '/dashboard/calendar', icon: Calendar, label: 'Calendar' },
		{ path: '/dashboard/settings', icon: Settings, label: 'Settings' },
	];
	// ✅ Initialize user and check token expiration
	useEffect(() => {
		// Initialize user from localStorage on mount
		dispatch(initializeUser());

		// Check token expiration every 30 seconds
		const interval = setInterval(() => {
			const storedUser = localStorage.getItem('loggedEventappUser'); // ✅ Fixed key

			if (!storedUser) {
				dispatch(logout());
				router.push('/login');
				return;
			}

			const userData = JSON.parse(storedUser);
			const currentTime = Date.now() / 1000;

			// If token expired, logout and redirect
			if (currentTime > userData.tokenExpiry) {
				dispatch(logout());
				router.push('/login');
			}
		}, 30000); // Check every 30 seconds

		return () => clearInterval(interval);
	}, [dispatch, router]);

	// ✅ Redirect if not logged in
	useEffect(() => {
		if (!isOnline && !localStorage.getItem('token')) {
			router.push('/login');
		}
	}, [isOnline, router]);

	return (
		<SidebarProvider>
			<div className='flex min-h-screen w-full bg-background'>
				<Sidebar className='border-r border-sidebar-border'>
					<SidebarContent>
						{/* User Avatar Section */}
						<div className='p-4 border-b border-sidebar-border'>
							<NavigationMenu>
								<NavigationMenuList>
									<NavigationMenuItem>
										<NavigationMenuTrigger className='p-0 h-auto bg-transparent hover:bg-sidebar-accent gap-3 w-full justify-start rounded-lg px-3 py-2 transition-colors'>
											<Avatar className='h-10 w-10 border-2 border-primary/20'>
												<AvatarImage src={''} />
												<AvatarFallback className='bg-primary text-primary-foreground font-semibold'>
													{user?.username?.charAt(0).toUpperCase() || 'U'}
												</AvatarFallback>
											</Avatar>
											<div className='flex flex-col items-start'>
												<span className='text-sm font-semibold text-sidebar-foreground'>
													{user?.username || 'User'}
												</span>
												<span className='text-xs text-muted-foreground'>
													View profile
												</span>
											</div>
										</NavigationMenuTrigger>
										<NavigationMenuContent>
											<ul className='w-56 p-2 bg-popover border border-border rounded-md shadow-lg'>
												<li>
													<NavigationMenuLink asChild>
														<Link
															href='/dashboard/profile'
															className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
														>
															<div className='text-sm font-medium'>Profile</div>
															<p className='text-xs text-muted-foreground'>
																Manage your account
															</p>
														</Link>
													</NavigationMenuLink>
												</li>
												<li>
													<NavigationMenuLink asChild>
														<Link
															href='/dashboard/settings'
															className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
														>
															<div className='text-sm font-medium'>
																Settings
															</div>
															<p className='text-xs text-muted-foreground'>
																Configure preferences
															</p>
														</Link>
													</NavigationMenuLink>
												</li>
												<li className=' mt-2 pt-2'>
													<NavigationMenuLink asChild>
														<button
															onClick={() => {
																dispatch(logout());
																router.push('/login');
															}}
															className='cursor-pointer w-full text-left block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive'
														>
															<div className='text-sm font-medium'>Logout</div>
														</button>
													</NavigationMenuLink>
												</li>
											</ul>
										</NavigationMenuContent>
									</NavigationMenuItem>
								</NavigationMenuList>
							</NavigationMenu>
						</div>

						{/* Add Task Button */}
						<div className='p-4'>
							<Button
								variant='default'
								className='w-full justify-start gap-2 bg-primary text-primary-foreground hover:opacity-90 shadow-sm'
								onClick={() => router.push('/dashboard/tasks')}
							>
								<Plus className='h-4 w-4' />
								<span className='cursor-pointer'>Add Task</span>
							</Button>
						</div>

						{/* Navigation Menu */}
						<SidebarGroup>
							<SidebarGroupLabel className='text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-2'>
								Navigation
							</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu className=' px-2'>
									{menuItems.map((item) => {
										const Icon = item.icon;
										const isActive = pathname === item.path;

										return (
											<SidebarMenuItem key={item.path}>
												<SidebarMenuButton
													onClick={() => router.push(item.path)}
													className={`cursor-pointer
														transition-all duration-200 rounded-lg
														${
															isActive
																? 'bg-primary text-primary-foreground shadow-sm font-medium'
																: 'hover:bg-sidebar-accent text-sidebar-foreground'
														}
													`}
												>
													<Icon className='h-4 w-4' />
													<span>{item.label}</span>
												</SidebarMenuButton>
											</SidebarMenuItem>
										);
									})}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</SidebarContent>
				</Sidebar>

				<main className='flex-1 bg-background'>
					<div className='border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10'>
						<div className='px-6 py-3 flex items-center'>
							<SidebarTrigger className='hover:bg-accent rounded-md transition-colors' />
						</div>
					</div>
					<div className='p-6'>{children}</div>
				</main>
			</div>
		</SidebarProvider>
	);
};

export default AuthLayout;
