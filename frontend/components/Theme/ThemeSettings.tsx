'use client';

import { useEffect, useState } from 'react';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card';
import { useTheme } from 'next-themes';
import {
	Moon,
	Sun,
	Waves,
	Sunset as SunsetIcon,
	TreePine,
	Flower2,
	CloudMoon,
	Sparkles,
	Zap,
	Leaf,
	Circle,
	Snowflake,
	Monitor,
	Cherry,
	Skull,
	Coffee,
	Square,
	Code,
	Lightbulb,
} from 'lucide-react';

const ThemeSettings = () => {
	const { setTheme, theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const themes = [
		// Base themes
		{
			id: 'system',
			icon: Monitor,
			label: 'System',
			gradient: 'from-slate-400 to-slate-600',
		},
		{
			id: 'light',
			icon: Sun,
			label: 'Light',
			gradient: 'from-yellow-200 to-yellow-400',
		},
		{
			id: 'dark',
			icon: Moon,
			label: 'Dark',
			gradient: 'from-gray-700 to-gray-900',
		},
		// Custom themes
		{
			id: 'ocean',
			icon: Waves,
			label: 'Ocean',
			gradient: 'from-blue-500 to-cyan-500',
		},
		{
			id: 'sunset',
			icon: SunsetIcon,
			label: 'Sunset',
			gradient: 'from-orange-400 to-pink-500',
		},
		{
			id: 'forest',
			icon: TreePine,
			label: 'Forest',
			gradient: 'from-green-500 to-emerald-700',
		},
		{
			id: 'rose',
			icon: Flower2,
			label: 'Rose',
			gradient: 'from-rose-400 to-rose-600',
		},
		{
			id: 'midnight',
			icon: CloudMoon,
			label: 'Midnight',
			gradient: 'from-indigo-600 to-slate-900',
		},
		{
			id: 'lavender',
			icon: Sparkles,
			label: 'Lavender',
			gradient: 'from-violet-400 to-purple-600',
		},
		{
			id: 'cyberpunk',
			icon: Zap,
			label: 'Cyberpunk',
			gradient: 'from-pink-500 to-yellow-400',
		},
		{
			id: 'autumn',
			icon: Leaf,
			label: 'Autumn',
			gradient: 'from-amber-500 to-orange-600',
		},
		{
			id: 'monochrome',
			icon: Circle,
			label: 'Monochrome',
			gradient: 'from-gray-400 to-gray-700',
		},
		{
			id: 'nord',
			icon: Snowflake,
			label: 'Nord',
			gradient: 'from-sky-400 to-blue-700',
		},
		{
			id: 'sakura',
			icon: Cherry,
			label: 'Sakura',
			gradient: 'from-pink-300 to-rose-500',
		},
		{
			id: 'dracula',
			icon: Skull,
			label: 'Dracula',
			gradient: 'from-purple-700 to-indigo-900',
		},
		{
			id: 'mint',
			icon: Leaf,
			label: 'Mint',
			gradient: 'from-emerald-400 to-teal-500',
		},
		{
			id: 'neon',
			icon: Zap,
			label: 'Neon',
			gradient: 'from-fuchsia-500 to-lime-400',
		},
		{
			id: 'coffee',
			icon: Coffee,
			label: 'Coffee',
			gradient: 'from-amber-800 to-yellow-700',
		},
		{
			id: 'slate',
			icon: Square,
			label: 'Slate',
			gradient: 'from-slate-500 to-slate-800',
		},
		{
			id: 'monokai',
			icon: Code,
			label: 'Monokai',
			gradient: 'from-amber-400 to-lime-500',
		},
		{
			id: 'solarized-light',
			icon: Lightbulb,
			label: 'Solarized',
			gradient: 'from-yellow-300 to-orange-400',
		},
	];

	if (!mounted) return null;

	const baseThemes = themes.slice(0, 3);
	const customThemes = themes.slice(3);

	return (
		<Card className='overflow-hidden'>
			<CardHeader>
				<CardTitle>Appearance</CardTitle>
				<CardDescription>
					Choose between system, light, dark, or custom theme presets.
				</CardDescription>
			</CardHeader>

			<CardContent className='space-y-8'>
				{/* Base themes */}
				<div>
					<h3 className='text-sm font-medium mb-3 text-muted-foreground'>
						Base Themes
					</h3>
					<div className='grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3'>
						{baseThemes.map(({ id, icon: Icon, label, gradient }) => (
							<button
								key={id}
								onClick={() => setTheme(id)}
								className={`group relative flex flex-col items-center justify-center gap-2 rounded-xl border p-4 transition-all duration-300 cursor-pointer
										${
											theme === id
												? 'border-primary shadow-md scale-[1.03]'
												: 'border-muted hover:shadow-sm'
										}
									`}
							>
								<div
									className={`absolute inset-0 rounded-xl opacity-20 bg-gradient-to-br ${gradient}`}
								/>
								<Icon className='h-5 w-5 z-10 transition-transform group-hover:scale-110' />
								<span className='z-10 text-sm font-medium'>{label}</span>
							</button>
						))}
					</div>
				</div>

				{/* Custom themes */}
				<div>
					<h3 className='text-sm font-medium mb-3 text-muted-foreground'>
						Custom Themes
					</h3>
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
						{customThemes.map(({ id, icon: Icon, label, gradient }) => (
							<button
								key={id}
								onClick={() => setTheme(id)}
								className={`group relative flex flex-col items-center justify-center gap-2 rounded-xl border p-4 transition-all duration-300 cursor-pointer
										${
											theme === id
												? 'border-primary shadow-md scale-[1.03]'
												: 'border-muted hover:shadow-sm'
										}
									`}
							>
								<div
									className={`absolute inset-0 rounded-xl opacity-20 bg-gradient-to-br ${gradient}`}
								/>
								<div
									className={`h-8 w-8 rounded-full bg-gradient-to-br ${gradient} shadow-inner`}
								/>
								<span className='z-10 text-sm font-medium'>{label}</span>
								<Icon className='h-5 w-5 z-10 transition-transform group-hover:scale-110' />
							</button>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ThemeSettings;
