'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ThemeToggle() {
	const { setTheme, theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const themes = [
		{ name: 'system', icon: Monitor, label: 'System' },
		{ name: 'light', icon: Sun, label: 'Light' },
		{ name: 'dark', icon: Moon, label: 'Dark' },
	];

	const currentThemeData = themes.find((t) => t.name === theme);
	const CurrentIcon = currentThemeData?.icon || Sun;

	if (!mounted) {
		return (
			<Button className='cursor-pointer' variant='outline' size='icon'>
				<Sun className='h-[1.2rem] w-[1.2rem]' />
			</Button>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className='cursor-pointer' variant='outline' size='icon'>
					<CurrentIcon className='h-[1.2rem] w-[1.2rem] transition-all' />
					<span className='sr-only'>Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='max-h-96 overflow-y-auto'>
				{themes.map(({ name, icon: Icon, label }) => (
					<DropdownMenuItem
						key={name}
						className={`cursor-pointer ${theme === name ? 'bg-accent' : ''}`}
						onClick={() => setTheme(name)}
					>
						<Icon className='mr-2 h-4 w-4' />
						{label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
