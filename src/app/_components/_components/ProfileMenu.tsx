"use client";
import { logoutAction } from "@/actions/user";
import { apiSlice } from "@/redux/features/apiSlice";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function ProfileMenu() {
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const handleLogout = async () => {
    const result = await logoutAction();
    if (result.success) {
      dispatch(userLoggedOut());
      // Clear RTK Query cache completely
      dispatch(apiSlice.util.resetApiState());
      router.push("/login");
    }
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node) &&
        showUserMenu
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);
  return (
    <div className="relative" ref={userMenuRef}>
      <button
        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        aria-label="User menu"
        onClick={() => setShowUserMenu(!showUserMenu)}
      >
        <User className="h-7 w-7 text-black" strokeWidth={2} />
      </button>

      {/* User dropdown menu */}
      {showUserMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          {user ? (
            <>
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setShowUserMenu(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setShowUserMenu(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Logout</span>
                </div>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setShowUserMenu(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setShowUserMenu(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
