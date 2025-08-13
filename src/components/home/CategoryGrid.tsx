import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/utils";
import { CategoryBase } from "@/types/common";

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
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
          {data?.categories?.length > 0 &&
            data?.categories?.map((category: CategoryBase) => (
              <Link
                href={`/categories/${category._id}`}
                key={category._id}
                className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-primary
            transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-md hover:shadow-lg"
              >
                <div className="relative w-full h-full">
                  {/* Category image */}
                  <Image
                    src={getImageUrl(category?.image || "")}
                    alt={`${category?.name} category`}
                    fill
                    className="object-cover"
                  />

                  {/* Category name overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-white bg-opacity-90 p-1">
                    <span
                      className="text-xs font-medium text-black text-center block"
                      style={{ color: "black" }}
                    >
                      {category.name}
                    </span>
                  </div>
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
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="aspect-square rounded-lg bg-gray-200 animate-pulse border-2 border-gray-200"
        />
      ))}
    </div>
  );
};
