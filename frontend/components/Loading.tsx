import { PacmanLoader } from 'react-spinners';


export const Loading = () => {


	return (
		<div className='backdrop-filter backdrop-blur bg-white/1 fixed inset-0 flex flex-col justify-center items-center gap-6 z-50 animate-in fade-in duration-100'>

			<PacmanLoader color='oklch(0.45 0.04 260)' size={60} />
			<h4 className='text-3xl font-semibold text-foreground tracking-wider animate-pulse'>
				LOADING
			</h4>
		</div>
	);
};

export default Loading;
