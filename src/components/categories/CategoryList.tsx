import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/utils";

export default async function CategoryGrid() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/category/all`,
      {
        cache: "no-store", // or 'force-cache'
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await res.json();
    return (
      <Suspense fallback={<Loading />}>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {data?.categories?.length > 0 &&
            data?.categories?.map((category: any) => (
              <Link
                href={`/categories/${category._id}`}
                key={category._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-gray-200 hover:border-primary"
              >
                <figure className="relative aspect-square">
                  {/* Fallback image if the actual image is not available */}
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <span
                      className="text-black text-sm font-bold "
                      style={{ color: "black" }}
                    >
                      {category.name}
                    </span>
                  </div>

                  {/* Actual image */}
                  <Image
                    src={getImageUrl(category.image || "")}
                    alt={`${category.name} category`}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </figure>
                <div className="p-3 bg-white">
                  <h3
                    className="text-base font-extrabold text-black text-center text-black!"
                    style={{ color: "black" }}
                  >
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
        </div>
      </Suspense>
    );
  } catch (error) {
    return (
      <div className="text-red-600">
        Error loading data: {(error as Error).message}
      </div>
    );
  }
}

const Loading = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
        >
          <div className="aspect-square bg-gray-200"></div>
          <div className="p-3 bg-white">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
