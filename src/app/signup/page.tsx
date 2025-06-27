'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Mail, Lock, Calendar } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Signing up:', formData);
    router.push('/');
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

        {/* Signup Form */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-3xl p-8 shadow-2xl shadow-[#4B9CD3]/20">
          <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] bg-clip-text text-transparent">
            Join The Community
          </h1>
          <p className="text-center text-[#A0A0A0] mb-8">
            Create your account to start finding and hosting games
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-[#4B9CD3]">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B9CD3]" size={20} />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    className="w-full bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl pl-10 pr-4 py-3 text-white placeholder-[#A0A0A0] shadow-lg shadow-[#4B9CD3]/20 focus:shadow-xl focus:shadow-[#4B9CD3]/30 transition duration-300"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-[#4B9CD3]">Last Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B9CD3]" size={20} />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    className="w-full bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl pl-10 pr-4 py-3 text-white placeholder-[#A0A0A0] shadow-lg shadow-[#4B9CD3]/20 focus:shadow-xl focus:shadow-[#4B9CD3]/30 transition duration-300"
                    required
                  />
                </div>
              </div>
            </div>

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

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#4B9CD3]">Date of Birth</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B9CD3]" size={20} />
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl pl-10 pr-4 py-3 text-white shadow-lg shadow-[#4B9CD3]/20 focus:shadow-xl focus:shadow-[#4B9CD3]/30 transition duration-300"
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
                  placeholder="Create a password"
                  className="w-full bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl pl-10 pr-4 py-3 text-white placeholder-[#A0A0A0] shadow-lg shadow-[#4B9CD3]/20 focus:shadow-xl focus:shadow-[#4B9CD3]/30 transition duration-300"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#4B9CD3]">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B9CD3]" size={20} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl pl-10 pr-4 py-3 text-white placeholder-[#A0A0A0] shadow-lg shadow-[#4B9CD3]/20 focus:shadow-xl focus:shadow-[#4B9CD3]/30 transition duration-300"
                  required
                />
              </div>
            </div>

            {/* Terms */}
            <div className="text-sm text-[#A0A0A0]">
              By signing up, you agree to our{' '}
              <button type="button" className="text-[#4B9CD3] hover:text-[#7BB3E6] transition duration-300">
                Terms of Service
              </button>{' '}
              and{' '}
              <button type="button" className="text-[#4B9CD3] hover:text-[#7BB3E6] transition duration-300">
                Privacy Policy
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] text-black font-bold py-3 rounded-2xl text-lg hover:from-[#3A8BC2] hover:to-[#6AA2D5] transition duration-300 shadow-lg shadow-[#4B9CD3]/30 hover:shadow-xl hover:shadow-[#4B9CD3]/40 transform hover:scale-105"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-[#A0A0A0]">
              Already have an account?{' '}
              <button 
                onClick={() => router.push('/login')}
                className="text-[#4B9CD3] hover:text-[#7BB3E6] transition duration-300 font-semibold"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 