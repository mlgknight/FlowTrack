import { PacmanLoader } from 'react-spinners';

function Loading() {
	return (
		<div className='flex flex-col justify-center items-center h-screen w-screen bg-background gap-6'>
			<PacmanLoader color='#6716a0' size={30} />
			<h4 className='text-xl font-semibold text-foreground tracking-wider animate-pulse'>
				LOADING
			</h4>
		</div>
	);
}

export default Loading;