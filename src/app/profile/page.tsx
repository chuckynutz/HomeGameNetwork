'use client';
import Image from 'next/image';
import { useState } from 'react';

const tabs = [
  { name: 'Overview' },
  { name: 'Leaderboard' },
  { name: 'Achievements' },
  { name: 'Stats' },
];

type LeaderboardPlayer = {
  rank: number;
  name: string;
  winRate: string;
  winnings: string;
  badge: string;
  roi: string;
  bankRoll: string;
};

const leaderboardOptions = ['Club', 'County', 'State', 'Country'];

const leaderboardDataMap: Record<string, LeaderboardPlayer[]> = {
  Club: [
    { rank: 1, name: 'PokerKing', winRate: '71%', winnings: '$89,450', badge: 'Professional', roi: '24%', bankRoll: '$125,000' },
    { rank: 2, name: 'QueenOfCards', winRate: '68%', winnings: '$76,320', badge: 'Professional', roi: '21%', bankRoll: '$98,000' },
    { rank: 3, name: 'MathWizard', winRate: '67%', winnings: '$68,900', badge: 'Professional', roi: '19%', bankRoll: '$85,000' },
    { rank: 4, name: 'BluffQueen', winRate: '65%', winnings: '$52,700', badge: 'Professional', roi: '16%', bankRoll: '$65,000' },
    { rank: 5, name: 'PokerAce', winRate: '62%', winnings: '$15,780', badge: 'Semi-Pro', roi: '12%', bankRoll: '$25,000' },
  ],
  County: [
    { rank: 1, name: 'CountyStar', winRate: '75%', winnings: '$120,000', badge: 'Legend', roi: '28%', bankRoll: '$180,000' },
    { rank: 2, name: 'AceCounty', winRate: '70%', winnings: '$98,000', badge: 'Pro', roi: '25%', bankRoll: '$150,000' },
    { rank: 3, name: 'CountyQueen', winRate: '68%', winnings: '$80,000', badge: 'Pro', roi: '22%', bankRoll: '$120,000' },
    { rank: 4, name: 'CountyBluff', winRate: '65%', winnings: '$60,000', badge: 'Pro', roi: '18%', bankRoll: '$90,000' },
    { rank: 5, name: 'CountyRook', winRate: '60%', winnings: '$30,000', badge: 'Semi-Pro', roi: '15%', bankRoll: '$45,000' },
  ],
  State: [
    { rank: 1, name: 'StateHero', winRate: '80%', winnings: '$200,000', badge: 'Legend', roi: '32%', bankRoll: '$300,000' },
    { rank: 2, name: 'StateShark', winRate: '77%', winnings: '$180,000', badge: 'Legend', roi: '30%', bankRoll: '$280,000' },
    { rank: 3, name: 'StateQueen', winRate: '74%', winnings: '$150,000', badge: 'Pro', roi: '27%', bankRoll: '$220,000' },
    { rank: 4, name: 'StateAce', winRate: '70%', winnings: '$120,000', badge: 'Pro', roi: '24%', bankRoll: '$180,000' },
    { rank: 5, name: 'StateRook', winRate: '65%', winnings: '$80,000', badge: 'Semi-Pro', roi: '20%', bankRoll: '$120,000' },
  ],
  Country: [
    { rank: 1, name: 'WorldChamp', winRate: '85%', winnings: '$1,000,000', badge: 'World Legend', roi: '45%', bankRoll: '$2,500,000' },
    { rank: 2, name: 'CountryKing', winRate: '82%', winnings: '$800,000', badge: 'Legend', roi: '42%', bankRoll: '$2,000,000' },
    { rank: 3, name: 'CountryQueen', winRate: '80%', winnings: '$700,000', badge: 'Legend', roi: '40%', bankRoll: '$1,800,000' },
    { rank: 4, name: 'CountryAce', winRate: '78%', winnings: '$600,000', badge: 'Pro', roi: '38%', bankRoll: '$1,500,000' },
    { rank: 5, name: 'CountryRook', winRate: '75%', winnings: '$500,000', badge: 'Pro', roi: '35%', bankRoll: '$1,200,000' },
  ],
};

const achievementIcons = ['💰', '🎭', '🦈', '👑', '🎯', '♦️', '♠️', '♣️', '♥️', '🏆', '🔥', '🌟', '🎲', '🧠', '🦅', '🦾', '🧲', '🧩', '🧿', '🦸', '🦹', '🧙', '🧛', '🧟', '🧞', '🧜', '🧚', '🦄', '🐉', '🐲', '🐺', '🐻', '🐯', '🦁', '🐵', '🐸', '🐬', '🐳', '🦈', '🦅', '🦉', '🦇', '🦋', '🐞', '🐝', '🦄', '🐲', '🦖', '🦕', '🦦', '🦥', '🦨', '🦩', '🦚', '🦜', '🦢', '🦩', '🦦', '🦥', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦', '🦦'];
const rarities = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
const achievementsData = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Achievement ${i + 1}`,
  desc: `This is achievement number ${i + 1}`,
  rarity: rarities[i % rarities.length],
  icon: achievementIcons[i % achievementIcons.length],
}));

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
    lifetimeEarnings: '$32,500',
    lifetimeLosses: '$8,200',
    bestStreak: '7 wins',
    worstStreak: '4 losses',
    handsPlayed: '12,400',
    avgROI: '18%',
    tournamentsPlayed: 42,
    cashGamesPlayed: 100,
    bestSession: '+$2,000 (2024-04-12)',
    worstSession: '-$900 (2024-03-08)',
    avgFinish: '3.2 (tournaments)',
    mostPlayedLocation: 'Downtown Club',
    mostPlayedGame: 'No Limit Hold\'em',
    daysPlayed: 120,
    monthsActive: 14,
  },
};

const tierData = {
  tiers: [
    { name: 'Rookie', min: 0, max: 999, color: 'bg-gray-500' },
    { name: 'Grinder', min: 1000, max: 4999, color: 'bg-green-600' },
    { name: 'Contender', min: 5000, max: 14999, color: 'bg-blue-600' },
    { name: 'Pro', min: 15000, max: 29999, color: 'bg-purple-600' },
    { name: 'Legend', min: 30000, max: 99999, color: 'bg-yellow-400 text-black' },
    { name: 'World Class', min: 100000, max: 999999, color: 'bg-gradient-to-r from-yellow-400 to-red-500 text-black' },
  ],
  current: 15780,
};

function getCurrentTier(tierData: { tiers: { name: string; min: number; max: number; color: string; }[]; current: number; }) {
  return tierData.tiers.find((t: { name: string; min: number; max: number; color: string; }) => tierData.current >= t.min && tierData.current <= t.max) || tierData.tiers[0];
}
function getTierProgress(tierData: { tiers: { name: string; min: number; max: number; color: string; }[]; current: number; }) {
  const tier = getCurrentTier(tierData);
  return Math.min(100, Math.round(((tierData.current - tier.min) / (tier.max - tier.min)) * 100));
}

// Dummy data for calendar (replace with real data as needed)
const calendarData = [
  { date: '2024-06-01', value: 120, games: [{ type: 'Cash', location: 'Club', notes: 'Good session' }] },
  { date: '2024-06-02', value: -50, games: [{ type: 'Tournament', location: 'Online', notes: 'Bad beats' }] },
  { date: '2024-06-03', value: 0, games: [] },
  { date: '2024-06-04', value: 200, games: [{ type: 'Cash', location: 'Home', notes: 'Crushed it' }] },
  // ... more days ...
];

type Game = {
  type: string;
  location: string;
  notes: string;
};

type CalendarDay = {
  date: string;
  value: number;
  games: Game[];
};

function getMonthData(year: number, month: number) {
  // Generate mock data for the selected month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`;
    const existingData = calendarData.find(d => d.date === dateStr);
    if (existingData) return existingData;
    
    // Generate random data for missing days
    const randomValue = Math.random() > 0.6 ? Math.floor(Math.random() * 500) - 200 : 0;
    return {
      date: dateStr,
      value: randomValue,
      games: randomValue !== 0 ? [{ type: randomValue > 0 ? 'Cash' : 'Tournament', location: 'Club', notes: randomValue > 0 ? 'Good session' : 'Tough day' }] : []
    };
  });
}

function getMonthSummary(data: CalendarDay[]): number {
  return data.reduce((sum, d) => sum + d.value, 0);
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  const [leaderboardType, setLeaderboardType] = useState('Club');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  function Calendar({ data, onDayClick }: { data: CalendarDay[]; onDayClick: (day: CalendarDay) => void }) {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    // Create calendar grid
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null); // Empty cells for days before month starts
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const dayData = data.find(d => d.date === dateStr) || { date: dateStr, value: 0, games: [] };
      days.push(dayData);
    }
    return (
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl p-4 shadow-lg shadow-[#4B9CD3]/20">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            className="text-[#4B9CD3] hover:text-[#7BB3E6] transition"
          >
            ←
          </button>
          <h3 className="text-lg font-bold text-[#4B9CD3]">{monthNames[month]} {year}</h3>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            className="text-[#4B9CD3] hover:text-[#7BB3E6] transition"
          >
            →
          </button>
        </div>
        {/* Monthly Summary */}
        <div className="text-center mb-4">
          <div className="text-lg font-bold">
            Monthly Total: 
            <span className={getMonthSummary(data) >= 0 ? 'text-green-400' : 'text-red-400'}>
              {getMonthSummary(data) >= 0 ? '+' : ''}{getMonthSummary(data)}
            </span>
          </div>
        </div>
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="h-8 flex items-center justify-center text-xs font-semibold text-[#A0A0A0]">
              {day}
            </div>
          ))}
          {/* Calendar days */}
          {days.map((day, idx) => (
            <div key={idx} className="h-10 flex items-center justify-center">
              {day ? (
                <button
                  className={`w-full h-full flex items-center justify-center rounded-lg font-bold border transition text-xs ${
                    day.value > 0 
                      ? 'bg-green-700 border-green-400 text-white hover:bg-green-600' 
                      : day.value < 0 
                        ? 'bg-red-700 border-red-400 text-white hover:bg-red-600' 
                        : 'bg-gray-800 border-gray-600 text-gray-400 hover:bg-gray-700'
                  }`}
                  onClick={() => onDayClick(day)}
                >
                  <div className="text-center">
                    <div className="text-xs">{idx - firstDayOfMonth + 1}</div>
                    {day.value !== 0 && (
                      <div className={`text-xs font-bold ${day.value > 0 ? 'text-green-300' : 'text-red-300'}`}>
                        {day.value > 0 ? '+' : ''}{day.value}
                      </div>
                    )}
                  </div>
                </button>
              ) : (
                <div className="w-full h-full"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  function DayModal({ day, onClose }: { day: CalendarDay | null; onClose: () => void }) {
    if (!day) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-gray-900 rounded-2xl p-6 w-80 relative">
          <button className="absolute top-2 right-2 text-gray-400 hover:text-white" onClick={onClose}>✕</button>
          <h4 className="text-lg font-bold mb-2 text-[#4B9CD3]">{day.date}</h4>
          <div className={`mb-2 font-bold ${day.value > 0 ? 'text-green-400' : day.value < 0 ? 'text-red-400' : 'text-gray-400'}`}>{day.value >= 0 ? '+' : ''}{day.value}</div>
          {day.games.length > 0 ? (
            <ul className="space-y-2">
              {day.games.map((g, i) => (
                <li key={i} className="bg-gray-800 rounded-lg p-2">
                  <div><span className="font-semibold">Type:</span> {g.type}</div>
                  <div><span className="font-semibold">Location:</span> {g.location}</div>
                  <div><span className="font-semibold">Notes:</span> {g.notes}</div>
                </li>
              ))}
            </ul>
          ) : <div className="text-gray-400">No games played.</div>}
        </div>
      </div>
    );
  }

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
            {/* Profile Bio */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-[#4B9CD3]">About</h3>
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl p-4 shadow-lg shadow-[#4B9CD3]/20">
                <p className="text-[#A0A0A0] leading-relaxed">
                  "Passionate poker player from Austin, TX. Started playing in 2020 and fell in love with the game. 
                  I specialize in No Limit Hold'em and love competing in both cash games and tournaments. 
                  Always looking to improve and connect with fellow players!"
                </p>
              </div>
            </div>

            {/* Main Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl p-4 text-center shadow-lg shadow-[#4B9CD3]/20">
                <span className="text-2xl font-bold text-[#4B9CD3]">62%</span>
                <span className="text-[#A0A0A0] text-xs block">Win Rate</span>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl p-4 text-center shadow-lg shadow-[#4B9CD3]/20">
                <span className="text-2xl font-bold text-[#4B9CD3]">$15,780</span>
                <span className="text-[#A0A0A0] text-xs block">Total Winnings</span>
              </div>
            </div>

            {/* Skill Level & Tier */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl p-4 shadow-lg shadow-[#4B9CD3]/20">
                <h4 className="font-semibold text-[#4B9CD3] mb-2">Skill Level</h4>
                <span className="bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] text-black text-sm px-3 py-1 rounded-full font-semibold">Semi-Pro</span>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl p-4 shadow-lg shadow-[#4B9CD3]/20">
                <h4 className="font-semibold text-[#4B9CD3] mb-2">Current Tier</h4>
                <span className={`text-sm px-3 py-1 rounded-full font-semibold ${getCurrentTier(tierData).color}`}>{getCurrentTier(tierData).name}</span>
              </div>
            </div>

            {/* Clubs */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-[#4B9CD3]">Clubs</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl px-4 py-3 shadow-lg shadow-[#4B9CD3]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">DC</span>
                    </div>
                    <div>
                      <span className="font-semibold">Downtown Club</span>
                      <div className="text-xs text-[#A0A0A0]">Member since 2022</div>
                    </div>
                  </div>
                  <span className="text-xs text-[#A0A0A0]">Active</span>
                </div>
                <div className="flex items-center justify-between bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl px-4 py-3 shadow-lg shadow-[#4B9CD3]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">PC</span>
                    </div>
                    <div>
                      <span className="font-semibold">Poker Circle</span>
                      <div className="text-xs text-[#A0A0A0]">Member since 2023</div>
                    </div>
                  </div>
                  <span className="text-xs text-[#A0A0A0]">Active</span>
                </div>
              </div>
            </div>

            {/* Account Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-[#4B9CD3]">Account</h3>
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
            {/* Leaderboard Type Selector */}
            <div className="flex gap-2 justify-center mb-4">
              {leaderboardOptions.map(option => (
                <button
                  key={option}
                  className={`px-3 py-1 rounded-full font-semibold border transition text-sm ${leaderboardType === option ? 'bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] text-black border-[#4B9CD3]' : 'bg-gray-800 text-[#A0A0A0] border-gray-700 hover:text-[#4B9CD3]'}`}
                  onClick={() => setLeaderboardType(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <h3 className="text-xl font-bold text-[#4B9CD3] mb-4">Your Ranking <span className="text-white">#23</span></h3>
            
            {/* Top 3 with Olympic Medals */}
            <div className="flex gap-4 justify-center mb-6">
              {leaderboardDataMap[leaderboardType].slice(0, 3).map((player: LeaderboardPlayer, idx: number) => (
                <div key={player.rank} className={`flex flex-col items-center p-4 rounded-2xl relative ${idx === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg shadow-yellow-400/30' : idx === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-black shadow-lg shadow-gray-300/30' : idx === 2 ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg shadow-amber-600/30' : 'bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] text-white shadow-lg shadow-[#4B9CD3]/20'}`} style={{ minWidth: 100 }}>
                  {/* Medal Icon */}
                  <div className="absolute -top-2 -right-2 text-2xl">
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                  </div>
                  <span className="text-2xl font-bold">{player.rank}</span>
                  <span className="font-semibold text-center">{player.name}</span>
                  <span className="text-xs">{player.winnings}</span>
                  <span className="text-xs font-bold">{player.roi} ROI</span>
                </div>
              ))}
            </div>
            
            {/* Full Leaderboard Table */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl p-4 shadow-lg shadow-[#4B9CD3]/20">
              <h4 className="text-lg font-semibold mb-4 text-[#4B9CD3]">All Players</h4>
              <div className="space-y-2">
                {leaderboardDataMap[leaderboardType].map((player: LeaderboardPlayer) => (
                  <div key={player.rank} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-700 transition duration-300">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-[#4B9CD3]">{player.rank}</span>
                      <span className="font-semibold">{player.name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${player.badge === 'Professional' ? 'bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] text-black' : 'bg-purple-500 text-white'}`}>{player.badge}</span>
                    </div>
                    <div className="flex gap-4 items-center text-sm">
                      <span className="text-[#A0A0A0]">{player.winRate}</span>
                      <span className="text-[#A0A0A0]">{player.roi}</span>
                      <span className="text-[#A0A0A0]">{player.bankRoll}</span>
                      <span className="text-[#A0A0A0]">{player.winnings}</span>
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
              <span className="text-sm text-[#A0A0A0]">15 of 100 unlocked</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 mb-6">
              <div className="bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] h-3 rounded-full" style={{ width: '15%' }}></div>
            </div>
            {/* Horizontal scrollable achievements */}
            <div className="overflow-x-auto whitespace-nowrap pb-2 mb-4">
              <div className="flex gap-4" style={{ minWidth: '1200px' }}>
                {achievementsData.map((achievement) => (
                  <div key={achievement.id} className="inline-block bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl p-4 text-center shadow-lg shadow-[#4B9CD3]/20 hover:shadow-xl hover:shadow-[#4B9CD3]/30 transition duration-300 min-w-[160px] max-w-[160px]">
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <h4 className="font-semibold text-[#4B9CD3] mb-1">{achievement.name}</h4>
                    <p className="text-xs text-[#A0A0A0] mb-2">{achievement.desc}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${achievement.rarity === 'Legendary' ? 'bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] text-black' : achievement.rarity === 'Epic' ? 'bg-purple-700 text-white' : achievement.rarity === 'Rare' ? 'bg-blue-700 text-white' : achievement.rarity === 'Uncommon' ? 'bg-green-700 text-white' : 'bg-gray-600 text-white'}`}>{achievement.rarity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {activeTab === 'Stats' && (
          <div className="py-4">
            <h3 className="text-xl font-bold text-[#4B9CD3] mb-4">Performance Metrics</h3>
            
            {/* Calendar */}
            <div className="mb-6">
              <Calendar data={getMonthData(currentMonth.getFullYear(), currentMonth.getMonth())} onDayClick={setSelectedDay} />
            </div>
            {/* Day Modal */}
            <DayModal day={selectedDay} onClose={() => setSelectedDay(null)} />
            
            {/* Tier Ranking System */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-2">
                <span className={`px-4 py-2 rounded-full font-bold text-lg ${getCurrentTier(tierData).color}`}>{getCurrentTier(tierData).name}</span>
                <span className="text-[#A0A0A0]">Tier Progress</span>
                <span className="font-bold text-[#4B9CD3]">{tierData.current} pts</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div className="bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] h-3 rounded-full" style={{ width: `${getTierProgress(tierData)}%` }}></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl p-4 shadow-lg shadow-[#4B9CD3]/20">
                <h4 className="font-semibold text-[#4B9CD3] mb-2">Lifetime Stats</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span className="text-[#A0A0A0]">Lifetime Earnings:</span><span className="font-semibold">{statsData.metrics.lifetimeEarnings}</span></div>
                  <div className="flex justify-between"><span className="text-[#A0A0A0]">Lifetime Losses:</span><span className="font-semibold">{statsData.metrics.lifetimeLosses}</span></div>
                  <div className="flex justify-between"><span className="text-[#A0A0A0]">Days Played:</span><span className="font-semibold">{statsData.metrics.daysPlayed}</span></div>
                  <div className="flex justify-between"><span className="text-[#A0A0A0]">Months Active:</span><span className="font-semibold">{statsData.metrics.monthsActive}</span></div>
                  <div className="flex justify-between"><span className="text-[#A0A0A0]">Hands Played:</span><span className="font-semibold">{statsData.metrics.handsPlayed}</span></div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl p-4 shadow-lg shadow-[#4B9CD3]/20">
                <h4 className="font-semibold text-[#4B9CD3] mb-2">Session Stats</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span className="text-[#A0A0A0]">Avg Session:</span><span className="font-semibold">{statsData.metrics.avgSession}</span></div>
                  <div className="flex justify-between"><span className="text-[#A0A0A0]">Avg Buy-in:</span><span className="font-semibold">{statsData.metrics.avgBuyIn}</span></div>
                  <div className="flex justify-between"><span className="text-[#A0A0A0]">Avg Profit:</span><span className="font-semibold">{statsData.metrics.avgProfit}</span></div>
                  <div className="flex justify-between"><span className="text-[#A0A0A0]">Avg ROI:</span><span className="font-semibold">{statsData.metrics.avgROI}</span></div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl p-4 shadow-lg shadow-[#4B9CD3]/20">
                <h4 className="font-semibold text-[#4B9CD3] mb-2">Game Breakdown</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span className="text-[#A0A0A0]">Tournaments Played:</span><span className="font-semibold">{statsData.metrics.tournamentsPlayed}</span></div>
                  <div className="flex justify-between"><span className="text-[#A0A0A0]">Cash Games Played:</span><span className="font-semibold">{statsData.metrics.cashGamesPlayed}</span></div>
                  <div className="flex justify-between"><span className="text-[#A0A0A0]">Most Played Game:</span><span className="font-semibold">{statsData.metrics.mostPlayedGame}</span></div>
                  <div className="flex justify-between"><span className="text-[#A0A0A0]">Most Played Location:</span><span className="font-semibold">{statsData.metrics.mostPlayedLocation}</span></div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 border border-[#4B9CD3] rounded-2xl p-4 shadow-lg shadow-[#4B9CD3]/20">
                <h4 className="font-semibold text-[#4B9CD3] mb-2">Streaks & Best/Worst</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span className="text-[#A0A0A0]">Best Streak:</span><span className="font-semibold text-green-400">{statsData.metrics.bestStreak}</span></div>
                  <div className="flex justify-between"><span className="text-[#A0A0A0]">Worst Streak:</span><span className="font-semibold text-red-400">{statsData.metrics.worstStreak}</span></div>
                  <div className="flex justify-between"><span className="text-[#A0A0A0]">Best Session:</span><span className="font-semibold text-green-400">{statsData.metrics.bestSession}</span></div>
                  <div className="flex justify-between"><span className="text-[#A0A0A0]">Worst Session:</span><span className="font-semibold text-red-400">{statsData.metrics.worstSession}</span></div>
                  <div className="flex justify-between"><span className="text-[#A0A0A0]">Avg Finish (Tourn.):</span><span className="font-semibold">{statsData.metrics.avgFinish}</span></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 