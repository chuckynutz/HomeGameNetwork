'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, MapPin, Users, Calendar, Clock, DollarSign, MessageCircle, Share2 } from 'lucide-react';

interface GameData {
  id: string;
  title: string;
  host: string;
  hostId: string;
  image: string;
  location: {
    address: string;
    city: string;
    state: string;
  };
  date: string;
  time: string;
  datetime: string;
  currentPlayers: number;
  maxPlayers: number;
  buyIn: number;
  gameType: string;
  description: string;
  amenities: string[];
  players: Array<{
    id: string;
    name: string;
    avatar: string;
    status: string;
  }>;
}

export default function GameDetailPage() {
  const router = useRouter();
  const params = useParams();
  const gameId = params.id as string;
  
  const [game, setGame] = useState<GameData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/games/${gameId}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Game not found');
          } else {
            setError('Failed to load game details');
          }
          return;
        }
        
        const gameData = await response.json();
        setGame(gameData);
      } catch (err) {
        console.error('Error fetching game:', err);
        setError('Failed to load game details');
      } finally {
        setLoading(false);
      }
    };

    if (gameId) {
      fetchGame();
    }
  }, [gameId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4B9CD3] mx-auto mb-4"></div>
          <p className="text-[#A0A0A0]">Loading game details...</p>
        </div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || 'Game not found'}</p>
          <button 
            onClick={() => router.back()}
            className="bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] text-black font-bold py-2 px-6 rounded-full"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

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
                src={game.players.find(p => p.status === 'host')?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'} 
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
                  {new Date(game.datetime).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })} at {new Date(game.datetime).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}
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
                  {game.currentPlayers}/{game.maxPlayers} • {game.gameType}
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