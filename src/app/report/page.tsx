import React from 'react';
import ReportForm from '@/components/report/ReportForm';

const ReportPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 md:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-5 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-black text-black!" style={{ color: 'black' }}>Report an Issue</h1>
          <p className="mt-2 text-base sm:text-lg text-gray-700 text-gray-700!" style={{ color: '#374151' }}>
            We&apos;re sorry you&apos;re experiencing an issue. Please fill out the form below and we&apos;ll address it promptly.
          </p>
        </div>

        <ReportForm />
      </div>
    </div>
  );
};

export default ReportPage;
