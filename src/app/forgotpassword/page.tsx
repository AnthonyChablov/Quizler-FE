'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import Container from '@/components/Common/Container';
import Hero from '../../components/Common/Hero/Hero';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic here
    console.log('Reset password for:', email);
    // You can add API call for password reset here
  };

  return (
    <div className="h-full min-h-screen bg-slate-200">
      <Hero
        title="Forgot Password?"
        description="No worries, we'll send you a link to reset it!"
      />
      <Container>
        <div className="max-w-sm mx-auto mt-10">
          <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Send Reset Link
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm">
              Remembered your password?{' '}
              <Link
                href="/login"
                className="text-indigo-600 hover:text-indigo-800"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ForgotPasswordPage;
