'use client';

import { useState, useRef } from 'react';
import { X, Camera, Image, Smile, MapPin, Users } from 'lucide-react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: { image: string; caption: string; location?: string }) => void;
}

export default function CreatePostModal({ isOpen, onClose, onSubmit }: CreatePostModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage || !caption.trim()) return;
    
    setIsLoading(true);
    try {
      await onSubmit({
        image: selectedImage,
        caption: caption.trim(),
        location: location.trim() || undefined
      });
      handleClose();
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedImage(null);
    setCaption('');
    setLocation('');
    setIsLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl shadow-[#4B9CD3]/20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#4B9CD3]/30">
          <button 
            onClick={handleClose}
            className="text-[#A0A0A0] hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          <h2 className="text-lg font-semibold text-white">Create New Post</h2>
          <button 
            onClick={handleSubmit}
            disabled={!selectedImage || !caption.trim() || isLoading}
            className={`text-sm font-semibold ${
              selectedImage && caption.trim() && !isLoading
                ? 'text-[#4B9CD3] hover:text-[#7BB3E6]' : 'text-[#A0A0A0]'
            }`}
          >
            {isLoading ? 'Posting...' : 'Share'}
          </button>
        </div>

        <div className="flex">
          {/* Image Section */}
          <div className="flex-1 bg-black flex items-center justify-center min-h-[400px]">
            {selectedImage ? (
              <img 
                src={selectedImage} 
                alt="Selected"
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="text-center text-[#A0A0A0]">
                <Camera size={48} className="mx-auto mb-4" />
                <p>Select an image to share</p>
              </div>
            )}
          </div>

          {/* Form Section */}
          <div className="w-80 border-l border-[#4B9CD3]/30">
            {/* User Info */}
            <div className="p-4 border-b border-[#4B9CD3]/30">
              <div className="flex items-center space-x-3">
                <img 
                  src="/logo.png" 
                  alt="Your avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-semibold text-white">you</span>
              </div>
            </div>

            {/* Caption Input */}
            <div className="p-4">
              <textarea
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full bg-transparent text-white placeholder-[#A0A0A0] resize-none outline-none"
                rows={4}
                maxLength={2200}
              />
              <div className="text-right text-xs text-[#A0A0A0] mt-2">
                {caption.length}/2200
              </div>
            </div>

            {/* Additional Options */}
            <div className="px-4 space-y-4">
              {/* Location */}
              <div className="flex items-center space-x-3 p-2 hover:bg-[#4B9CD3]/10 rounded cursor-pointer transition-colors">
                <MapPin size={20} className="text-[#A0A0A0]" />
                <input
                  type="text"
                  placeholder="Add location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-[#A0A0A0] outline-none"
                />
              </div>

              {/* Tag People */}
              <div className="flex items-center space-x-3 p-2 hover:bg-[#4B9CD3]/10 rounded cursor-pointer transition-colors">
                <Users size={20} className="text-[#A0A0A0]" />
                <span className="text-[#A0A0A0]">Tag people</span>
              </div>

              {/* Emoji */}
              <div className="flex items-center space-x-3 p-2 hover:bg-[#4B9CD3]/10 rounded cursor-pointer transition-colors">
                <Smile size={20} className="text-[#A0A0A0]" />
                <span className="text-[#A0A0A0]">Add emoji</span>
              </div>
            </div>

            {/* Image Upload Button */}
            {!selectedImage && (
              <div className="p-4 border-t border-[#4B9CD3]/30">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] text-black py-2 px-4 rounded-xl font-semibold hover:from-[#3A8BC2] hover:to-[#6AA2D5] transition duration-300 shadow-lg shadow-[#4B9CD3]/30 flex items-center justify-center space-x-2"
                >
                  <Image size={20} />
                  <span>Select Image</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 