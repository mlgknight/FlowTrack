'use client';

import { type FormEvent, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { signupUser } from '../../store/slices/userSlice';
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
	const nameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);
	const router = useRouter();
	const [localError, setLocalError] = useState<string | null>(null);
	const isLoading = useAppSelector((state) => state.user.loading);
	const isLoggedIn = useAppSelector((state) => state.user.isOnline);

	if (isLoggedIn) {
		redirect('/dashboard');
	}

	const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLocalError(null);

		const username = usernameRef.current?.value.trim() || '';
		const name = nameRef.current?.value.trim() || '';
		const password = passwordRef.current?.value.trim() || '';
		const confirmPassword = confirmPasswordRef.current?.value.trim() || '';

		if (!username) {
			const errorMsg = 'Please fill out the username';
			setLocalError(errorMsg);
			setTimeout(() => {
				setLocalError(null);
			}, 5000);
			return;
		}

		if (!name) {
			const errorMsg = 'Please fill out your name';
			setLocalError(errorMsg);
			setTimeout(() => {
				setLocalError(null);
			}, 5000);
			return;
		}

		if (!password) {
			const errorMsg = 'Please fill out the password';
			setLocalError(errorMsg);
			setTimeout(() => {
				setLocalError(null);
			}, 5000);
			return;
		}

		if (!confirmPassword) {
			const errorMsg = 'Please confirm your password';
			setLocalError(errorMsg);
			setTimeout(() => {
				setLocalError(null);
			}, 5000);
			return;
		}

		if (password !== confirmPassword) {
			const errorMsg = 'Passwords do not match';
			setLocalError(errorMsg);
			setTimeout(() => {
				setLocalError(null);
			}, 5000);
			return;
		}

		const credentials = { name, username, password };

		try {
			await dispatch(signupUser(credentials)).unwrap();

			// Clear form
			if (usernameRef.current) usernameRef.current.value = '';
			if (nameRef.current) nameRef.current.value = '';
			if (passwordRef.current) passwordRef.current.value = '';
			if (confirmPasswordRef.current) confirmPasswordRef.current.value = '';

			router.push('/dashboard');
		} catch (error) {
			// Extract error message properly
			const errorMsg =
				typeof error === 'string' ? error : 'Unable to create account';
			setLocalError(errorMsg);
			setTimeout(() => {
				setLocalError(null);
			}, 5000);
		}
	};

	return (
		<section className='w-full max-w-md space-y-6'>
			{localError && (
				<Alert
					variant='destructive'
					className='animate-in fade-in slide-in-from-top-2 duration-300'
				>
					<AlertCircle className='h-4 w-4' />
					<AlertDescription className='ml-2'>{localError}</AlertDescription>
				</Alert>
			)}

			<Card className='w-full border shadow-lg'>
				<CardHeader className='space-y-3 text-center'>
					<CardTitle className='text-3xl font-bold'>Create Account</CardTitle>
					<CardDescription className='text-base'>
						Enter your details to get started
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSignup} className='flex flex-col space-y-6'>
						<div className='space-y-2'>
							<Label htmlFor='username' className='text-sm font-medium'>
								Username
							</Label>
							<Input
								ref={usernameRef}
								type='text'
								id='username'
								name='Username'
								placeholder='Enter your username'
								className='h-12'
								disabled={isLoading}
							/>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='name' className='text-sm font-medium'>
								Name
							</Label>
							<Input
								ref={nameRef}
								type='text'
								id='name'
								name='Name'
								placeholder='Enter your name'
								className='h-12'
								disabled={isLoading}
							/>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='password' className='text-sm font-medium'>
								Password
							</Label>
							<Input
								ref={passwordRef}
								type='password'
								id='password'
								name='Password'
								placeholder='Enter your password'
								className='h-12'
								disabled={isLoading}
							/>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='confirmPassword' className='text-sm font-medium'>
								Confirm Password
							</Label>
							<Input
								ref={confirmPasswordRef}
								type='password'
								id='confirmPassword'
								name='ConfirmPassword'
								placeholder='Confirm your password'
								className='h-12'
								disabled={isLoading}
							/>
						</div>

						<Button
							type='submit'
							className='w-full h-12 font-semibold text-base'
							disabled={isLoading}
						>
							{isLoading ? (
								<>
									<Loader2 className='mr-2 h-5 w-5 animate-spin' />
									Creating account...
								</>
							) : (
								'Sign Up'
							)}
						</Button>
					</form>
				</CardContent>
			</Card>
		</section>
	);
};

export default SignUpForm;
