'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import Container from '@/components/Common/Container';
import Hero from '../Common/Hero/Hero';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { loginUser } from '@/api/userData'; // adjust the import path accordingly
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Replace with your actual login function and handle the response
      const response = await loginUser({ email, password });
      console.log('Login successful:', response);

      // Save the token, set user context, or redirect as needed
      // Example: localStorage.setItem('token', response.token);
      localStorage.setItem('token', response.token);
      router.push('/dashboard'); // Redirect to dashboard or another page
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure (show error message, etc.)
    }
  };

  return (
    <div className="h-full min-h-screen bg-slate-200">
      <Hero
        title="Welcome Back!"
        description="🔑 Log in to access your dashboard and continue learning."
      />
      <Container>
        <div className="max-w-sm mx-auto mt-10">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            <Link
              href="/forgotpassword"
              className="text-sm text-indigo-600 hover:text-indigo-800 transition duration-200"
            >
              Forgot password?
            </Link>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Log In
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
