'use client';

import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

const ChatButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-20 right-6 z-50">
      <div className="animate-bounceIn" style={{ animation: 'bounceIn 0.6s ease-out 1s backwards' }}>
        <button
          className="bg-white border border-gray-300 p-3 rounded-full shadow-lg hover:shadow-xl transition-all relative hover:scale-110 active:scale-90"
          onClick={() => alert('Chat functionality would open here')}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ transition: 'all 0.2s ease' }}
        >
          <MessageCircle className="h-6 w-6 text-black" style={{ color: 'black' }} />

          {isHovered && (
            <span
              className="absolute -top-8 right-0 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap animate-fadeInDown"
              style={{ animation: 'fadeInDown 0.3s ease-out' }}
            >
              Chat with us
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatButton;
