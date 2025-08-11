import React from 'react';

export const metadata = {
  title: 'Categories - NanuBhai Baking Supplies',
  description: 'Browse all cake baking ingredients and tools categories',
};

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="categories-layout">
      {children}
    </div>
  );
}
