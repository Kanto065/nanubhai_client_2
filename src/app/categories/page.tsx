import React from 'react';
import CategoryList from '@/components/categories/CategoryList';

export const metadata = {
  title: 'Categories - NanuBhai Baking Supplies',
  description: 'Browse all cake baking ingredients and tools categories',
};

export default function CategoriesPage() {
  return (
    <div className="flex flex-col bg-gray-50">
      <div className="max-w-7xl mx-auto w-full px-2 sm:px-4 py-4 md:py-6">
        <CategoryList />
      </div>
    </div>
  );
}
