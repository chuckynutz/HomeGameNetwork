'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, Shield, MapPin, Users, Calendar, DollarSign } from 'lucide-react';
import { colors } from '@/constants/colors';
import { Logo } from '@/components/Logo';
import { useAuthStore } from '@/hooks/use-auth-store';

// Mock data for featured games
const mockFeaturedGames = {
  games: [
    {
      id: '1',
      title: 'Friday Night Poker',
      image: 'https://images.unsplash.com/photo-1541278107931-e006523892df?w=400&h=200&fit=crop',
      location: { city: 'Austin', state: 'TX' },
      date: '2024-01-15',
      currentPlayers: 6,
      maxPlayers: 8,
      buyIn: 50
    },
    {
      id: '2',
      title: 'Weekend Tournament',
      image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=400&h=200&fit=crop',
      location: { city: 'Austin', state: 'TX' },
      date: '2024-01-20',
      currentPlayers: 4,
      maxPlayers: 10,
      buyIn: 100
    }
  ]
};

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, isAgeVerified, user } = useAuthStore();
  
  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !isAgeVerified) {
      router.push('/auth/verify');
    } else if (!isAuthenticated) {
      router.push('/auth/register');
    }
  }, [isAuthenticated, isAgeVerified, router]);

  return (
    <div className="min-h-screen bg-[#001233] text-white">
      {/* Header */}
      <header className="flex items-center px-4 py-3 border-b border-[#0A2463]">
        <Logo size={40} />
        <h1 className="text-xl font-bold ml-2">The Home Game</h1>
      </header>
      
      <div className="p-4">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">
            {isAuthenticated ? `Welcome back, ${user?.name?.split(' ')[0] || 'Player'}` : 'Welcome to The Home Game'}
          </h2>
          <p className="text-[#A0A0A0] text-lg">
            Find and host poker games in your area
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="mb-8 space-y-3">
          <button 
            className="w-full bg-[#0052CC] flex justify-between items-center p-4 rounded-xl text-lg font-bold"
            onClick={() => router.push('/games')}
          >
            <span>Find Games</span>
            <ChevronRight size={20} />
          </button>
          
          <button 
            className="w-full bg-[#0052CC] flex justify-between items-center p-4 rounded-xl text-lg font-bold"
            onClick={() => router.push('/host')}
          >
            <span>Host a Game</span>
            <ChevronRight size={20} />
          </button>
        </div>
        
        {/* Featured Games */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Featured Games</h3>
          
          <div className="space-y-4">
            {mockFeaturedGames.games.map((game) => (
              <div 
                key={game.id}
                className="relative h-48 rounded-xl overflow-hidden cursor-pointer"
                onClick={() => router.push(`/game/${game.id}`)}
              >
                <img 
                  src={game.image} 
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="text-xl font-bold text-white mb-2">{game.title}</h4>
                  
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center bg-black bg-opacity-50 px-2 py-1 rounded-full text-xs">
                      <MapPin size={12} className="mr-1" />
                      <span>{game.location.city}, {game.location.state}</span>
                    </div>
                    
                    <div className="flex items-center bg-black bg-opacity-50 px-2 py-1 rounded-full text-xs">
                      <Calendar size={12} className="mr-1" />
                      <span>
                        {new Date(game.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    <div className="flex items-center bg-black bg-opacity-50 px-2 py-1 rounded-full text-xs">
                      <Users size={12} className="mr-1" />
                      <span>{game.currentPlayers}/{game.maxPlayers}</span>
                    </div>
                    
                    <div className="flex items-center bg-black bg-opacity-50 px-2 py-1 rounded-full text-xs">
                      <DollarSign size={12} className="mr-1" />
                      <span>${game.buyIn}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className="w-full bg-[#001845] border border-[#0A2463] p-3 rounded-lg font-bold mt-4"
            onClick={() => router.push('/games')}
          >
            View All Games
          </button>
        </div>
        
        {/* Info Cards */}
        <div className="space-y-4">
          <div className="bg-[#001845] border border-[#0A2463] rounded-xl p-4 text-center">
            <Shield size={32} className="mx-auto mb-3 text-[#0052CC]" />
            <h4 className="text-lg font-bold mb-2">Safe & Secure</h4>
            <p className="text-[#A0A0A0] text-sm leading-relaxed">
              All players are verified for a safe gaming environment.
            </p>
          </div>
          
          <div className="bg-[#001845] border border-[#0A2463] rounded-xl p-4 text-center">
            <Users size={32} className="mx-auto mb-3 text-[#0052CC]" />
            <h4 className="text-lg font-bold mb-2">Community</h4>
            <p className="text-[#A0A0A0] text-sm leading-relaxed">
              Connect with other poker enthusiasts in your area.
            </p>
          </div>
          
          <div className="bg-[#001845] border border-[#0A2463] rounded-xl p-4 text-center">
            <DollarSign size={32} className="mx-auto mb-3 text-[#0052CC]" />
            <h4 className="text-lg font-bold mb-2">Track Winnings</h4>
            <p className="text-[#A0A0A0] text-sm leading-relaxed">
              Keep track of your poker stats and improve your game.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
