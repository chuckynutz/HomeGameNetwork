'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/hooks/use-auth-store';
import { Logo } from '@/components/Logo';

export default function AgeVerificationPage() {
  const router = useRouter();
  const { setAgeVerified, setFirstOpen } = useAuthStore();
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = () => {
    setIsVerified(true);
    setAgeVerified(true);
    setFirstOpen(false);
    
    // Redirect to registration after a brief delay
    setTimeout(() => {
      router.push('/auth/register');
    }, 1000);
  };

  const handleDecline = () => {
    alert('You must be 21 or older to use this app.');
  };

  return (
    <div className="min-h-screen bg-[#001233] text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <Logo size={80} />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Welcome to The Home Game</h1>
        <p className="text-[#A0A0A0] text-lg mb-8">
          Find and host poker games in your area
        </p>
        
        <div className="bg-[#001845] border border-[#0A2463] rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Age Verification</h2>
          <p className="text-[#A0A0A0] mb-6">
            You must be 21 years or older to use this app. By continuing, you confirm that you are at least 21 years old.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={handleVerify}
              className="w-full bg-[#0052CC] text-white font-bold py-3 rounded-lg text-lg"
            >
              I am 21 or older
            </button>
            
            <button
              onClick={handleDecline}
              className="w-full bg-[#001845] border border-[#0A2463] text-[#A0A0A0] font-bold py-3 rounded-lg"
            >
              I am under 21
            </button>
          </div>
        </div>
        
        {isVerified && (
          <div className="text-[#10B981] font-medium">
            ✓ Age verified! Redirecting...
          </div>
        )}
        
        <p className="text-xs text-[#A0A0A0] mt-8">
          By using this app, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
} 