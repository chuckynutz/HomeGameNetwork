'use client';

import { useState } from 'react';
import { Send, Search, MoreVertical, Camera, Image, Smile } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

interface Conversation {
  id: string;
  username: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

interface DirectMessagesProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DirectMessages({ isOpen, onClose }: DirectMessagesProps) {
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const conversations: Conversation[] = [
    {
      id: '1',
      username: 'poker_pro',
      avatar: '/logo.png',
      lastMessage: 'Great game last night!',
      timestamp: '2m ago',
      unreadCount: 2,
      isOnline: true
    },
    {
      id: '2',
      username: 'casino_queen',
      avatar: '/logo.png',
      lastMessage: 'See you at the tables',
      timestamp: '1h ago',
      unreadCount: 0,
      isOnline: false
    },
    {
      id: '3',
      username: 'ace_player',
      avatar: '/logo.png',
      lastMessage: 'Thanks for the tips!',
      timestamp: '3h ago',
      unreadCount: 1,
      isOnline: true
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      sender: 'poker_pro',
      text: 'Hey! How was your game last night?',
      timestamp: '10:30 AM',
      isOwn: false
    },
    {
      id: '2',
      sender: 'you',
      text: 'It was amazing! Won a big pot!',
      timestamp: '10:32 AM',
      isOwn: true
    },
    {
      id: '3',
      sender: 'poker_pro',
      text: 'That\'s awesome! What was the hand?',
      timestamp: '10:33 AM',
      isOwn: false
    },
    {
      id: '4',
      sender: 'you',
      text: 'Pocket aces vs kings!',
      timestamp: '10:35 AM',
      isOwn: true
    },
    {
      id: '5',
      sender: 'poker_pro',
      text: 'Great game last night!',
      timestamp: '2m ago',
      isOwn: false
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() && activeConversation) {
      // In a real app, this would send the message to the backend
      setNewMessage('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-2xl max-w-4xl w-full max-h-[90vh] flex shadow-2xl shadow-[#4B9CD3]/20">
        {/* Conversations List */}
        <div className="w-80 border-r border-[#4B9CD3]/30 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-[#4B9CD3]/30">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Messages</h2>
              <button className="text-[#A0A0A0] hover:text-white transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0A0A0]" />
              <input
                type="text"
                placeholder="Search messages"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gradient-to-br from-gray-800 to-gray-700 border border-[#4B9CD3] text-white placeholder-[#A0A0A0] pl-10 pr-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4B9CD3] shadow-lg shadow-[#4B9CD3]/20"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setActiveConversation(conversation.id)}
                className={`p-4 cursor-pointer transition-colors ${
                  activeConversation === conversation.id 
                    ? 'bg-gradient-to-br from-[#4B9CD3]/20 to-[#7BB3E6]/20' 
                    : 'hover:bg-gradient-to-br hover:from-gray-800 hover:to-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img 
                      src={conversation.avatar} 
                      alt={conversation.username}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white text-sm truncate">
                        {conversation.username}
                      </span>
                      <span className="text-xs text-[#A0A0A0]">{conversation.timestamp}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#A0A0A0] truncate">
                        {conversation.lastMessage}
                      </span>
                      {conversation.unreadCount > 0 && (
                        <div className="bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                          {conversation.unreadCount}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-[#4B9CD3]/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={conversations.find(c => c.id === activeConversation)?.avatar} 
                      alt="User"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-white">
                        {conversations.find(c => c.id === activeConversation)?.username}
                      </div>
                      <div className="text-xs text-[#A0A0A0]">Active now</div>
                    </div>
                  </div>
                  <button className="text-[#A0A0A0] hover:text-white transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-xl ${
                        message.isOwn
                          ? 'bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] text-black'
                          : 'bg-gradient-to-br from-gray-800 to-gray-700 border border-[#4B9CD3]/30 text-white'
                      }`}
                    >
                      <div className="text-sm">{message.text}</div>
                      <div className={`text-xs mt-1 ${
                        message.isOwn ? 'text-gray-800' : 'text-[#A0A0A0]'
                      }`}>
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-[#4B9CD3]/30">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-[#A0A0A0] hover:text-white transition-colors">
                    <Camera size={20} />
                  </button>
                  <button className="p-2 text-[#A0A0A0] hover:text-white transition-colors">
                    <Image size={20} />
                  </button>
                  <button className="p-2 text-[#A0A0A0] hover:text-white transition-colors">
                    <Smile size={20} />
                  </button>
                  <input
                    type="text"
                    placeholder="Message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 bg-gradient-to-br from-gray-800 to-gray-700 border border-[#4B9CD3] text-white placeholder-[#A0A0A0] px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4B9CD3] shadow-lg shadow-[#4B9CD3]/20"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className={`p-2 rounded-xl transition-colors ${
                      newMessage.trim() 
                        ? 'bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] text-black hover:from-[#3A8BC2] hover:to-[#6AA2D5]' 
                        : 'bg-gradient-to-br from-gray-800 to-gray-700 text-[#A0A0A0]'
                    }`}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-[#A0A0A0]">
              <div className="text-center">
                <div className="text-2xl mb-2">💬</div>
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#A0A0A0] hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
} 