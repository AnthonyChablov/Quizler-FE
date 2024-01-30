'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import Container from '@/components/Common/Container';
import Hero from '../Common/Hero/Hero';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { registerUser } from '@/api/userData'; // Adjust the path as per your project structure

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  // const handleRegister = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Handle registration logic here
  //   console.log('Register with:', username, email, password, confirmPassword);
  //   // You can add API call for user registration here
  // };
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      // Handle the case where passwords do not match
      console.error('Passwords do not match');
      return;
    }

    try {
      // Call the registerUser API function
      const response = await registerUser({
        username,
        email, // Assuming your API expects an 'email' field
        password,
        password2: confirmPassword, // Send confirmPassword as password2
      });
      console.log('Registration successful:', response);
      setMessage('Registration successful! Please log in.'); // Set success message
    } catch (error) {
      console.error('Registration failed:', error);
      setMessage('Registration failed: ' + error); // Set error message
    }
  };
  return (
    <div className="h-full min-h-screen bg-slate-200">
      <Hero
        title="Join Us!"
        description="🌟 Create your account to start exploring new possibilities."
      />
      <Container>
        <div className="max-w-sm mx-auto mt-10">
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
            <Input
              placeholder="Email"
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
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Register
            </Button>
          </form>
          {message && (
            <div className="mt-4 text-center text-red-500">{message}</div>
          )}{' '}
          {/* Display the message */}
          <div className="mt-4 text-center">
            <p className="text-sm">
              Already have an account?{' '}
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

export default RegisterPage;
