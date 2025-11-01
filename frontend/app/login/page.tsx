'use client';

import LoginForm from '../../components/LoginForm';
import { Particles } from '../../components/magicui/particles';

const Login = () => {
	return (
		<section className='relative w-full min-h-screen overflow-hidden bg-dark-500'>
			<Particles className='absolute inset-0 z-0' color='#fff' />

			<div className='relative z-10 flex flex-col justify-center items-center w-full min-h-screen gap-8 px-4 py-12'>
				<p className='text-light-300 text-center max-w-md text-lg'>
					Login to access your tasks and stay productive
				</p>

				<LoginForm />

				<p className='text-light-300 text-sm mt-4'>
					Do not have an account?{' '}
					<a
						href='/signup'
						className='text-primary hover:text-primary-admin transition-colors font-semibold hover:underline'
					>
						Sign up
					</a>
				</p>
			</div>
		</section>
	);
};

export default Login;