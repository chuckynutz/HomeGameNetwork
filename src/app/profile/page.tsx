'use client';
import Image from 'next/image';
import { useState } from 'react';

const tabs = [
  { name: 'Overview' },
  { name: 'Leaderboard' },
  { name: 'Achievements' },
  { name: 'Stats' },
];

const leaderboardData = [
  { rank: 1, name: 'PokerKing', winRate: '71%', winnings: '$89,450', badge: 'Professional' },
  { rank: 2, name: 'QueenOfCards', winRate: '68%', winnings: '$76,320', badge: 'Professional' },
  { rank: 3, name: 'MathWizard', winRate: '67%', winnings: '$68,900', badge: 'Professional' },
  { rank: 4, name: 'BluffQueen', winRate: '65%', winnings: '$52,700', badge: 'Professional' },
  { rank: 5, name: 'PokerAce', winRate: '62%', winnings: '$15,780', badge: 'Semi-Pro' },
];

const achievementsData = [
  { id: 31, name: 'Achievement 31', desc: 'This is achievement number 31', rarity: 'Legendary', icon: '💰' },
  { id: 32, name: 'Achievement 32', desc: 'This is achievement number 32', rarity: 'Legendary', icon: '🎭' },
  { id: 33, name: 'Achievement 33', desc: 'This is achievement number 33', rarity: 'Uncommon', icon: '🦈' },
  { id: 34, name: 'Achievement 34', desc: 'This is achievement number 34', rarity: 'Legendary', icon: '👑' },
  { id: 35, name: 'Achievement 35', desc: 'This is achievement number 35', rarity: 'Uncommon', icon: '🎯' },
  { id: 36, name: 'Achievement 36', desc: 'This is achievement number 36', rarity: 'Uncommon', icon: '♦️' },
];

const statsData = {
  winRate: [0.62, 1, 0.52, 1, 0.62, 1.1],
  earnings: [5200, 8000, 10490, 12000, 14000, 15780],
  gamesPlayed: [12, 18, 24, 28, 32, 35],
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  metrics: {
    avgSession: '4.2 hours',
    avgBuyIn: '$250',
    avgProfit: '$112',
    biggestWin: '$1,250',
    biggestLoss: '$780',
    winningSessions: '88 (62%)',
    losingSessions: '54 (38%)',
  },
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="max-w-2xl mx-auto bg-[#101828] rounded-xl shadow-lg p-8 mt-8 text-white">
      {/* Header */}
      <div className="flex items-center gap-6 mb-6">
        <Image
          src="/file.svg"
          alt="User Avatar"
          width={80}
          height={80}
          className="rounded-full border-4 border-[#4B9CD3]"
        />
        <div>
          <h2 className="text-2xl font-bold">Alex Johnson</h2>
          <div className="text-[#4B9CD3] font-semibold">@PokerAce</div>
          <div className="text-gray-300 text-sm">Austin, TX</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`px-4 py-2 font-semibold focus:outline-none transition border-b-2 ${activeTab === tab.name ? 'border-[#4B9CD3] text-[#4B9CD3]' : 'border-transparent text-gray-400 hover:text-[#4B9CD3]'}`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'Overview' && (
        <>
          {/* Main Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">62%</span>
              <span className="text-gray-400 text-xs">Win Rate</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">$15,780</span>
              <span className="text-gray-400 text-xs">Winnings</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">#23</span>
              <span className="text-gray-400 text-xs">Ranking</span>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Stats</h3>
            <div className="flex gap-6 mb-2">
              <div className="flex flex-col items-center">
                <div className="bg-[#4B9CD3] rounded-full p-2 mb-1">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M4 17V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span className="font-bold">62%</span>
                <span className="text-xs text-gray-400">Win Rate</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-[#4B9CD3] rounded-full p-2 mb-1">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 17l-5-5h10l-5 5z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span className="font-bold">#23</span>
                <span className="text-xs text-gray-400">Ranking</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-[#4B9CD3] rounded-full p-2 mb-1">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 21V3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span className="font-bold">$15,780</span>
                <span className="text-xs text-gray-400">Winnings</span>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-300">
              <span>Games Played <span className="font-bold text-white">142</span></span>
              <span className="flex items-center gap-2">Skill Level <span className="bg-[#4B9CD3] text-xs px-2 py-1 rounded-full font-semibold">Semi-Pro</span></span>
            </div>
          </div>

          {/* Account Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Account</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-[#17223b] rounded-lg px-4 py-3">
                <div className="flex items-center gap-3">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" stroke="#4B9CD3" strokeWidth="2"/><path d="M16 3v4M8 3v4" stroke="#4B9CD3" strokeWidth="2"/></svg>
                  <span>Subscription</span>
                </div>
                <span className="text-xs text-gray-400">Premium Member</span>
              </div>
              <div className="flex items-center justify-between bg-[#17223b] rounded-lg px-4 py-3">
                <div className="flex items-center gap-3">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8z" stroke="#4B9CD3" strokeWidth="2"/><path d="M7 10h.01M12 10h.01M17 10h.01" stroke="#4B9CD3" strokeWidth="2"/></svg>
                  <span>Messages</span>
                </div>
                <span className="bg-red-500 text-xs text-white px-2 py-1 rounded-full font-bold">3</span>
              </div>
              <div className="flex items-center justify-between bg-[#17223b] rounded-lg px-4 py-3">
                <div className="flex items-center gap-3">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M18 8a6 6 0 1 1-12 0" stroke="#4B9CD3" strokeWidth="2"/><circle cx="12" cy="8" r="6" stroke="#4B9CD3" strokeWidth="2"/><path d="M12 14v4" stroke="#4B9CD3" strokeWidth="2"/><path d="M9 18h6" stroke="#4B9CD3" strokeWidth="2"/></svg>
                  <span>Notifications</span>
                </div>
                <span className="bg-red-500 text-xs text-white px-2 py-1 rounded-full font-bold">5</span>
              </div>
            </div>
          </div>
        </>
      )}
      {activeTab === 'Leaderboard' && (
        <div className="py-4">
          <h3 className="text-xl font-bold text-[#4B9CD3] mb-4">Your Ranking <span className="text-white">#23</span></h3>
          <div className="flex gap-4 justify-center mb-6">
            {leaderboardData.slice(0, 3).map((player, idx) => (
              <div key={player.rank} className={`flex flex-col items-center p-3 rounded-lg ${idx === 0 ? 'bg-[#4B9CD3] text-black' : 'bg-[#17223b] text-white'}`} style={{ minWidth: 80 }}>
                <span className="text-2xl font-bold">{player.rank}</span>
                <span className="font-semibold">{player.name}</span>
                <span className="text-xs">{player.winnings}</span>
              </div>
            ))}
          </div>
          <div className="bg-[#17223b] rounded-lg p-4">
            <h4 className="text-lg font-semibold mb-2 text-[#4B9CD3]">All Players</h4>
            <div className="space-y-2">
              {leaderboardData.map((player) => (
                <div key={player.rank} className="flex items-center justify-between p-2 rounded-md hover:bg-[#101828] transition">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold">{player.rank}</span>
                    <span className="font-semibold">{player.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${player.badge === 'Professional' ? 'bg-[#4B9CD3] text-black' : 'bg-purple-500 text-white'}`}>{player.badge}</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <span className="text-sm">{player.winRate}</span>
                    <span className="text-sm">{player.winnings}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {activeTab === 'Achievements' && (
        <div className="py-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-[#4B9CD3]">Achievement Progress</h3>
            <span className="text-sm text-gray-300">15 of 112 unlocked</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 mb-6">
            <div className="bg-[#4B9CD3] h-3 rounded-full" style={{ width: '13.4%' }}></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {achievementsData.map((ach) => (
              <div key={ach.id} className="bg-[#17223b] rounded-lg p-4 flex flex-col items-center">
                <span className="text-3xl mb-2">{ach.icon}</span>
                <span className="font-bold text-white mb-1">{ach.name}</span>
                <span className="text-xs text-gray-300 mb-1">{ach.desc}</span>
                <span className={`text-xs px-2 py-1 rounded-full mt-1 ${ach.rarity === 'Legendary' ? 'bg-yellow-400 text-black' : ach.rarity === 'Uncommon' ? 'bg-green-400 text-black' : 'bg-gray-500 text-white'}`}>{ach.rarity}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeTab === 'Stats' && (
        <div className="py-4">
          <h3 className="text-xl font-bold text-[#4B9CD3] mb-4">Detailed Stats</h3>
          {/* Win Rate Over Time (mock line chart) */}
          <div className="mb-6">
            <div className="font-semibold mb-2">Win Rate Over Time <span className="text-xs text-gray-400">(Last 6 months)</span></div>
            <div className="w-full h-32 bg-[#17223b] rounded-lg flex items-end px-4 py-2 relative overflow-hidden">
              {/* Simple line chart mockup */}
              <svg width="100%" height="100%" viewBox="0 0 240 80" className="absolute left-0 top-0">
                <polyline
                  fill="none"
                  stroke="#4B9CD3"
                  strokeWidth="3"
                  points="0,60 40,30 80,70 120,20 160,60 200,10 240,50"
                />
              </svg>
            </div>
          </div>
          {/* Earnings Progression (mock line chart) */}
          <div className="mb-6">
            <div className="font-semibold mb-2">Earnings Progression <span className="text-xs text-gray-400">(Last 6 months)</span></div>
            <div className="w-full h-32 bg-[#17223b] rounded-lg flex items-end px-4 py-2 relative overflow-hidden">
              {/* Simple line chart mockup */}
              <svg width="100%" height="100%" viewBox="0 0 240 80" className="absolute left-0 top-0">
                <polyline
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="3"
                  points="0,70 40,60 80,50 120,40 160,30 200,20 240,10"
                />
              </svg>
            </div>
          </div>
          {/* Games Played (mock line chart) */}
          <div className="mb-6">
            <div className="font-semibold mb-2">Games Played <span className="text-xs text-gray-400">(Last 6 months)</span></div>
            <div className="w-full h-32 bg-[#17223b] rounded-lg flex items-end px-4 py-2 relative overflow-hidden">
              {/* Simple line chart mockup */}
              <svg width="100%" height="100%" viewBox="0 0 240 80" className="absolute left-0 top-0">
                <polyline
                  fill="none"
                  stroke="#a3e635"
                  strokeWidth="3"
                  points="0,70 40,60 80,50 120,40 160,30 200,20 240,10"
                />
              </svg>
            </div>
          </div>
          {/* Performance Metrics */}
          <div className="bg-[#17223b] rounded-lg p-4">
            <h4 className="text-lg font-semibold mb-2 text-[#4B9CD3]">Performance Metrics</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>Average Session Length <span className="font-bold text-white">4.2 hours</span></div>
              <div>Average Buy-in <span className="font-bold text-white">$250</span></div>
              <div>Average Profit per Session <span className="font-bold text-white">$112</span></div>
              <div>Biggest Win <span className="font-bold text-white">$1,250</span></div>
              <div>Biggest Loss <span className="font-bold text-white">$780</span></div>
              <div>Winning Sessions <span className="font-bold text-white">88 (62%)</span></div>
              <div>Losing Sessions <span className="font-bold text-white">54 (38%)</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 