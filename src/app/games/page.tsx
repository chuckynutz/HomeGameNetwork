'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Users, Calendar, DollarSign, Search, Filter, List, Map, X } from 'lucide-react';

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
  },
  {
    id: '4',
    title: 'High Stakes Hold\'em',
    host: 'Jennifer Lee',
    image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=400&h=200&fit=crop',
    location: { city: 'Houston', state: 'TX', address: '321 Elm St' },
    date: '2024-01-22',
    time: '21:00',
    currentPlayers: 5,
    maxPlayers: 8,
    buyIn: 200,
    gameType: 'Texas Hold\'em',
    skillLevel: 'Advanced'
  },
  {
    id: '5',
    title: 'Beginner Friendly',
    host: 'Tom Wilson',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop',
    location: { city: 'Dallas', state: 'TX', address: '654 Maple Dr' },
    date: '2024-01-19',
    time: '18:00',
    currentPlayers: 2,
    maxPlayers: 8,
    buyIn: 10,
    gameType: 'Texas Hold\'em',
    skillLevel: 'Beginner'
  },
  {
    id: '6',
    title: 'Omaha Night',
    host: 'Rachel Green',
    image: 'https://images.unsplash.com/photo-1541278107931-e006523892df?w=400&h=200&fit=crop',
    location: { city: 'San Antonio', state: 'TX', address: '987 Oak Ln' },
    date: '2024-01-21',
    time: '20:00',
    currentPlayers: 4,
    maxPlayers: 6,
    buyIn: 75,
    gameType: 'Omaha',
    skillLevel: 'Intermediate'
  }
];

// Filter options
const gameTypes = ['All', 'Texas Hold\'em', 'Omaha', 'Tournament', 'Mixed Games'];
const skillLevels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const buyInRanges = [
  { label: 'All', min: 0, max: Infinity },
  { label: '$0 - $25', min: 0, max: 25 },
  { label: '$26 - $50', min: 26, max: 50 },
  { label: '$51 - $100', min: 51, max: 100 },
  { label: '$101+', min: 101, max: Infinity }
];

export default function GamesPage() {
  const router = useRouter();
  const [games, setGames] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGameType, setSelectedGameType] = useState('All');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState('All');
  const [selectedBuyInRange, setSelectedBuyInRange] = useState('All');

  // Fetch games from API
  useEffect(() => {
    const fetchGames = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/games');
        
        if (!response.ok) {
          throw new Error('Failed to fetch games');
        }
        
        const gamesData = await response.json();
        setGames(gamesData);
      } catch (error) {
        console.error('Error fetching games:', error);
        setError('Failed to load games. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Filter games based on search and filter criteria
  const filteredGames = useMemo(() => {
    let filtered = games;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(game =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (game.location.city && game.location.city.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Game type filter
    if (selectedGameType !== 'All') {
      filtered = filtered.filter(game => game.gameType === selectedGameType);
    }

    // Skill level filter
    if (selectedSkillLevel !== 'All') {
      filtered = filtered.filter(game => game.skillLevel === selectedSkillLevel);
    }

    // Buy-in range filter
    if (selectedBuyInRange !== 'All') {
      const range = buyInRanges.find(r => r.label === selectedBuyInRange);
      if (range) {
        filtered = filtered.filter(game => game.buyIn >= range.min && game.buyIn <= range.max);
      }
    }

    return filtered;
  }, [games, searchQuery, selectedGameType, selectedSkillLevel, selectedBuyInRange]);

  const clearFilters = () => {
    setSelectedGameType('All');
    setSelectedSkillLevel('All');
    setSelectedBuyInRange('All');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedGameType !== 'All' || selectedSkillLevel !== 'All' || selectedBuyInRange !== 'All' || searchQuery;

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
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl p-3 transition duration-300 shadow-lg shadow-[#4B9CD3]/20 hover:shadow-xl hover:shadow-[#4B9CD3]/30 ${
              hasActiveFilters ? 'text-[#4B9CD3]' : 'text-[#A0A0A0] hover:text-[#4B9CD3]'
            }`}
          >
            <Filter size={18} />
          </button>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mb-4 p-3 bg-gradient-to-br from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl shadow-lg shadow-[#4B9CD3]/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-[#4B9CD3]">Active Filters:</span>
              <button 
                onClick={clearFilters}
                className="text-[#A0A0A0] hover:text-[#4B9CD3] transition duration-300"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedGameType !== 'All' && (
                <span className="bg-[#4B9CD3] text-black text-xs px-2 py-1 rounded-full font-semibold">
                  {selectedGameType}
                </span>
              )}
              {selectedSkillLevel !== 'All' && (
                <span className="bg-[#4B9CD3] text-black text-xs px-2 py-1 rounded-full font-semibold">
                  {selectedSkillLevel}
                </span>
              )}
              {selectedBuyInRange !== 'All' && (
                <span className="bg-[#4B9CD3] text-black text-xs px-2 py-1 rounded-full font-semibold">
                  {selectedBuyInRange}
                </span>
              )}
              {searchQuery && (
                <span className="bg-[#4B9CD3] text-black text-xs px-2 py-1 rounded-full font-semibold">
                  "{searchQuery}"
                </span>
              )}
            </div>
          </div>
        )}

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-6 p-4 bg-gradient-to-br from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl shadow-lg shadow-[#4B9CD3]/20">
            <h3 className="text-lg font-bold text-[#4B9CD3] mb-4">Filters</h3>
            
            {/* Game Type Filter */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-[#A0A0A0] mb-2">Game Type</label>
              <div className="grid grid-cols-2 gap-2">
                {gameTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedGameType(type)}
                    className={`px-3 py-2 rounded-xl text-sm font-semibold transition duration-300 ${
                      selectedGameType === type
                        ? 'bg-[#4B9CD3] text-black shadow-lg'
                        : 'bg-gray-700 text-[#A0A0A0] hover:text-white border border-[#4B9CD3]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Skill Level Filter */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-[#A0A0A0] mb-2">Skill Level</label>
              <div className="grid grid-cols-3 gap-2">
                {skillLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedSkillLevel(level)}
                    className={`px-3 py-2 rounded-xl text-sm font-semibold transition duration-300 ${
                      selectedSkillLevel === level
                        ? 'bg-[#4B9CD3] text-black shadow-lg'
                        : 'bg-gray-700 text-[#A0A0A0] hover:text-white border border-[#4B9CD3]'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Buy-in Range Filter */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-[#A0A0A0] mb-2">Buy-in Range</label>
              <div className="grid grid-cols-2 gap-2">
                {buyInRanges.map((range) => (
                  <button
                    key={range.label}
                    onClick={() => setSelectedBuyInRange(range.label)}
                    className={`px-3 py-2 rounded-xl text-sm font-semibold transition duration-300 ${
                      selectedBuyInRange === range.label
                        ? 'bg-[#4B9CD3] text-black shadow-lg'
                        : 'bg-gray-700 text-[#A0A0A0] hover:text-white border border-[#4B9CD3]'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters Button */}
            <button
              onClick={clearFilters}
              className="w-full bg-gradient-to-r from-gray-700 to-gray-600 border border-[#4B9CD3] text-white font-bold py-2 rounded-2xl hover:from-gray-600 hover:to-gray-500 transition duration-300"
            >
              Clear All Filters
            </button>
          </div>
        )}

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

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-[#A0A0A0]">
            Showing {filteredGames.length} of {games.length} games
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4B9CD3] mx-auto mb-4"></div>
            <p className="text-[#A0A0A0] text-lg">Loading games...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-2xl p-6 text-center">
            <p className="text-red-400 text-lg mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] text-black font-bold py-2 px-4 rounded-2xl hover:from-[#3A8BC2] hover:to-[#6AA2D5] transition duration-300"
            >
              Retry
            </button>
          </div>
        )}

        {/* Content */}
        {!isLoading && !error && (
          <>
            {viewMode === 'list' ? (
              /* List View */
              <div className="space-y-4">
                {filteredGames.length > 0 ? (
                  filteredGames.map((game) => (
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
                            <span className="text-[#A0A0A0]">{game.location.city}, {game.location.state}</span>
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
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-[#A0A0A0] text-lg">No games found matching your criteria</p>
                    <button
                      onClick={clearFilters}
                      className="mt-4 bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] text-black font-bold py-2 px-4 rounded-2xl hover:from-[#3A8BC2] hover:to-[#6AA2D5] transition duration-300"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
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
            {filteredGames.length > 0 && (
              <button className="w-full bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] p-3 rounded-2xl font-bold mt-6 text-[#A0A0A0] hover:text-[#4B9CD3] transition duration-300 shadow-lg shadow-[#4B9CD3]/20 hover:shadow-xl hover:shadow-[#4B9CD3]/30">
                Load More Games
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}