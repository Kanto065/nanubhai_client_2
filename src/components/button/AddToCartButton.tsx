"use client";

import { addToCartAction } from "@/actions/cart";
import { Minus, Plus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { AddToCartProduct } from "@/types/cart";

export default function AddToCartButton({ product }: { product: AddToCartProduct }) {
  const [showQuantityControls, setShowQuantityControls] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const controlsRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close quantity controls
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        controlsRef.current &&
        !controlsRef.current.contains(event.target as Node)
      ) {
        setShowQuantityControls(() => false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // If Buy Now button is clicked, show quantity controls
    if (!showQuantityControls) {
      setShowQuantityControls(() => true);
    } else {
      // If Add button is clicked after selecting quantity
      const result = await addToCartAction({
        productId: product._id,
        quantity,
      });
      if (result.success) {
        toast.success("Product added to cart");

        // Reset and close after adding to cart
        setQuantity(1);
        setShowQuantityControls(() => false);
      } else {
        console.log(result.fieldErrors);
        toast.error(result?.message || "Failed to add to cart");
      }
    }
  };

  const increaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="relative" ref={controlsRef}>
      {/* Buy Now button */}
      {!showQuantityControls && (
        <button
          onClick={handleAddToCart}
          className={`w-full bg-black hover:bg-gray-800 text-white text-[10px] font-medium rounded-sm transition-all cursor-pointer duration-300 py-1.5`}
          aria-label="Buy Now"
        >
          Add To Cart
        </button>
      )}

      {/* Quantity Controls */}
      {showQuantityControls && (
        <div className="w-full flex items-center bg-white rounded-sm border border-gray-200 text-[10px]">
          <button
            onClick={decreaseQuantity}
            className="p-1.5 hover:bg-gray-100 rounded-l-sm flex-1 cursor-pointer"
          >
            <Minus className="w-2.5 h-2.5 text-black mx-auto" />
          </button>
          <span className="px-1.5 text-[10px] font-medium text-black flex-1 text-center cursor-default">
            {quantity}
          </span>
          <button
            onClick={increaseQuantity}
            className="p-1.5 hover:bg-gray-100 flex-1 cursor-pointer"
          >
            <Plus className="w-2.5 h-2.5 text-black mx-auto" />
          </button>
          <button
            onClick={handleAddToCart}
            className="p-1.5 px-1.5 bg-black text-white text-[10px] rounded-r-sm flex-1 cursor-pointer"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}
