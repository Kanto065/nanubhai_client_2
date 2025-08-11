import { Heart, ShoppingBag } from "lucide-react";
import React from "react";

export default function QuickStatus({
  orderCount = 0,
  wishlistCount = 0,
}: {
  orderCount: number;
  wishlistCount: number;
}) {
  return (
    <div className="mt-6 bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-black! mb-4">Quick Stats</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-md text-center">
          <ShoppingBag className="h-6 w-6 text-green-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-black">{orderCount}</p>
          <p className="text-sm text-gray-600">Orders</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-md text-center">
          <Heart className="h-6 w-6 text-red-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-black">{wishlistCount}</p>
          <p className="text-sm text-gray-600">Wishlist</p>
        </div>
      </div>
    </div>
  );
}
