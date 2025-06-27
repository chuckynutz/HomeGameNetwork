'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Users, Calendar, DollarSign, Search, Filter } from 'lucide-react';

// Mock data for games
const mockGames = [
  {
    id: '1',
    title: 'Friday Night Poker',
    host: 'Mike Johnson',
    image: 'https://images.unsplash.com/photo-1541278107931-e006523892df?w=400&h=200&fit=crop',
    location: { city: 'Austin', state: 'TX', address: '123 Main St' },
    date: '2024-01-15',
    time: '19:00',
    currentPlayers: 6,
    maxPlayers: 8,
    buyIn: 50,
    gameType: 'Texas Hold\'em',
    skillLevel: 'Intermediate'
  },
  {
    id: '2',
    title: 'Weekend Tournament',
    host: 'Sarah Wilson',
    image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=400&h=200&fit=crop',
    location: { city: 'Austin', state: 'TX', address: '456 Oak Ave' },
    date: '2024-01-20',
    time: '14:00',
    currentPlayers: 4,
    maxPlayers: 10,
    buyIn: 100,
    gameType: 'Tournament',
    skillLevel: 'Advanced'
  },
  {
    id: '3',
    title: 'Casual Home Game',
    host: 'David Chen',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop',
    location: { city: 'Austin', state: 'TX', address: '789 Pine Rd' },
    date: '2024-01-18',
    time: '20:00',
    currentPlayers: 3,
    maxPlayers: 6,
    buyIn: 25,
    gameType: 'Mixed Games',
    skillLevel: 'Beginner'
  }
];

export default function GamesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#001233] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-[#0A2463]">
        <button 
          onClick={() => router.back()}
          className="text-[#A0A0A0]"
        >
          ← Back
        </button>
        <h1 className="text-xl font-bold">Find Games</h1>
        <div className="w-8" /> {/* Spacer for centering */}
      </header>
      
      <div className="p-4">
        {/* Search and Filter */}
        <div className="mb-6 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0A0A0]" size={20} />
            <input
              type="text"
              placeholder="Search games..."
              className="w-full bg-[#001845] border border-[#0A2463] rounded-lg pl-10 pr-4 py-3 text-white placeholder-[#A0A0A0]"
            />
          </div>
          
          <button className="w-full bg-[#001845] border border-[#0A2463] rounded-lg p-3 flex items-center justify-center text-[#A0A0A0]">
            <Filter size={20} className="mr-2" />
            Filter Games
          </button>
        </div>
        
        {/* Games List */}
        <div className="space-y-4">
          {mockGames.map((game) => (
            <div 
              key={game.id}
              className="bg-[#001845] border border-[#0A2463] rounded-xl overflow-hidden cursor-pointer"
              onClick={() => router.push(`/game/${game.id}`)}
            >
              <div className="relative h-32">
                <img 
                  src={game.image} 
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-[#0052CC] text-white px-2 py-1 rounded-full text-xs font-bold">
                  ${game.buyIn}
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold">{game.title}</h3>
                  <span className="text-[#10B981] text-sm font-bold">
                    {game.currentPlayers}/{game.maxPlayers}
                  </span>
                </div>
                
                <p className="text-[#A0A0A0] text-sm mb-3">Hosted by {game.host}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <MapPin size={16} className="mr-2 text-[#A0A0A0]" />
                    <span>{game.location.address}, {game.location.city}, {game.location.state}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Calendar size={16} className="mr-2 text-[#A0A0A0]" />
                    <span>
                      {new Date(game.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })} at {game.time}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Users size={16} className="mr-2 text-[#A0A0A0]" />
                    <span>{game.gameType} • {game.skillLevel}</span>
                  </div>
                </div>
                
                <button className="w-full bg-[#0052CC] text-white font-bold py-2 rounded-lg mt-4">
                  Join Game
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Load More */}
        <button className="w-full bg-[#001845] border border-[#0A2463] p-3 rounded-lg font-bold mt-6 text-[#A0A0A0]">
          Load More Games
        </button>
      </div>
    </div>
  );
}
