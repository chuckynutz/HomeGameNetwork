'use client';

import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Smile, Camera, Search, Home, User, Grid, Bell } from 'lucide-react';
import { colors } from '@/constants/colors';
import StoryViewer from '@/components/StoryViewer';
import CreatePostModal from '@/components/CreatePostModal';
import CommentsModal from '@/components/CommentsModal';
import UserProfile from '@/components/UserProfile';
import DirectMessages from '@/components/DirectMessages';

interface Post {
  id: string;
  username: string;
  userAvatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  isLiked: boolean;
  isSaved: boolean;
  location?: string;
}

interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

interface Story {
  id: string;
  username: string;
  avatar: string;
  hasStory: boolean;
  isViewed: boolean;
  image?: string;
  timestamp?: string;
}

export default function SocialPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      username: 'poker_pro',
      userAvatar: '/logo.png',
      image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=500&h=500&fit=crop',
      caption: 'Just won my biggest pot yet! 🎰 #poker #winning #casino',
      likes: 1247,
      comments: [
        { id: '1', username: 'card_shark', text: 'Amazing! What was the pot size?', timestamp: '2h ago', likes: 12, isLiked: false },
        { id: '2', username: 'lucky_charm', text: 'Teach me your ways! 😍', timestamp: '1h ago', likes: 8, isLiked: true }
      ],
      timestamp: '3 hours ago',
      isLiked: false,
      isSaved: false,
      location: 'Bellagio Casino'
    },
    {
      id: '2',
      username: 'casino_queen',
      userAvatar: '/logo.png',
      image: 'https://images.unsplash.com/photo-1511886929837-354984827c0f?w=500&h=500&fit=crop',
      caption: 'Perfect night at the tables! The energy here is incredible ✨',
      likes: 892,
      comments: [
        { id: '3', username: 'high_roller', text: 'Which casino is this?', timestamp: '4h ago', likes: 5, isLiked: false }
      ],
      timestamp: '5 hours ago',
      isLiked: true,
      isSaved: false
    },
    {
      id: '3',
      username: 'ace_player',
      userAvatar: '/logo.png',
      image: 'https://images.unsplash.com/photo-1541278107931-e006523892df?w=500&h=500&fit=crop',
      caption: 'New strategy working wonders! 📈 #pokerstrategy #success',
      likes: 567,
      comments: [],
      timestamp: '1 day ago',
      isLiked: false,
      isSaved: true
    }
  ]);

  const [stories, setStories] = useState<Story[]>([
    { 
      id: '1', 
      username: 'poker_pro', 
      avatar: '/logo.png', 
      hasStory: true, 
      isViewed: false,
      image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=500&h=500&fit=crop',
      timestamp: '2 hours ago'
    },
    { 
      id: '2', 
      username: 'casino_queen', 
      avatar: '/logo.png', 
      hasStory: true, 
      isViewed: true,
      image: 'https://images.unsplash.com/photo-1511886929837-354984827c0f?w=500&h=500&fit=crop',
      timestamp: '5 hours ago'
    },
    { 
      id: '3', 
      username: 'ace_player', 
      avatar: '/logo.png', 
      hasStory: true, 
      isViewed: false,
      image: 'https://images.unsplash.com/photo-1541278107931-e006523892df?w=500&h=500&fit=crop',
      timestamp: '1 day ago'
    },
    { id: '4', username: 'card_shark', avatar: '/logo.png', hasStory: false, isViewed: false },
    { 
      id: '5', 
      username: 'lucky_charm', 
      avatar: '/logo.png', 
      hasStory: true, 
      isViewed: true,
      image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=500&h=500&fit=crop',
      timestamp: '3 hours ago'
    },
  ]);

  const [newComment, setNewComment] = useState('');
  const [activePost, setActivePost] = useState<string | null>(null);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showStoryViewer, setShowStoryViewer] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [activeTab, setActiveTab] = useState<'feed' | 'profile' | 'messages'>('feed');

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleSave = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, isSaved: !post.isSaved };
      }
      return post;
    }));
  };

  const handleComment = (postId: string) => {
    if (newComment.trim()) {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, {
              id: Date.now().toString(),
              username: 'you',
              text: newComment,
              timestamp: 'Just now',
              likes: 0,
              isLiked: false
            }]
          };
        }
        return post;
      }));
      setNewComment('');
    }
  };

  const handleCreatePost = async (postData: { image: string; caption: string; location?: string }) => {
    const newPost: Post = {
      id: Date.now().toString(),
      username: 'you',
      userAvatar: '/logo.png',
      image: postData.image,
      caption: postData.caption,
      likes: 0,
      comments: [],
      timestamp: 'Just now',
      isLiked: false,
      isSaved: false,
      location: postData.location
    };
    
    setPosts([newPost, ...posts]);
  };

  const handleViewComments = (post: Post) => {
    setSelectedPost(post);
    setShowComments(true);
  };

  const handleAddCommentToModal = (text: string) => {
    if (selectedPost) {
      setPosts(posts.map(post => {
        if (post.id === selectedPost.id) {
          return {
            ...post,
            comments: [...post.comments, {
              id: Date.now().toString(),
              username: 'you',
              text,
              timestamp: 'Just now',
              likes: 0,
              isLiked: false
            }]
          };
        }
        return post;
      }));
      setSelectedPost({
        ...selectedPost,
        comments: [...selectedPost.comments, {
          id: Date.now().toString(),
          username: 'you',
          text,
          timestamp: 'Just now',
          likes: 0,
          isLiked: false
        }]
      });
    }
  };

  const handleLikeComment = (commentId: string) => {
    if (selectedPost) {
      setSelectedPost({
        ...selectedPost,
        comments: selectedPost.comments.map(comment => {
          if (comment.id === commentId) {
            return {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
            };
          }
          return comment;
        })
      });
    }
  };

  const handleStoryClick = (storyIndex: number) => {
    setCurrentStoryIndex(storyIndex);
    setShowStoryViewer(true);
  };

  const filteredStories = stories.filter(story => 
    story.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPosts = posts.filter(post => 
    post.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.caption.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="max-w-2xl mx-auto p-4">
            <UserProfile
              username="you"
              avatar="/logo.png"
              bio="Poker enthusiast | Casino lover | Always chasing the next big win 🎰"
              posts={12}
              followers={1247}
              following={892}
              isOwnProfile={true}
            />
          </div>
        );
      case 'messages':
        return (
          <div className="max-w-2xl mx-auto p-4">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-2xl p-6 text-center shadow-lg shadow-[#4B9CD3]/20">
              <div className="text-4xl mb-4">💬</div>
              <h2 className="text-xl font-semibold text-white mb-2">Direct Messages</h2>
              <p className="text-[#A0A0A0] mb-4">Connect with other players privately</p>
              <button
                onClick={() => setShowMessages(true)}
                className="bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] text-black px-6 py-2 rounded-xl font-semibold hover:from-[#3A8BC2] hover:to-[#6AA2D5] transition duration-300 shadow-lg shadow-[#4B9CD3]/30"
              >
                Open Messages
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div className="max-w-2xl mx-auto">
            {/* Stories */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-2xl p-4 mb-4 shadow-lg shadow-[#4B9CD3]/20">
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {filteredStories.map((story, index) => (
                  <div 
                    key={story.id} 
                    className="flex flex-col items-center space-y-1 min-w-[60px] cursor-pointer"
                    onClick={() => story.hasStory && handleStoryClick(index)}
                  >
                    <div className={`w-14 h-14 rounded-full p-0.5 ${
                      story.hasStory 
                        ? story.isViewed 
                          ? 'bg-gray-600' 
                          : 'bg-gradient-to-r from-purple-500 to-pink-500'
                        : 'bg-gray-600'
                    }`}>
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-900 to-gray-800 p-0.5">
                        <img 
                          src={story.avatar} 
                          alt={story.username}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <span className="text-xs text-[#A0A0A0] truncate w-full text-center">
                      {story.username}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-gradient-to-br from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-2xl shadow-lg shadow-[#4B9CD3]/20">
                  {/* Post Header */}
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={post.userAvatar} 
                        alt={post.username}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <span className="font-semibold text-sm text-white">{post.username}</span>
                        {post.location && (
                          <div className="text-xs text-[#A0A0A0]">{post.location}</div>
                        )}
                      </div>
                    </div>
                    <button className="p-1 hover:bg-[#4B9CD3]/20 rounded-full transition-colors">
                      <MoreHorizontal size={16} className="text-[#A0A0A0]" />
                    </button>
                  </div>

                  {/* Post Image */}
                  <div className="relative">
                    <img 
                      src={post.image} 
                      alt="Post"
                      className="w-full h-96 object-cover"
                    />
                  </div>

                  {/* Post Actions */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <button 
                          onClick={() => handleLike(post.id)}
                          className={`p-1 transition-colors ${
                            post.isLiked ? 'text-red-500' : 'text-[#A0A0A0] hover:text-red-500'
                          }`}
                        >
                          <Heart size={24} fill={post.isLiked ? 'currentColor' : 'none'} />
                        </button>
                        <button 
                          onClick={() => handleViewComments(post)}
                          className="p-1 text-[#A0A0A0] hover:text-[#4B9CD3] transition-colors"
                        >
                          <MessageCircle size={24} />
                        </button>
                        <button className="p-1 text-[#A0A0A0] hover:text-[#4B9CD3] transition-colors">
                          <Send size={24} />
                        </button>
                      </div>
                      <button 
                        onClick={() => handleSave(post.id)}
                        className={`p-1 transition-colors ${
                          post.isSaved ? 'text-yellow-400' : 'text-[#A0A0A0] hover:text-yellow-400'
                        }`}
                      >
                        <Bookmark size={24} fill={post.isSaved ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    {/* Likes Count */}
                    <div className="font-semibold text-sm mb-2 text-white">
                      {post.likes.toLocaleString()} likes
                    </div>

                    {/* Caption */}
                    <div className="mb-2">
                      <span className="font-semibold text-sm mr-2 text-white">{post.username}</span>
                      <span className="text-sm text-[#A0A0A0]">{post.caption}</span>
                    </div>

                    {/* Comments Preview */}
                    {post.comments.length > 0 && (
                      <div className="mb-3">
                        {post.comments.slice(0, 2).map((comment) => (
                          <div key={comment.id} className="mb-1">
                            <span className="font-semibold text-sm mr-2 text-white">{comment.username}</span>
                            <span className="text-sm text-[#A0A0A0]">{comment.text}</span>
                          </div>
                        ))}
                        {post.comments.length > 2 && (
                          <button 
                            onClick={() => handleViewComments(post)}
                            className="text-sm text-[#A0A0A0] hover:text-white"
                          >
                            View all {post.comments.length} comments
                          </button>
                        )}
                      </div>
                    )}

                    {/* Timestamp */}
                    <div className="text-xs text-[#A0A0A0] mb-3">
                      {post.timestamp}
                    </div>

                    {/* Add Comment */}
                    {activePost === post.id && (
                      <div className="flex items-center space-x-2 pt-3 border-t border-[#4B9CD3]/30">
                        <button className="p-1 text-[#A0A0A0] hover:text-yellow-400 transition-colors">
                          <Smile size={20} />
                        </button>
                        <input
                          type="text"
                          placeholder="Add a comment..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleComment(post.id)}
                          className="flex-1 bg-transparent text-sm outline-none placeholder-[#A0A0A0] text-white"
                        />
                        <button 
                          onClick={() => handleComment(post.id)}
                          disabled={!newComment.trim()}
                          className={`text-sm font-semibold ${
                            newComment.trim() ? 'text-[#4B9CD3] hover:text-[#7BB3E6]' : 'text-[#A0A0A0]'
                          }`}
                        >
                          Post
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#4B9CD3] to-transparent rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#7BB3E6] to-transparent rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-black to-gray-900 border-b border-[#4B9CD3] px-4 py-3 shadow-lg shadow-[#4B9CD3]/10">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-[#4B9CD3]">Social Feed</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0A0A0]" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gradient-to-br from-gray-900 to-gray-800 border border-[#4B9CD3] text-white placeholder-[#A0A0A0] pl-10 pr-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4B9CD3] shadow-lg shadow-[#4B9CD3]/20"
              />
            </div>
            <button 
              onClick={() => setShowCreatePost(true)}
              className="p-2 hover:bg-[#4B9CD3]/20 rounded-full transition-colors"
            >
              <Camera size={24} className="text-[#4B9CD3]" />
            </button>
            <button className="p-2 hover:bg-[#4B9CD3]/20 rounded-full transition-colors">
              <Bell size={24} className="text-[#A0A0A0]" />
            </button>
            <button className="p-2 hover:bg-[#4B9CD3]/20 rounded-full transition-colors">
              <Send size={24} className="text-[#A0A0A0]" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {renderContent()}
      </div>

      {/* Create Post Button */}
      <div className="fixed bottom-20 right-6 z-20">
        <button 
          onClick={() => setShowCreatePost(true)}
          className="bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] p-4 rounded-full shadow-lg shadow-[#4B9CD3]/30 hover:shadow-xl hover:shadow-[#4B9CD3]/40 transition-all duration-200 hover:scale-105"
        >
          <Camera size={24} className="text-black" />
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-gradient-to-r from-black to-gray-900 border-t border-[#4B9CD3] px-4 py-2 shadow-lg shadow-[#4B9CD3]/10">
        <div className="max-w-2xl mx-auto flex items-center justify-around">
          <button 
            onClick={() => setActiveTab('feed')}
            className={`p-2 transition-colors ${
              activeTab === 'feed' ? 'text-[#4B9CD3]' : 'text-[#A0A0A0] hover:text-white'
            }`}
          >
            <Home size={24} />
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={`p-2 transition-colors ${
              activeTab === 'messages' ? 'text-[#4B9CD3]' : 'text-[#A0A0A0] hover:text-white'
            }`}
          >
            <Send size={24} />
          </button>
          <button 
            onClick={() => setShowCreatePost(true)}
            className="p-2 text-[#A0A0A0] hover:text-white transition-colors"
          >
            <Camera size={24} />
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`p-2 transition-colors ${
              activeTab === 'profile' ? 'text-[#4B9CD3]' : 'text-[#A0A0A0] hover:text-white'
            }`}
          >
            <User size={24} />
          </button>
        </div>
      </div>

      {/* Modals */}
      {showCreatePost && (
        <CreatePostModal
          isOpen={showCreatePost}
          onClose={() => setShowCreatePost(false)}
          onSubmit={handleCreatePost}
        />
      )}

      {showComments && selectedPost && (
        <CommentsModal
          isOpen={showComments}
          onClose={() => setShowComments(false)}
          comments={selectedPost.comments}
          onAddComment={handleAddCommentToModal}
          onLikeComment={handleLikeComment}
        />
      )}

      {showStoryViewer && (
        <StoryViewer
          stories={stories.filter(s => s.hasStory && s.image)}
          currentStoryIndex={currentStoryIndex}
          onClose={() => setShowStoryViewer(false)}
          onNext={() => {
            if (currentStoryIndex < stories.filter(s => s.hasStory && s.image).length - 1) {
              setCurrentStoryIndex(currentStoryIndex + 1);
            } else {
              setShowStoryViewer(false);
            }
          }}
          onPrevious={() => {
            if (currentStoryIndex > 0) {
              setCurrentStoryIndex(currentStoryIndex - 1);
            }
          }}
        />
      )}

      {showMessages && (
        <DirectMessages
          isOpen={showMessages}
          onClose={() => setShowMessages(false)}
        />
      )}
    </div>
  );
} 