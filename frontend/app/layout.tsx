
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Nav from '../components/Nav';
import Providers from '../components/Providers';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'FlowTrack',
	description: 'Organize your life ',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className='scroll-smooth dark' data-theme='dark' >
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}
			>
				<Providers>
					<Nav />
					<main className='min-h-screen'>{children}</main>
				</Providers>
			</body>
		</html>
	);
}
