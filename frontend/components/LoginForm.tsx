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

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [localError, setLocalError] = useState<string | null>(null);

  const isLoggedIn = useAppSelector((state) => state.user.isOnline);
  const isLoading = useAppSelector((state) => state.user.loading);

  if (isLoggedIn) {
    redirect('/dashboard');
  }

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError(null);

    const username = usernameRef.current?.value.trim() || '';
    const password = passwordRef.current?.value.trim() || '';

    if (!username) {
      const errorMsg = 'Please fill out the username';
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

    try {
      await dispatch(loginUser({ username, password })).unwrap();

      // Clear form
      if (usernameRef.current) usernameRef.current.value = '';
      if (passwordRef.current) passwordRef.current.value = '';

      router.push('/dashboard');
    } catch (error) {
      const errorMsg = 'Wrong credentials';
      setLocalError(errorMsg);
      console.error(error);
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
          <CardTitle className='text-3xl font-bold'>Welcome back</CardTitle>
          <CardDescription className='text-base'>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className='flex flex-col space-y-6'>
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

            <Button
              type='submit'
              className='w-full h-12 font-semibold text-base'
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
    </section>
  );
};

export default LoginForm;