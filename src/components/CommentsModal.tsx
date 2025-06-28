'use client';

import { useState } from 'react';
import { X, Heart, Smile } from 'lucide-react';

interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  comments: Comment[];
  onAddComment: (text: string) => void;
  onLikeComment: (commentId: string) => void;
}

export default function CommentsModal({ 
  isOpen, 
  onClose, 
  comments, 
  onAddComment, 
  onLikeComment 
}: CommentsModalProps) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = () => {
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-2xl max-w-md w-full max-h-[80vh] flex flex-col shadow-2xl shadow-[#4B9CD3]/20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#4B9CD3]/30">
          <h2 className="text-lg font-semibold text-white">Comments</h2>
          <button 
            onClick={onClose}
            className="text-[#A0A0A0] hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {comments.length === 0 ? (
            <div className="text-center text-[#A0A0A0] py-8">
              <p>No comments yet</p>
              <p className="text-sm">Be the first to comment!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <img 
                  src="/logo.png" 
                  alt={comment.username}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-700 border border-[#4B9CD3]/30 rounded-xl p-3 shadow-lg shadow-[#4B9CD3]/10">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-white">{comment.username}</span>
                      <span className="text-xs text-[#A0A0A0]">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-[#A0A0A0] mb-2">{comment.text}</p>
                    <div className="flex items-center space-x-4">
                      <button 
                        onClick={() => onLikeComment(comment.id)}
                        className={`flex items-center space-x-1 text-xs transition-colors ${
                          comment.isLiked ? 'text-red-500' : 'text-[#A0A0A0] hover:text-red-500'
                        }`}
                      >
                        <Heart size={12} fill={comment.isLiked ? 'currentColor' : 'none'} />
                        <span>{comment.likes}</span>
                      </button>
                      <button className="text-xs text-[#A0A0A0] hover:text-white">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Comment */}
        <div className="p-4 border-t border-[#4B9CD3]/30">
          <div className="flex items-center space-x-2">
            <button className="p-1 text-[#A0A0A0] hover:text-yellow-400 transition-colors">
              <Smile size={20} />
            </button>
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              className="flex-1 bg-transparent text-white placeholder-[#A0A0A0] outline-none"
            />
            <button 
              onClick={handleSubmit}
              disabled={!newComment.trim()}
              className={`text-sm font-semibold ${
                newComment.trim() ? 'text-[#4B9CD3] hover:text-[#7BB3E6]' : 'text-[#A0A0A0]'
              }`}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 