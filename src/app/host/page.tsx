'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, MapPin, Users, DollarSign, Wifi, Coffee, Car, Cigarette, ParkingCircle, Utensils, Wine, Music, Tv } from 'lucide-react';
import { useAuthStore } from '../../hooks/use-auth-store';

interface Amenity {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const amenities: Amenity[] = [
  { id: 'wifi', name: 'WiFi', icon: <Wifi size={20} />, description: 'Free WiFi available' },
  { id: 'coffee', name: 'Coffee', icon: <Coffee size={20} />, description: 'Coffee & refreshments' },
  { id: 'parking', name: 'Parking', icon: <Car size={20} />, description: 'Free parking available' },
  { id: 'smoking', name: 'Smoking', icon: <Cigarette size={20} />, description: 'Smoking area available' },
  { id: 'food', name: 'Food', icon: <Utensils size={20} />, description: 'Food provided' },
  { id: 'alcohol', name: 'Alcohol', icon: <Wine size={20} />, description: 'BYOB or provided' },
  { id: 'music', name: 'Music', icon: <Music size={20} />, description: 'Background music' },
  { id: 'tv', name: 'TV', icon: <Tv size={20} />, description: 'TV for sports/entertainment' },
];

export default function HostPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Check if user is authenticated
    if (!isAuthenticated || !user) {
      setError('You must be logged in to host a game');
      setIsLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      
      // Add form fields
      formDataToSend.append('title', formData.title);
      formDataToSend.append('gameType', formData.gameType);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('time', formData.time);
      formDataToSend.append('maxPlayers', formData.maxPlayers);
      formDataToSend.append('buyIn', formData.buyIn);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('amenities', JSON.stringify(selectedAmenities));
      formDataToSend.append('hostId', user.id);
      formDataToSend.append('hostName', user.name);

      if (selectedPhoto) {
        formDataToSend.append('photo', selectedPhoto);
      }

      const response = await fetch('/api/games', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create game');
      }

      const data = await response.json();
      console.log('Game created successfully:', data);
      
      // Redirect to games page after successful creation
      router.push('/games');
    } catch (error) {
      console.error('Error creating game:', error);
      setError(error instanceof Error ? error.message : 'Failed to create game. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedPhoto(e.target.files[0]);
    }
  };

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenityId) 
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-4">
      <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-3xl shadow-2xl shadow-[#4B9CD3]/20 p-6 mt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#4B9CD3]">Host a Game</h1>
          <button 
            onClick={() => router.back()}
            className="flex items-center text-[#A0A0A0] hover:text-[#4B9CD3] transition duration-300"
          >
            <ArrowLeft size={20} className="mr-1" />
            Back
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Display */}
          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-2xl p-4 text-red-400">
              {error}
            </div>
          )}
          
          {/* Game Title */}
          <div>
            <label className="block text-sm font-medium mb-2 text-[#4B9CD3]">Game Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Friday Night Poker"
              className="w-full bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl px-4 py-3 text-white placeholder-[#A0A0A0] shadow-lg shadow-[#4B9CD3]/20 focus:shadow-xl focus:shadow-[#4B9CD3]/30 transition duration-300"
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
              className="w-full bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl px-4 py-3 text-white shadow-lg shadow-[#4B9CD3]/20 focus:shadow-xl focus:shadow-[#4B9CD3]/30 transition duration-300"
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
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B9CD3]" size={18} />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl pl-10 pr-4 py-3 text-white shadow-lg shadow-[#4B9CD3]/20 focus:shadow-xl focus:shadow-[#4B9CD3]/30 transition duration-300"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-[#4B9CD3]">Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B9CD3]" size={18} />
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl pl-10 pr-4 py-3 text-white shadow-lg shadow-[#4B9CD3]/20 focus:shadow-xl focus:shadow-[#4B9CD3]/30 transition duration-300"
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
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B9CD3]" size={18} />
                <select
                  name="maxPlayers"
                  value={formData.maxPlayers}
                  onChange={handleChange}
                  className="w-full bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl pl-10 pr-4 py-3 text-white shadow-lg shadow-[#4B9CD3]/20 focus:shadow-xl focus:shadow-[#4B9CD3]/30 transition duration-300"
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
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B9CD3]" size={18} />
                <input
                  type="number"
                  name="buyIn"
                  value={formData.buyIn}
                  onChange={handleChange}
                  placeholder="50"
                  min="0"
                  className="w-full bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl pl-10 pr-4 py-3 text-white placeholder-[#A0A0A0] shadow-lg shadow-[#4B9CD3]/20 focus:shadow-xl focus:shadow-[#4B9CD3]/30 transition duration-300"
                  required
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-2 text-[#4B9CD3]">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B9CD3]" size={18} />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter address or location"
                className="w-full bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl pl-10 pr-4 py-3 text-white placeholder-[#A0A0A0] shadow-lg shadow-[#4B9CD3]/20 focus:shadow-xl focus:shadow-[#4B9CD3]/30 transition duration-300"
                required
              />
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium mb-2 text-[#4B9CD3]">Game Photo (Optional)</label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl px-4 py-3 text-white file:bg-[#4B9CD3] file:text-black file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4 file:font-semibold hover:file:bg-[#3A8BC2] transition duration-300 shadow-lg shadow-[#4B9CD3]/20 focus:shadow-xl focus:shadow-[#4B9CD3]/30"
              />
            </div>
            {selectedPhoto && (
              <p className="text-sm text-[#10B981] mt-2">
                Selected: {selectedPhoto.name}
              </p>
            )}
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium mb-3 text-[#4B9CD3]">Amenities</label>
            <div className="grid grid-cols-2 gap-3">
              {amenities.map((amenity) => (
                <button
                  key={amenity.id}
                  type="button"
                  onClick={() => toggleAmenity(amenity.id)}
                  className={`flex items-center gap-3 p-3 rounded-2xl border transition-all duration-300 ${
                    selectedAmenities.includes(amenity.id)
                      ? 'bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] text-black border-[#4B9CD3] shadow-lg shadow-[#4B9CD3]/30'
                      : 'bg-gradient-to-r from-gray-800 to-gray-700 text-[#A0A0A0] border-[#4B9CD3] hover:text-white shadow-lg shadow-[#4B9CD3]/20 hover:shadow-xl hover:shadow-[#4B9CD3]/30'
                  }`}
                >
                  {amenity.icon}
                  <span className="text-sm font-medium">{amenity.name}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-[#A0A0A0] mt-2">
              Selected amenities will appear on your game listing
            </p>
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
              className="w-full bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl px-4 py-3 text-white placeholder-[#A0A0A0] resize-none shadow-lg shadow-[#4B9CD3]/20 focus:shadow-xl focus:shadow-[#4B9CD3]/30 transition duration-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full font-bold py-4 rounded-2xl text-lg transition duration-300 shadow-lg shadow-[#4B9CD3]/30 hover:shadow-xl hover:shadow-[#4B9CD3]/40 transform hover:scale-105 ${
              isLoading
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] text-black hover:from-[#3A8BC2] hover:to-[#6AA2D5]'
            }`}
          >
            {isLoading ? 'Creating Game...' : 'Create Game'}
          </button>
        </form>
      </div>
    </div>
  );
}