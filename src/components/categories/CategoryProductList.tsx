import React from "react";
import { getProducts } from "@/services/productApi";
import ProductCard from "../products/ProductCard";

export default async function CategoryProductList({
  id,
  categoryName,
}: {
  id: string;
  categoryName: string;
}) {
  let content = null;
  try {
    const resData = await getProducts();
    const { products } = resData;
    content = (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 px-2 sm:px-4">
        {products?.length > 0 &&
          products?.map((product: any, index: number) => (
            <ProductCard key={product?._id} product={product} index={index} />
          ))}
      </div>
    );
  } catch (error) {
    content = (
      <div className="text-red-600">
        Error loading data: {(error as Error).message}
      </div>
    );
  }
  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-2xl font-extrabold text-black mb-6"
          style={{ color: "black" }}
        >
          {categoryName}
        </h2>

        {/* Search Bar */}
        <div className="relative flex items-center mb-8">
          <input
            type="search"
            placeholder={`Search in ${categoryName}`}
            className="w-full px-4 py-3 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 text-base font-medium"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Product Grid */}
        {content}
      </div>
    </section>
  );
}
