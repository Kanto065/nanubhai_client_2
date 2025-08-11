"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Grid,
  Star,
  Flag,
  MessageSquare,
  LogOut,
  LogIn,
  UserPlus,
  X,
} from "lucide-react";
import { useSelector } from "react-redux";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { apiSlice } from "@/redux/features/apiSlice";
import { logoutAction } from "@/actions/user";

interface NavItem {
  name: string;
  icon: React.ReactNode;
  path: string;
  onClick?: () => void;
}

interface SideNavbarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideNavbar: React.FC<SideNavbarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  // Close sidebar when clicking outside or pressing Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is on the hamburger menu button
      const target = event.target as Element;
      const isMenuButton =
        target.closest('button[aria-label="Close menu"]') ||
        target.closest('button[aria-label="Open menu"]');

      // Only close if click is outside sidebar and not on the menu button
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !isMenuButton &&
        isOpen
      ) {
        onClose();
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  // We don't need to prevent scrolling when sidebar is open
  // This effect has been removed to allow scrolling while the sidebar is open

  // Common navigation items
  const commonNavItems: NavItem[] = [
    { name: "Home", icon: <Home className="w-5 h-5" />, path: "/" },
    {
      name: "Categories",
      icon: <Grid className="w-5 h-5" />,
      path: "/categories",
    },
    { name: "Review", icon: <Star className="w-5 h-5" />, path: "/review" },
    { name: "Report", icon: <Flag className="w-5 h-5" />, path: "/report" },
    {
      name: "Feedback",
      icon: <MessageSquare className="w-5 h-5" />,
      path: "/feedback",
    },
  ];

  // Authentication-specific items
  const authNavItems: NavItem[] = user
    ? [
        {
          name: "Logout",
          icon: <LogOut className="w-5 h-5" />,
          path: "#",
          onClick: () => {
            handleLogout();
            onClose();
          },
        },
      ]
    : [
        { name: "Login", icon: <LogIn className="w-5 h-5" />, path: "/login" },
        {
          name: "Register",
          icon: <UserPlus className="w-5 h-5" />,
          path: "/register",
        },
      ];

  // Combine the navigation items
  const navItems = [...commonNavItems, ...authNavItems];

  const handleLogout = async () => {
    const result = await logoutAction();
    if (result.success) {
      dispatch(userLoggedOut());
      // Clear RTK Query cache completely
      dispatch(apiSlice.util.resetApiState());
      router.push("/login");
    }
  };
  return (
    <>
      {/* Sidebar */}
      {isOpen && (
        <div
          ref={sidebarRef}
          className="fixed top-1/2 left-0 -translate-y-1/2 h-auto max-h-[85vh] w-64 bg-white shadow-lg z-50 rounded-r-lg overflow-y-auto transform transition-transform duration-300 ease-in-out animate-slideInLeft"
          style={{
            transform: isOpen ? "translateX(0)" : "translateX(-100%)",
            animation: "slideInLeft 0.3s ease-out forwards",
          }}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2
              className="text-xl font-bold text-black animate-fadeIn"
              style={{
                color: "black",
                animation: "fadeIn 0.5s ease-out 0.2s both",
              }}
            >
              Menu
            </h2>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-1 rounded-full hover:bg-gray-200 transition-all duration-300 hover:rotate-90"
            >
              <X className="w-5 h-5 text-black" />
            </button>
          </div>

          <nav className="p-4">
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  {item?.onClick ? (
                    <button
                      className={`w-full text-left flex items-center space-x-3 py-2 px-4 rounded-md transition-all duration-200 text-black hover:bg-gray-100 hover:translate-x-1`}
                      style={{ color: "black" }}
                      onClick={item?.onClick}
                    >
                      <span className="text-black" style={{ color: "black" }}>
                        {item.icon}
                      </span>
                      <span
                        className="font-medium text-black"
                        style={{ color: "black" }}
                      >
                        {item.name}
                      </span>
                    </button>
                  ) : (
                    <div className="transition-transform duration-200 hover:translate-x-1">
                      <Link
                        href={item.path}
                        className={`flex items-center space-x-3 py-2 px-4 rounded-md transition-colors ${
                          pathname === item.path
                            ? "bg-black text-white border-l-4 border-primary"
                            : "text-black hover:bg-gray-100"
                        }`}
                        style={{
                          color: pathname === item.path ? "white" : "black",
                        }}
                        onClick={onClose}
                      >
                        <span
                          className={`${
                            pathname === item.path ? "text-white" : "text-black"
                          } flex items-center justify-center`}
                          style={{
                            color: pathname === item.path ? "white" : "black",
                          }}
                        >
                          {item.icon}
                        </span>
                        <span
                          className={`font-medium ${
                            pathname === item.path
                              ? "text-white "
                              : "text-black "
                          }`}
                          style={{
                            color: pathname === item.path ? "white" : "black",
                          }}
                        >
                          {item.name}
                        </span>
                      </Link>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default SideNavbar;
