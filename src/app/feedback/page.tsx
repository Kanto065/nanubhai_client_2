import React from 'react';
import FeedbackForm from '@/components/feedback/FeedbackForm';
import { AlertCircle } from 'lucide-react';

const FeedbackPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 md:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-5 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-black text-black!" style={{ color: 'black' }}>We Value Your Feedback</h1>
          <p className="mt-2 text-base sm:text-lg text-gray-700 text-gray-700!" style={{ color: '#374151' }}>
            Your thoughts and suggestions help us improve our products and services
          </p>
        </div>

        <FeedbackForm />

        <div className="mt-5 sm:mt-8 bg-blue-50 p-4 sm:p-6 rounded-lg border border-blue-200">
          <div className="flex">
            <div className="shrink-0">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            </div>
            <div className="ml-2 sm:ml-3">
              <h3 className="text-xs sm:text-sm font-medium text-blue-800 text-blue-800!" style={{ color: '#1e40af' }}>Need immediate assistance?</h3>
              <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-blue-700 text-blue-700!" style={{ color: '#1d4ed8' }}>
                <p>
                  For urgent matters, please contact our customer support team directly:
                </p>
                <ul className="list-disc pl-4 sm:pl-5 mt-1 space-y-0.5 sm:space-y-1">
                  <li>Email: support@example.com</li>
                  <li>Phone: +1 (555) 123-4567</li>
                  <li>Hours: Monday-Friday, 9am-6pm EST</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
