"use client";

import { changeCartQuantiyAction, deleteCartAction } from "@/actions/cart";
import { getImageUrl } from "@/utils";
import { ShoppingCart as CartIcon, Frown, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ShoppingCart({ cart }: { cart: any }) {
  const router = useRouter();
  const [couponCode, setCouponCode] = useState<string>("");

  // Calculate total price
  const totalPrice =
    cart?.length > 0 &&
    cart?.reduce(
      (total: number, item: any) =>
        total + item?.products[0]?.price * item?.quantity,
      0
    );
  const updateQuantity = async (type: "INC" | "DEC", productId: string) => {
    const result = await changeCartQuantiyAction({
      type,
      productId,
      quantity: 1,
    });
    if (result.success) {
    } else {
      console.log(result.fieldErrors);
      toast.error(result?.message || "Failed to change cart quantity");
    }
  };

  const removeFromCart = async (id: string) => {
    const result = await deleteCartAction(id);
    if (result.success) {
    } else {
      toast.error(result?.message || "Failed to delete cart");
    }
  };
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      {/* Cart Header */}
      <div className="p-4 border-b flex items-center justify-center">
        <CartIcon className="h-6 w-6 text-black mr-2" strokeWidth={2} />
        <h1
          className="text-xl font-extrabold text-black"
          style={{ color: "black" }}
        >
          My Cart
        </h1>
      </div>

      {/* Cart Items */}
      <div className="divide-y">
        {cart?.length > 0 ? (
          cart?.map((item: any) => (
            <div key={item?._id} className="p-4 flex items-start relative">
              {/* Product Image */}
              <div className="w-24 h-24 relative rounded-md overflow-hidden shrink-0">
                <Image
                  src={
                    item?.firstImage?.image
                      ? getImageUrl(item?.firstImage?.image)
                      : ""
                  }
                  alt={item?.products[0]?.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>

              {/* Product Details */}
              <div className="ml-4 grow pr-10">
                <div className="flex justify-between">
                  <h3
                    className="font-extrabold text-black text-lg "
                    style={{ color: "black" }}
                  >
                    {item?.products[0]?.name}
                  </h3>
                </div>
                <p
                  className="text-lg font-extrabold text-black mt-2"
                  style={{ color: "black" }}
                >
                  ৳{item?.products[0]?.price || 0}
                </p>

                {item?.variant && (
                  <div className="mt-3">
                    <p
                      className="text-sm text-black font-bold"
                      style={{ color: "black" }}
                    >
                      Variant: {item?.variant}
                    </p>
                  </div>
                )}

                {/* Quantity Controls */}
                <div className="flex items-center mt-4">
                  <button
                    onClick={() =>
                      updateQuantity("DEC", item?.products[0]?._id)
                    }
                    className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-md transition-colors cursor-pointer"
                  >
                    <span
                      className="text-black text-xl font-extrabold "
                      style={{ color: "black" }}
                    >
                      −
                    </span>
                  </button>
                  <div className="w-12 h-10 flex items-center justify-center bg-black text-white mx-2">
                    {item?.quantity}
                  </div>
                  <button
                    onClick={() =>
                      updateQuantity("INC", item?.products[0]?._id)
                    }
                    className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-md transition-colors cursor-pointer"
                  >
                    <span
                      className="text-black text-xl font-extrabold "
                      style={{ color: "black" }}
                    >
                      +
                    </span>
                  </button>
                </div>
              </div>

              {/* Delete Button - Positioned absolutely to avoid overlapping */}
              <button
                onClick={() => removeFromCart(item?._id)}
                className="text-gray-700 hover:text-red-500 absolute top-4 right-4 transition-colors cursor-pointer"
                aria-label="Remove item"
              >
                <Trash2 className="h-6 w-6" />
              </button>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-gray-400">
            <Frown size={64} />
            <p className="mt-4 text-lg font-medium text-black">
              Your cart is empty
            </p>
          </div>
        )}
      </div>

      {/* Coupon Section */}
      <div className="p-4 border-t">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Enter coupon code here"
            className="grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-black font-bold placeholder:text-black placeholder:opacity-60"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button
            disabled={cart?.length < 1}
            className={`bg-black text-white font-extrabold py-3 px-6 rounded-md hover:bg-gray-800 transition-colors shadow-md ${
              cart?.length < 1 ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            Add Coupon
          </button>
        </div>
      </div>

      {/* Total & Checkout */}
      <div className="bg-black text-white p-4 flex items-center justify-between">
        <div
          className="font-extrabold text-lg text-white!"
          style={{ color: "white" }}
        >
          Total - ৳{totalPrice}
        </div>
        <button
          onClick={() => router.push("/checkout")}
          className={`flex items-center space-x-2 font-extrabold group hover:text-primary transition-colors bg-primary px-4 py-1 rounded-md shadow-md  ${
            cart?.length < 1 ? "cursor-not-allowed " : "cursor-pointer"
          }`}
          disabled={cart?.length < 1}
        >
          <span className="text-white!" style={{ color: "white" }}>
            Next
          </span>
          <span className="text-xl group-hover:translate-x-1 transition-transform text-white">
            →
          </span>
        </button>
      </div>
    </div>
  );
}
