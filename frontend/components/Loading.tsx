import { PacmanLoader } from 'react-spinners';


export const Loading = () => {


	return (
		<div className='fixed inset-0 flex flex-col justify-center items-center bg-background gap-6 z-50 animate-in fade-in duration-100'>

			<PacmanLoader color='#6716a0' size={30} />
			<h4 className='text-xl font-semibold text-foreground tracking-wider animate-pulse'>
				LOADING
			</h4>
		</div>
	);
};

export default Loading;
