"use client";
import { Menu } from "lucide-react";
import React, { useState } from "react";
import SideNavbar from "../SideNavbar";

export default function MenuButton() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <button
        className="p-2 rounded-md hover:bg-gray-200 transition-colors"
        aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        onClick={(e) => {
          e.stopPropagation();
          setIsSidebarOpen(!isSidebarOpen);
        }}
      >
        <Menu className="h-7 w-7 text-black" strokeWidth={2} />
      </button>
      <SideNavbar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  );
}
