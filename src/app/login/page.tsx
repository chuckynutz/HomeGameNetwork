'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Mail, Lock } from 'lucide-react';
import { useAuthStore } from '../../hooks/use-auth-store';

export default function LoginPage() {
  const router = useRouter();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const setUser = useAuthStore((state) => state.setUser);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setAuthenticated(true);
        setUser({
          id: data.user.localId || data.user.uid || '',
          name: data.user.displayName || '',
          email: data.user.email,
          avatar: ''
        });
        router.push('/');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-[#A0A0A0] hover:text-[#4B9CD3] transition duration-300"
          >
            <ArrowLeft size={20} className="mr-1" />
            Back
          </button>
        </div>

        {/* Login Form */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-3xl p-8 shadow-2xl shadow-[#4B9CD3]/20">
          <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-center text-[#A0A0A0] mb-8">
            Sign in to your account to continue
          </p>

          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-2xl p-4 text-red-400 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#4B9CD3]">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B9CD3]" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl pl-10 pr-4 py-3 text-white placeholder-[#A0A0A0] shadow-lg shadow-[#4B9CD3]/20 focus:shadow-xl focus:shadow-[#4B9CD3]/30 transition duration-300"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#4B9CD3]">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B9CD3]" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl pl-10 pr-4 py-3 text-white placeholder-[#A0A0A0] shadow-lg shadow-[#4B9CD3]/20 focus:shadow-xl focus:shadow-[#4B9CD3]/30 transition duration-300"
                  required
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button type="button" className="text-[#4B9CD3] hover:text-[#7BB3E6] transition duration-300 text-sm">
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] text-black font-bold py-3 rounded-2xl text-lg hover:from-[#3A8BC2] hover:to-[#6AA2D5] transition duration-300 shadow-lg shadow-[#4B9CD3]/30 hover:shadow-xl hover:shadow-[#4B9CD3]/40 transform hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-[#A0A0A0]">
              Don't have an account?{' '}
              <button 
                onClick={() => router.push('/signup')}
                className="text-[#4B9CD3] hover:text-[#7BB3E6] transition duration-300 font-semibold"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 