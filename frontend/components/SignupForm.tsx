'use client';

import { type FormEvent, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginUser } from '../store/slices/userSlice';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { redirect } from 'next/navigation';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';

const SignUpForm = () => {
	const dispatch = useAppDispatch();
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const router = useRouter();
	const [localError, setLocalError] = useState<string | null>(null);

	return (
		<div className='w-full max-w-md space-y-6'>
			{localError && (
				<Alert
					variant='destructive'
					className='border-destructive/50 bg-destructive/10 backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-300'
				>
					<AlertCircle className='h-4 w-4' />
					<AlertDescription className='ml-2'>{localError}</AlertDescription>
				</Alert>
			)}

			<Card className='w-full border-primary/30 bg-dark-100/80 backdrop-blur-md shadow-2xl'>
				<CardHeader className='space-y-3'>
					<CardTitle className='text-3xl font-bold text-light-100'>
						Welcome back
					</CardTitle>
					<CardDescription className='text-light-300 text-base'>
						Enter your credentials to access your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleLogin} className='flex flex-col space-y-6'>
						<div className='space-y-2'>
							<Label
								htmlFor='username'
								className='text-light-200 text-sm font-medium'
							>
								Username
							</Label>
							<Input
								ref={usernameRef}
								type='text'
								id='username'
								name='Username'
								placeholder='Enter your username'
								className='border-primary/50 bg-dark-200 text-light-100 placeholder:text-light-300/50 focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 transition-all'
								disabled={isLoading}
							/>
						</div>

						<div className='space-y-2'>
							<Label
								htmlFor='password'
								className='text-light-200 text-sm font-medium'
							>
								Password
							</Label>
							<Input
								ref={passwordRef}
								type='password'
								id='password'
								name='Password'
								placeholder='Enter your password'
								className='border-primary/50 bg-dark-200 text-light-100 placeholder:text-light-300/50 focus:border-primary focus:ring-2 focus:ring-primary/20 h-12 transition-all'
								disabled={isLoading}
							/>
						</div>

						<Button
							type='submit'
							className='cursor-pointer w-full h-12 bg-primary-gradient text-primary-foreground hover:opacity-90 font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-primary/50 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
							disabled={isLoading}
						>
							{isLoading ? (
								<>
									<Loader2 className='mr-2 h-5 w-5 animate-spin' />
									Logging in...
								</>
							) : (
								'Login'
							)}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default SignUpForm;
