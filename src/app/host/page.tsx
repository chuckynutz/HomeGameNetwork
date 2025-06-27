'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, MapPin, Users, DollarSign } from 'lucide-react';

export default function HostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    gameType: 'Texas Hold\'em',
    date: '',
    time: '',
    maxPlayers: '8',
    buyIn: '',
    location: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Creating game:', formData);
    router.push('/games');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
        <h1 className="text-xl font-bold ml-4">Host a Game</h1>
      </header>
      
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Game Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Game Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Friday Night Poker"
              className="w-full bg-[#001845] border border-[#0A2463] rounded-lg px-4 py-3 text-white placeholder-[#A0A0A0]"
              required
            />
          </div>

          {/* Game Type */}
          <div>
            <label className="block text-sm font-medium mb-2">Game Type</label>
            <select
              name="gameType"
              value={formData.gameType}
              onChange={handleChange}
              className="w-full bg-[#001845] border border-[#0A2463] rounded-lg px-4 py-3 text-white"
            >
              <option value="Texas Hold'em">Texas Hold'em</option>
              <option value="Omaha">Omaha</option>
              <option value="Seven Card Stud">Seven Card Stud</option>
              <option value="Mixed Games">Mixed Games</option>
              <option value="Tournament">Tournament</option>
            </select>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0A0A0]" size={20} />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-[#001845] border border-[#0A2463] rounded-lg pl-10 pr-4 py-3 text-white"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0A0A0]" size={20} />
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full bg-[#001845] border border-[#0A2463] rounded-lg pl-10 pr-4 py-3 text-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* Players and Buy-in */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Max Players</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0A0A0]" size={20} />
                <select
                  name="maxPlayers"
                  value={formData.maxPlayers}
                  onChange={handleChange}
                  className="w-full bg-[#001845] border border-[#0A2463] rounded-lg pl-10 pr-4 py-3 text-white"
                >
                  {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num.toString()}>{num}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Buy-in ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0A0A0]" size={20} />
                <input
                  type="number"
                  name="buyIn"
                  value={formData.buyIn}
                  onChange={handleChange}
                  placeholder="50"
                  min="0"
                  className="w-full bg-[#001845] border border-[#0A2463] rounded-lg pl-10 pr-4 py-3 text-white placeholder-[#A0A0A0]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0A0A0]" size={20} />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter address or location"
                className="w-full bg-[#001845] border border-[#0A2463] rounded-lg pl-10 pr-4 py-3 text-white placeholder-[#A0A0A0]"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell players about your game..."
              rows={4}
              className="w-full bg-[#001845] border border-[#0A2463] rounded-lg px-4 py-3 text-white placeholder-[#A0A0A0] resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#0052CC] text-white font-bold py-4 rounded-lg text-lg"
          >
            Create Game
          </button>
        </form>
      </div>
    </div>
  );
} 