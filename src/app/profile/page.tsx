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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-4">
      <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-3xl shadow-2xl shadow-[#4B9CD3]/20 p-8 mt-8">
        {/* Header */}
        <div className="flex items-center gap-6 mb-6">
          <Image
            src="/file.svg"
            alt="User Avatar"
            width={80}
            height={80}
            className="rounded-full border-4 border-[#4B9CD3] shadow-lg shadow-[#4B9CD3]/30"
          />
          <div>
            <h2 className="text-2xl font-bold text-[#4B9CD3]">Alex Johnson</h2>
            <div className="text-[#7BB3E6] font-semibold">@PokerAce</div>
            <div className="text-[#A0A0A0] text-sm">Austin, TX</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-[#4B9CD3]">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`px-4 py-2 font-semibold focus:outline-none transition border-b-2 ${activeTab === tab.name ? 'border-[#4B9CD3] text-[#4B9CD3]' : 'border-transparent text-[#A0A0A0] hover:text-[#4B9CD3]'}`}
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
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl p-4 text-center shadow-lg shadow-[#4B9CD3]/20">
                <span className="text-2xl font-bold text-[#4B9CD3]">62%</span>
                <span className="text-[#A0A0A0] text-xs block">Win Rate</span>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl p-4 text-center shadow-lg shadow-[#4B9CD3]/20">
                <span className="text-2xl font-bold text-[#4B9CD3]">$15,780</span>
                <span className="text-[#A0A0A0] text-xs block">Winnings</span>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl p-4 text-center shadow-lg shadow-[#4B9CD3]/20">
                <span className="text-2xl font-bold text-[#4B9CD3]">#23</span>
                <span className="text-[#A0A0A0] text-xs block">Ranking</span>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-[#4B9CD3]">Stats</h3>
              <div className="flex gap-6 mb-2">
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] rounded-full p-2 mb-1 shadow-lg">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M4 17V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span className="font-bold text-[#4B9CD3]">62%</span>
                  <span className="text-xs text-[#A0A0A0]">Win Rate</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] rounded-full p-2 mb-1 shadow-lg">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 17l-5-5h10l-5 5z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span className="font-bold text-[#4B9CD3]">#23</span>
                  <span className="text-xs text-[#A0A0A0]">Ranking</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] rounded-full p-2 mb-1 shadow-lg">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 21V3" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span className="font-bold text-[#4B9CD3]">$15,780</span>
                  <span className="text-xs text-[#A0A0A0]">Winnings</span>
                </div>
              </div>
              <div className="flex justify-between text-sm text-[#A0A0A0]">
                <span>Games Played <span className="font-bold text-white">142</span></span>
                <span className="flex items-center gap-2">Skill Level <span className="bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] text-black text-xs px-2 py-1 rounded-full font-semibold">Semi-Pro</span></span>
              </div>
            </div>

            {/* Account Section */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#4B9CD3]">Account</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl px-4 py-3 shadow-lg shadow-[#4B9CD3]/20">
                  <div className="flex items-center gap-3">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" stroke="#4B9CD3" strokeWidth="2"/><path d="M16 3v4M8 3v4" stroke="#4B9CD3" strokeWidth="2"/></svg>
                    <span>Subscription</span>
                  </div>
                  <span className="text-xs text-[#A0A0A0]">Premium Member</span>
                </div>
                <div className="flex items-center justify-between bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl px-4 py-3 shadow-lg shadow-[#4B9CD3]/20">
                  <div className="flex items-center gap-3">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8z" stroke="#4B9CD3" strokeWidth="2"/><path d="M7 10h.01M12 10h.01M17 10h.01" stroke="#4B9CD3" strokeWidth="2"/></svg>
                    <span>Messages</span>
                  </div>
                  <span className="bg-red-500 text-xs text-white px-2 py-1 rounded-full font-bold">3</span>
                </div>
                <div className="flex items-center justify-between bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl px-4 py-3 shadow-lg shadow-[#4B9CD3]/20">
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
                <div key={player.rank} className={`flex flex-col items-center p-3 rounded-2xl ${idx === 0 ? 'bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] text-black shadow-lg shadow-[#4B9CD3]/30' : 'bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] text-white shadow-lg shadow-[#4B9CD3]/20'}`} style={{ minWidth: 80 }}>
                  <span className="text-2xl font-bold">{player.rank}</span>
                  <span className="font-semibold">{player.name}</span>
                  <span className="text-xs">{player.winnings}</span>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl p-4 shadow-lg shadow-[#4B9CD3]/20">
              <h4 className="text-lg font-semibold mb-2 text-[#4B9CD3]">All Players</h4>
              <div className="space-y-2">
                {leaderboardData.map((player) => (
                  <div key={player.rank} className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-700 transition duration-300">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-[#4B9CD3]">{player.rank}</span>
                      <span className="font-semibold">{player.name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${player.badge === 'Professional' ? 'bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] text-black' : 'bg-purple-500 text-white'}`}>{player.badge}</span>
                    </div>
                    <div className="flex gap-4 items-center">
                      <span className="text-sm text-[#A0A0A0]">{player.winRate}</span>
                      <span className="text-sm text-[#A0A0A0]">{player.winnings}</span>
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
              <span className="text-sm text-[#A0A0A0]">15 of 112 unlocked</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 mb-6">
              <div className="bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] h-3 rounded-full" style={{ width: '13.4%' }}></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {achievementsData.map((achievement) => (
                <div key={achievement.id} className="bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl p-4 text-center shadow-lg shadow-[#4B9CD3]/20 hover:shadow-xl hover:shadow-[#4B9CD3]/30 transition duration-300">
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <h4 className="font-semibold text-[#4B9CD3] mb-1">{achievement.name}</h4>
                  <p className="text-xs text-[#A0A0A0] mb-2">{achievement.desc}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${achievement.rarity === 'Legendary' ? 'bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] text-black' : 'bg-purple-500 text-white'}`}>
                    {achievement.rarity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'Stats' && (
          <div className="py-4">
            <h3 className="text-xl font-bold text-[#4B9CD3] mb-4">Performance Metrics</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl p-4 shadow-lg shadow-[#4B9CD3]/20">
                <h4 className="font-semibold text-[#4B9CD3] mb-2">Session Stats</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#A0A0A0]">Avg Session:</span>
                    <span className="font-semibold">{statsData.metrics.avgSession}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A0A0A0]">Avg Buy-in:</span>
                    <span className="font-semibold">{statsData.metrics.avgBuyIn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A0A0A0]">Avg Profit:</span>
                    <span className="font-semibold">{statsData.metrics.avgProfit}</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl p-4 shadow-lg shadow-[#4B9CD3]/20">
                <h4 className="font-semibold text-[#4B9CD3] mb-2">Win/Loss</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#A0A0A0]">Biggest Win:</span>
                    <span className="font-semibold text-green-400">{statsData.metrics.biggestWin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A0A0A0]">Biggest Loss:</span>
                    <span className="font-semibold text-red-400">{statsData.metrics.biggestLoss}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A0A0A0]">Winning:</span>
                    <span className="font-semibold text-green-400">{statsData.metrics.winningSessions}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 