'use client';

import { useState } from 'react';
import { Grid, Bookmark, Heart, Settings, Edit } from 'lucide-react';

interface UserProfileProps {
  username: string;
  avatar: string;
  bio: string;
  posts: number;
  followers: number;
  following: number;
  isOwnProfile?: boolean;
}

export default function UserProfile({ 
  username, 
  avatar, 
  bio, 
  posts, 
  followers, 
  following, 
  isOwnProfile = false 
}: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'liked'>('posts');

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-2xl p-6 shadow-lg shadow-[#4B9CD3]/20">
      {/* Profile Header */}
      <div className="flex items-start space-x-6 mb-6">
        <img 
          src={avatar} 
          alt={username}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-4">
            <h2 className="text-xl font-semibold text-white">{username}</h2>
            {isOwnProfile ? (
              <button className="bg-gradient-to-br from-gray-800 to-gray-700 border border-[#4B9CD3] text-white px-4 py-1 rounded-xl text-sm hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-600 transition duration-300 shadow-lg shadow-[#4B9CD3]/20">
                Edit Profile
              </button>
            ) : (
              <button className="bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] text-black px-4 py-1 rounded-xl text-sm font-semibold hover:from-[#3A8BC2] hover:to-[#6AA2D5] transition duration-300 shadow-lg shadow-[#4B9CD3]/30">
                Follow
              </button>
            )}
            <button className="p-1 text-[#A0A0A0] hover:text-white transition-colors">
              {isOwnProfile ? <Settings size={20} /> : <Edit size={20} />}
            </button>
          </div>
          
          {/* Stats */}
          <div className="flex space-x-6 mb-4">
            <div className="text-center">
              <div className="font-semibold text-white">{posts}</div>
              <div className="text-sm text-[#A0A0A0]">posts</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-white">{followers.toLocaleString()}</div>
              <div className="text-sm text-[#A0A0A0]">followers</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-white">{following.toLocaleString()}</div>
              <div className="text-sm text-[#A0A0A0]">following</div>
            </div>
          </div>
          
          {/* Bio */}
          <div className="text-white">
            <div className="font-semibold mb-1">{username}</div>
            <div className="text-sm text-[#A0A0A0]">{bio}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-[#4B9CD3]/30">
        <div className="flex">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium transition-colors ${
              activeTab === 'posts' 
                ? 'text-[#4B9CD3] border-t-2 border-[#4B9CD3]' 
                : 'text-[#A0A0A0] hover:text-white'
            }`}
          >
            <Grid size={16} />
            <span>POSTS</span>
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium transition-colors ${
              activeTab === 'saved' 
                ? 'text-[#4B9CD3] border-t-2 border-[#4B9CD3]' 
                : 'text-[#A0A0A0] hover:text-white'
            }`}
          >
            <Bookmark size={16} />
            <span>SAVED</span>
          </button>
          {isOwnProfile && (
            <button
              onClick={() => setActiveTab('liked')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium transition-colors ${
                activeTab === 'liked' 
                  ? 'text-[#4B9CD3] border-t-2 border-[#4B9CD3]' 
                  : 'text-[#A0A0A0] hover:text-white'
              }`}
            >
              <Heart size={16} />
              <span>LIKED</span>
            </button>
          )}
        </div>
      </div>

      {/* Content Grid */}
      <div className="mt-6">
        {activeTab === 'posts' && (
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gradient-to-br from-gray-800 to-gray-700 border border-[#4B9CD3]/30 rounded flex items-center justify-center shadow-lg shadow-[#4B9CD3]/10">
                <div className="text-[#A0A0A0] text-sm">Post {i + 1}</div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'saved' && (
          <div className="text-center py-8 text-[#A0A0A0]">
            <Bookmark size={48} className="mx-auto mb-4 opacity-50" />
            <p>No saved posts yet</p>
            <p className="text-sm">Save photos and videos that you want to see again.</p>
          </div>
        )}
        {activeTab === 'liked' && (
          <div className="text-center py-8 text-[#A0A0A0]">
            <Heart size={48} className="mx-auto mb-4 opacity-50" />
            <p>No liked posts yet</p>
            <p className="text-sm">Posts you like will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
} 