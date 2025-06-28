'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Story {
  id: string;
  username: string;
  avatar: string;
  image?: string;
  timestamp?: string;
}

interface StoryViewerProps {
  stories: Story[];
  currentStoryIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function StoryViewer({ 
  stories, 
  currentStoryIndex, 
  onClose, 
  onNext, 
  onPrevious 
}: StoryViewerProps) {
  const [progress, setProgress] = useState(0);
  const currentStory = stories[currentStoryIndex];

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          onNext();
          return 0;
        }
        return prev + 1;
      });
    }, 50); // 5 seconds total duration

    return () => clearInterval(interval);
  }, [currentStoryIndex, onNext]);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrevious();
    if (e.key === 'ArrowRight') onNext();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!currentStory?.image) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800">
        <div 
          className="h-full bg-white transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <div className="flex items-center space-x-3">
          <img 
            src={currentStory.avatar} 
            alt={currentStory.username}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <div className="text-white font-semibold">{currentStory.username}</div>
            <div className="text-gray-300 text-sm">{currentStory.timestamp}</div>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-white hover:text-gray-300 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Story Image */}
      <div className="relative w-full h-full flex items-center justify-center">
        <img 
          src={currentStory.image} 
          alt="Story"
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Navigation */}
      <button 
        onClick={onPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
      >
        <ChevronLeft size={32} />
      </button>
      <button 
        onClick={onNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
      >
        <ChevronRight size={32} />
      </button>

      {/* Story Indicators */}
      <div className="absolute top-4 left-4 right-4 flex space-x-1">
        {stories.map((_, index) => (
          <div 
            key={index}
            className="flex-1 h-0.5 bg-gray-600 rounded-full overflow-hidden"
          >
            <div 
              className={`h-full bg-white transition-all duration-75 ${
                index < currentStoryIndex ? 'w-full' : 
                index === currentStoryIndex ? 'w-full' : 'w-0'
              }`}
              style={{
                width: index === currentStoryIndex ? `${progress}%` : 
                       index < currentStoryIndex ? '100%' : '0%'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
} 