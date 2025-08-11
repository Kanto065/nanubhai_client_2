"use client";
import React from "react";
import ProfileMenu from "./ProfileMenu";
import Link from "next/link";
import { useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";

export default function NavProfile({ cartTotal = 0 }: { cartTotal: number }) {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className="flex items-center space-x-4">
      {user ? (
        <span className="hidden md:block font-medium text-black">
          Hi, {user?.name}
        </span>
      ) : (
        <div className="hidden md:flex space-x-2">
          <Link
            href="/login"
            className="font-medium text-black hover:text-primary transition-colors"
          >
            Login
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            href="/register"
            className="font-medium text-black hover:text-primary transition-colors"
          >
            Register
          </Link>
        </div>
      )}
      <Link
        href="/cart"
        className="p-2 rounded-full hover:bg-gray-200 transition-colors relative"
        aria-label="Shopping cart"
      >
        <ShoppingCart className="h-7 w-7 text-black" strokeWidth={2} />
        {cartTotal > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white shadow-sm z-10">
            {cartTotal}
          </span>
        )}
      </Link>
      <ProfileMenu />
    </div>
  );
}
