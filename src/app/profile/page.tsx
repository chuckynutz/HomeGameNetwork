import Image from 'next/image';

export default function ProfilePage() {
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
    </div>
  );
} 