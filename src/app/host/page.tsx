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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="flex items-center px-4 py-3 border-b border-[#4B9CD3] bg-gradient-to-r from-black to-gray-900">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-[#A0A0A0] hover:text-[#4B9CD3] transition duration-300"
        >
          <ArrowLeft size={20} className="mr-1" />
          Back
        </button>
        <h1 className="text-xl font-bold ml-4 text-[#4B9CD3]">Host a Game</h1>
      </header>
      
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Game Title */}
          <div>
            <label className="block text-sm font-medium mb-2 text-[#4B9CD3]">Game Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Friday Night Poker"
              className="w-full bg-gradient-to-r from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-2xl px-4 py-3 text-white placeholder-[#A0A0A0] shadow-lg shadow-[#4B9CD3]/20 focus:shadow-xl focus:shadow-[#4B9CD3]/30 transition duration-300"
              required
            />
          </div>

          {/* Game Type */}
          <div>
            <label className="block text-sm font-medium mb-2 text-[#4B9CD3]">Game Type</label>
            <select
              name="gameType"
              value={formData.gameType}
              onChange={handleChange}
              className="w-full bg-gradient-to-r from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-2xl px-4 py-3 text-white shadow-lg shadow-[#4B9CD3]/20 focus:shadow-xl focus:shadow-[#4B9CD3]/30 transition duration-300"
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
              <label className="block text-sm font-medium mb-2 text-[#4B9CD3]">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B9CD3]" size={20} />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-gradient-to-r from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-2xl pl-10 pr-4 py-3 text-white shadow-lg shadow-[#4B9CD3]/20 focus:shadow-xl focus:shadow-[#4B9CD3]/30 transition duration-300"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-[#4B9CD3]">Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B9CD3]" size={20} />
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full bg-gradient-to-r from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-2xl pl-10 pr-4 py-3 text-white shadow-lg shadow-[#4B9CD3]/20 focus:shadow-xl focus:shadow-[#4B9CD3]/30 transition duration-300"
                  required
                />
              </div>
            </div>
          </div>

          {/* Players and Buy-in */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-[#4B9CD3]">Max Players</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B9CD3]" size={20} />
                <select
                  name="maxPlayers"
                  value={formData.maxPlayers}
                  onChange={handleChange}
                  className="w-full bg-gradient-to-r from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-2xl pl-10 pr-4 py-3 text-white shadow-lg shadow-[#4B9CD3]/20 focus:shadow-xl focus:shadow-[#4B9CD3]/30 transition duration-300"
                >
                  {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num.toString()}>{num}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-[#4B9CD3]">Buy-in ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B9CD3]" size={20} />
                <input
                  type="number"
                  name="buyIn"
                  value={formData.buyIn}
                  onChange={handleChange}
                  placeholder="50"
                  min="0"
                  className="w-full bg-gradient-to-r from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-2xl pl-10 pr-4 py-3 text-white placeholder-[#A0A0A0] shadow-lg shadow-[#4B9CD3]/20 focus:shadow-xl focus:shadow-[#4B9CD3]/30 transition duration-300"
                  required
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-2 text-[#4B9CD3]">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B9CD3]" size={20} />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter address or location"
                className="w-full bg-gradient-to-r from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-2xl pl-10 pr-4 py-3 text-white placeholder-[#A0A0A0] shadow-lg shadow-[#4B9CD3]/20 focus:shadow-xl focus:shadow-[#4B9CD3]/30 transition duration-300"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2 text-[#4B9CD3]">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell players about your game..."
              rows={4}
              className="w-full bg-gradient-to-r from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-2xl px-4 py-3 text-white placeholder-[#A0A0A0] resize-none shadow-lg shadow-[#4B9CD3]/20 focus:shadow-xl focus:shadow-[#4B9CD3]/30 transition duration-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] text-black font-bold py-4 rounded-2xl text-lg hover:from-[#3A8BC2] hover:to-[#6AA2D5] transition duration-300 shadow-lg shadow-[#4B9CD3]/30 hover:shadow-xl hover:shadow-[#4B9CD3]/40 transform hover:scale-105"
          >
            Create Game
          </button>
        </form>
      </div>
    </div>
  );
} 