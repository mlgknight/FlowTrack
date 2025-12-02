import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Nav from '../components/Nav';
import Providers from '../components/Providers';

import { ThemeProvider } from '@/components/Theme/ThemeProvider';


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
		<html
			lang='en'
			className='scroll-smooth'
			data-theme=''
			suppressHydrationWarning
		>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}
			>
				<Providers>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						themes={[
							'light',
							'dark',
							'ocean',
							'sunset',
							'forest',
							'rose',
							'midnight',
							'lavender',
							'cyberpunk',
							'autumn',
							'monochrome',
							'nord',
							'sakura',
							'dracula',
							'mint',
							'neon',
							'coffee',
							'slate',
							'monokai',
							'solarized-light',
						]}
					>
						<Nav />
						<main className='min-h-screen'>{children}</main>

					</ThemeProvider>
				</Providers>
			</body>
		</html>
	);
}
