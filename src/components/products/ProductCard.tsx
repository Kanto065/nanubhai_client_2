"use client";
import AddToCartButton from "../button/AddToCartButton";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/utils";

export default function ProductCard({
  product,
  index,
}: {
  product: any;
  index: number;
}) {
  return (
    <article
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full animate-fadeIn"
      style={{
        animation: `fadeIn 0.5s ease-out ${0.1 * index}s both`,
      }}
    >
      {/* Product Image with Discount Badge */}
      <Link href={`/products/${product?._id}`}>
        <figure className="relative aspect-square">
          <Image
            src={
              product?.images?.length > 0
                ? getImageUrl(product?.images[0]?.image)
                : ""
            }
            alt={product?.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
            className="object-cover"
          />
          <div className="absolute top-2 left-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded">
            0% off
          </div>
        </figure>
      </Link>
      {/* Product Details */}
      <div className="p-2 flex flex-col grow">
        <Link href={`/products/${product?._id}`}>
          <h3
            className="text-sm font-bold mb-1 line-clamp-2 text-black hover:text-blue-900!"
            style={{ color: "black" }}
            title={product?.name}
          >
            {product?.name}
          </h3>
        </Link>
        {product?.freeDelivery && (
          <span className="text-[10px] text-green-600 font-medium mb-1">
            Free Shipping
          </span>
        )}

        <div className="mt-auto">
          <div className="mb-2 text-center">
            <span
              className="text-sm font-bold text-black "
              style={{ color: "black" }}
            >
              ৳{product?.price}
            </span>
            {product?.previousPrice && (
              <span className="ml-2 text-xs text-gray-500 line-through">
                ৳{product?.previousPrice}
              </span>
            )}
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}
