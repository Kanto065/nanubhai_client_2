'use client';

import React from 'react';

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No need to fetch category data in layout as it's handled in the page component

  return (
    <div className="category-detail-layout">
      {children}
    </div>
  );
}
