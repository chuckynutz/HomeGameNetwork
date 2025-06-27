'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Users, Calendar, DollarSign, Search, Filter, List, Map } from 'lucide-react';

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
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-4">
      <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-3xl shadow-2xl shadow-[#4B9CD3]/20 p-6 mt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#4B9CD3]">Find Games</h1>
          <button 
            onClick={() => router.back()}
            className="text-[#A0A0A0] hover:text-[#4B9CD3] transition duration-300"
          >
            ← Back
          </button>
        </div>

        {/* Search and Filter Row */}
        <div className="flex gap-3 mb-6">
          {/* Search - Top Left */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0A0A0]" size={18} />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl pl-10 pr-4 py-3 text-white placeholder-[#A0A0A0] shadow-lg shadow-[#4B9CD3]/20 focus:shadow-xl focus:shadow-[#4B9CD3]/30 transition duration-300 text-sm"
            />
          </div>
          
          {/* Filter - Top Right */}
          <button className="bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl p-3 text-[#A0A0A0] hover:text-[#4B9CD3] transition duration-300 shadow-lg shadow-[#4B9CD3]/20 hover:shadow-xl hover:shadow-[#4B9CD3]/30">
            <Filter size={18} />
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex bg-gray-800 rounded-2xl p-1 mb-6 border border-[#4B9CD3]">
          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl font-semibold transition-all duration-300 ${
              viewMode === 'list'
                ? 'bg-[#4B9CD3] text-black shadow-lg'
                : 'text-[#A0A0A0] hover:text-white'
            }`}
          >
            <List size={16} />
            List
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl font-semibold transition-all duration-300 ${
              viewMode === 'map'
                ? 'bg-[#4B9CD3] text-black shadow-lg'
                : 'text-[#A0A0A0] hover:text-white'
            }`}
          >
            <Map size={16} />
            Map
          </button>
        </div>

        {/* Content */}
        {viewMode === 'list' ? (
          /* List View */
          <div className="space-y-4">
            {mockGames.map((game) => (
              <div 
                key={game.id}
                className="bg-gradient-to-br from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl overflow-hidden cursor-pointer shadow-lg shadow-[#4B9CD3]/20 hover:shadow-xl hover:shadow-[#4B9CD3]/30 transition duration-300 transform hover:scale-105"
                onClick={() => router.push(`/game/${game.id}`)}
              >
                <div className="relative h-24">
                  <img 
                    src={game.image} 
                    alt={game.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] text-black px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                    ${game.buyIn}
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-[#4B9CD3]">{game.title}</h3>
                    <span className="text-[#10B981] text-sm font-bold">
                      {game.currentPlayers}/{game.maxPlayers}
                    </span>
                  </div>
                  
                  <p className="text-[#A0A0A0] text-sm mb-3">Hosted by {game.host}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <MapPin size={14} className="mr-2 text-[#4B9CD3]" />
                      <span className="text-[#A0A0A0]">{game.location.address}, {game.location.city}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <Calendar size={14} className="mr-2 text-[#4B9CD3]" />
                      <span className="text-[#A0A0A0]">
                        {new Date(game.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })} at {game.time}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <Users size={14} className="mr-2 text-[#4B9CD3]" />
                      <span className="text-[#A0A0A0]">{game.gameType} • {game.skillLevel}</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] text-black font-bold py-2 rounded-2xl mt-3 hover:from-[#3A8BC2] hover:to-[#6AA2D5] transition duration-300 shadow-lg shadow-[#4B9CD3]/30 hover:shadow-xl hover:shadow-[#4B9CD3]/40 transform hover:scale-105">
                    Join Game
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Map View */
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl p-6 text-center shadow-lg shadow-[#4B9CD3]/20">
            <Map size={48} className="mx-auto mb-4 text-[#4B9CD3]" />
            <h3 className="text-lg font-bold text-[#4B9CD3] mb-2">Map View</h3>
            <p className="text-[#A0A0A0] text-sm">
              Interactive map showing game locations will be displayed here.
            </p>
            <p className="text-[#A0A0A0] text-xs mt-2">
              Click on markers to see game details and join directly from the map.
            </p>
          </div>
        )}
        
        {/* Load More */}
        <button className="w-full bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] p-3 rounded-2xl font-bold mt-6 text-[#A0A0A0] hover:text-[#4B9CD3] transition duration-300 shadow-lg shadow-[#4B9CD3]/20 hover:shadow-xl hover:shadow-[#4B9CD3]/30">
          Load More Games
        </button>
      </div>
    </div>
  );
}
