import { usePathname } from 'next/navigation';
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger,
} from '@/components/ui/sidebar';
import SideBarAvatar from './SideBarAvatar';
import { Button } from '@/components/ui/button';
import { Home, CheckSquare, Calendar, Settings, Plus } from 'lucide-react';
import { useAuthGuard } from '@/hooks/useAuthGuard';

const SideBar = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();
	const menuItems = [
		{ path: '/dashboard', icon: Home, label: 'Dashboard' },
		{ path: '/dashboard/tasks', icon: CheckSquare, label: 'Tasks' },
		{ path: '/dashboard/calendar', icon: Calendar, label: 'Calendar' },
		{ path: '/dashboard/settings', icon: Settings, label: 'Settings' },
	];
	const { router } = useAuthGuard();
	return (
		<div className=' flex min-h-screen w-full bg-background'>
			<Sidebar className='border-r border-sidebar-border'>
				<SidebarContent>
					{/* User Avatar Section */}
					<SideBarAvatar />

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
	);
};
export default SideBar;
