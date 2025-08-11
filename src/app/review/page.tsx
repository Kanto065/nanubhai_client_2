'use client';

import React, { useState } from 'react';
import ReviewForm from '@/components/review/ReviewForm';
import ReviewList from '@/components/review/ReviewList';

const ReviewPage = () => {
  const [activeTab, setActiveTab] = useState('write');

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 md:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-5 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-black text-black!" style={{ color: 'black' }}>Product Reviews</h1>
          <p className="mt-2 text-base sm:text-lg text-gray-700 text-gray-700!" style={{ color: '#374151' }}>
            Share your experience or read what others have to say
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-5 sm:mb-8">
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-3 sm:py-4 px-3 sm:px-6 text-center text-sm sm:text-base font-medium ${
                activeTab === 'write'
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('write')}
            >
              Write a Review
            </button>
            <button
              className={`flex-1 py-3 sm:py-4 px-3 sm:px-6 text-center text-sm sm:text-base font-medium ${
                activeTab === 'read'
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('read')}
            >
              Read Reviews
            </button>
          </div>

          {activeTab === 'write' ? (
            <div className="p-3 sm:p-6">
              <ReviewForm />
            </div>
          ) : (
            <div className="p-3 sm:p-6">
              <ReviewList />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
