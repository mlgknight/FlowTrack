import Link from 'next/link';
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuTrigger,
	NavigationMenuContent,
	NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthGuard } from '@/hooks/useAuthGuard';

const SideBarAvatar = () => {
	const { user, router, handleLogout } = useAuthGuard();

	return (
		<div className='p-4 border-b border-sidebar-border'>
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger className=' cursor-pointer p-0 h-auto bg-transparent hover:bg-sidebar-accent gap-3 w-full justify-start rounded-lg px-3 py-2 transition-colors'>
							<Avatar className=' h-10 w-10 border-2 border-primary/20'>
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
							<ul className='w-45 p-1 bg-popover rounded-sm shadow-lg'>
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
											<div className='text-sm font-medium'>Settings</div>
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
												handleLogout();
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
	);
};

export default SideBarAvatar;
