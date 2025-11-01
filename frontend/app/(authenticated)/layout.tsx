'use client';

import SideBar from '@/components/sidebar/SideBar';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { useHasMounted } from '@/hooks/useHasMounted';
import Loading from '@/components/Loading';
import { SidebarProvider } from '@/components/ui/sidebar';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	const { user } = useAuthGuard();
	const hasMounted = useHasMounted();

	if (!hasMounted) {
		return <Loading />;
	}

	if (!user) {
		return <Loading />;
	}

	return (
		<SidebarProvider>
			<SideBar>{children}</SideBar>
		</SidebarProvider>
	);
};

export default AuthLayout;
