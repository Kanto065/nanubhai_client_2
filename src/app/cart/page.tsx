import React from "react";
import ShoppingCart from "@/components/cart/ShoppingCart";
import { getAllCartApi } from "@/services/cartApi";

export default async function CartPage() {
  let cartItems = [];
  try {
    const { cart } = await getAllCartApi();
    cartItems = cart;
  } catch (error) {
    // Log or ignore unauthorized error, but don't block rendering
    console.error("Cart fetch failed:", error);
  }

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen py-6">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <ShoppingCart cart={cartItems} />
      </div>
    </div>
  );
}
