import { Spinner } from '@/components/ui/spinner';

export const Loading = () => {
	return (
		<div className='fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-background/80 backdrop-blur-md animate-in fade-in duration-300'>
			<div className='flex flex-col items-center justify-center gap-6 rounded-lg p-8 backdrop-blur-sm'>
				<Spinner className='size-15' />
				<h4 className='text-3xl font-semibold text-foreground tracking-wider animate-pulse'>
					LOADING
				</h4>
				<p className='text-sm text-muted-foreground'>Getting things ready...</p>
			</div>
		</div>
	);
};

export default Loading;
