import ThemeSettings from '@/components/Theme/ThemeSettings';

const Theme = () => {
	return (
		<section className='max-w-4xl mx-auto p-6 space-y-6'>
			<h1 className='text-3xl font-bold tracking-tight'>Theme Settings</h1>
			<p className='text-muted-foreground'>
				Customize the look and feel of your workspace.
			</p>
			<ThemeSettings />
		</section>
	);
};

export default Theme;
