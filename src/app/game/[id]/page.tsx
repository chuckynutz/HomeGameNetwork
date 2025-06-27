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
    <div className="min-h-screen bg-[#001233] text-white">
      {/* Header */}
      <header className="flex items-center px-4 py-3 border-b border-[#0A2463]">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-[#A0A0A0]"
        >
          <ArrowLeft size={20} className="mr-1" />
          Back
        </button>
        <h1 className="text-xl font-bold ml-4">Game Details</h1>
        <div className="ml-auto">
          <button className="text-[#A0A0A0]">
            <Share2 size={20} />
          </button>
        </div>
      </header>
      
      <div className="pb-20">
        {/* Game Image */}
        <div className="relative h-48">
          <img 
            src={game.image} 
            alt={game.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-[#0052CC] text-white px-3 py-1 rounded-full text-sm font-bold">
            ${game.buyIn}
          </div>
        </div>
        
        <div className="p-4 space-y-6">
          {/* Game Title and Host */}
          <div>
            <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
            <div className="flex items-center">
              <img 
                src={game.hostAvatar} 
                alt={game.host}
                className="w-8 h-8 rounded-full mr-3"
              />
              <div>
                <p className="text-sm text-[#A0A0A0]">Hosted by</p>
                <p className="font-medium">{game.host}</p>
              </div>
            </div>
          </div>

          {/* Game Details */}
          <div className="bg-[#001845] border border-[#0A2463] rounded-xl p-4 space-y-3">
            <div className="flex items-center">
              <Calendar size={20} className="mr-3 text-[#A0A0A0]" />
              <div>
                <p className="text-sm text-[#A0A0A0]">Date & Time</p>
                <p className="font-medium">
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
              <MapPin size={20} className="mr-3 text-[#A0A0A0]" />
              <div>
                <p className="text-sm text-[#A0A0A0]">Location</p>
                <p className="font-medium">{game.location.address}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Users size={20} className="mr-3 text-[#A0A0A0]" />
              <div>
                <p className="text-sm text-[#A0A0A0]">Players</p>
                <p className="font-medium">
                  {game.currentPlayers}/{game.maxPlayers} • {game.gameType} • {game.skillLevel}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-bold mb-3">About This Game</h3>
            <p className="text-[#A0A0A0] leading-relaxed">{game.description}</p>
          </div>

          {/* Players */}
          <div>
            <h3 className="text-lg font-bold mb-3">Players ({game.currentPlayers}/{game.maxPlayers})</h3>
            <div className="grid grid-cols-2 gap-3">
              {game.players.map((player) => (
                <div key={player.id} className="flex items-center bg-[#001845] border border-[#0A2463] rounded-lg p-3">
                  <img 
                    src={player.avatar} 
                    alt={player.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium text-sm">{player.name}</p>
                    <p className="text-xs text-[#A0A0A0] capitalize">{player.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#001845] border-t border-[#0A2463] p-4">
        <div className="flex space-x-3">
          <button 
            onClick={handleMessageHost}
            className="flex-1 bg-[#001845] border border-[#0A2463] text-white font-bold py-3 rounded-lg flex items-center justify-center"
          >
            <MessageCircle size={20} className="mr-2" />
            Message Host
          </button>
          <button 
            onClick={handleJoinGame}
            className="flex-1 bg-[#0052CC] text-white font-bold py-3 rounded-lg"
          >
            Join Game
          </button>
        </div>
      </div>
    </div>
  );
} 