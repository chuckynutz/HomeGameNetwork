'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, MapPin, Users, Calendar, Clock, DollarSign, MessageCircle, Share2 } from 'lucide-react';

// Mock game data
const mockGame = {
  id: '1',
  title: 'Friday Night Poker',
  host: 'Mike Johnson',
  hostAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  image: 'https://images.unsplash.com/photo-1541278107931-e006523892df?w=400&h=200&fit=crop',
  location: { 
    city: 'Austin', 
    state: 'TX', 
    address: '123 Main St, Austin, TX 78701',
    coordinates: { lat: 30.2672, lng: -97.7431 }
  },
  date: '2024-01-15',
  time: '19:00',
  currentPlayers: 6,
  maxPlayers: 8,
  buyIn: 50,
  gameType: 'Texas Hold\'em',
  skillLevel: 'Intermediate',
  description: 'Casual Friday night poker game. All skill levels welcome. We play Texas Hold\'em with friendly stakes. Snacks and drinks provided.',
  players: [
    { id: '1', name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face', status: 'host' },
    { id: '2', name: 'Sarah Wilson', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face', status: 'confirmed' },
    { id: '3', name: 'David Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face', status: 'confirmed' },
    { id: '4', name: 'Emily Davis', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face', status: 'confirmed' },
    { id: '5', name: 'John Smith', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face', status: 'confirmed' },
    { id: '6', name: 'Lisa Brown', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face', status: 'confirmed' },
  ]
};

export default function GameDetailPage() {
  const router = useRouter();
  const params = useParams();
  const gameId = params.id as string;

  // In a real app, you would fetch the game data based on the ID
  const game = mockGame;

  const handleJoinGame = () => {
    // Here you would typically send a request to join the game
    console.log('Joining game:', gameId);
    alert('Game joined successfully!');
  };

  const handleMessageHost = () => {
    // Here you would typically open a chat or messaging interface
    console.log('Messaging host');
    alert('Opening chat with host...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-4">
      <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-3xl shadow-2xl shadow-[#4B9CD3]/20 p-6 mt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-[#A0A0A0] hover:text-[#4B9CD3] transition duration-300"
          >
            <ArrowLeft size={20} className="mr-1" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-[#4B9CD3]">Game Details</h1>
          <button className="text-[#A0A0A0] hover:text-[#4B9CD3] transition duration-300">
            <Share2 size={20} />
          </button>
        </div>
        
        {/* Game Image */}
        <div className="relative h-48 mb-6 rounded-2xl overflow-hidden border border-[#4B9CD3] shadow-lg shadow-[#4B9CD3]/20">
          <img 
            src={game.image} 
            alt={game.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] text-black px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            ${game.buyIn}
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Game Title and Host */}
          <div>
            <h2 className="text-2xl font-bold mb-3 text-[#4B9CD3]">{game.title}</h2>
            <div className="flex items-center bg-gradient-to-br from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl p-4 shadow-lg shadow-[#4B9CD3]/20">
              <img 
                src={game.hostAvatar} 
                alt={game.host}
                className="w-12 h-12 rounded-full mr-4 border-2 border-[#4B9CD3]"
              />
              <div>
                <p className="text-sm text-[#A0A0A0]">Hosted by</p>
                <p className="font-bold text-[#4B9CD3]">{game.host}</p>
              </div>
            </div>
          </div>

          {/* Game Details */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl p-4 space-y-4 shadow-lg shadow-[#4B9CD3]/20">
            <div className="flex items-center">
              <Calendar size={20} className="mr-3 text-[#4B9CD3]" />
              <div>
                <p className="text-sm text-[#A0A0A0]">Date & Time</p>
                <p className="font-bold text-white">
                  {new Date(game.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })} at {game.time}
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <MapPin size={20} className="mr-3 text-[#4B9CD3]" />
              <div>
                <p className="text-sm text-[#A0A0A0]">Location</p>
                <p className="font-bold text-white">{game.location.address}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Users size={20} className="mr-3 text-[#4B9CD3]" />
              <div>
                <p className="text-sm text-[#A0A0A0]">Players</p>
                <p className="font-bold text-white">
                  {game.currentPlayers}/{game.maxPlayers} • {game.gameType} • {game.skillLevel}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl p-4 shadow-lg shadow-[#4B9CD3]/20">
            <h3 className="text-lg font-bold mb-3 text-[#4B9CD3]">About This Game</h3>
            <p className="text-[#A0A0A0] leading-relaxed">{game.description}</p>
          </div>

          {/* Players */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl p-4 shadow-lg shadow-[#4B9CD3]/20">
            <h3 className="text-lg font-bold mb-4 text-[#4B9CD3]">Players ({game.currentPlayers}/{game.maxPlayers})</h3>
            <div className="grid grid-cols-2 gap-3">
              {game.players.map((player) => (
                <div key={player.id} className="flex items-center bg-gradient-to-br from-gray-700 to-gray-600 border border-[#4B9CD3] rounded-xl p-3 shadow-md shadow-[#4B9CD3]/10">
                  <img 
                    src={player.avatar} 
                    alt={player.name}
                    className="w-10 h-10 rounded-full mr-3 border border-[#4B9CD3]"
                  />
                  <div>
                    <p className="font-bold text-sm text-white">{player.name}</p>
                    <p className="text-xs text-[#A0A0A0] capitalize">{player.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="flex space-x-3 mt-8">
          <button 
            onClick={handleMessageHost}
            className="flex-1 bg-gradient-to-br from-gray-800 to-gray-700 border border-[#4B9CD3] text-white font-bold py-3 rounded-2xl flex items-center justify-center shadow-lg shadow-[#4B9CD3]/20 hover:shadow-xl hover:shadow-[#4B9CD3]/30 transition duration-300"
          >
            <MessageCircle size={20} className="mr-2" />
            Message Host
          </button>
          <button 
            onClick={handleJoinGame}
            className="flex-1 bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] text-black font-bold py-3 rounded-2xl shadow-lg shadow-[#4B9CD3]/30 hover:shadow-xl hover:shadow-[#4B9CD3]/40 transition duration-300 transform hover:scale-105"
          >
            Join Game
          </button>
        </div>
      </div>
    </div>
  );
} 