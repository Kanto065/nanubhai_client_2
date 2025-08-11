import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BottomNavbar from "./BottomNavbar";
import ChatButton from "@/components/button/ChatButton";
import PageTransition from "./PageTransition";
import { userProfileApi } from "@/services/authApi";
import AuthProvider from "@/provider/AuthProvider";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = async ({ children }: MainLayoutProps) => {
  let user = undefined;
  try {
    user = await userProfileApi();
  } catch {}

  return (
    <AuthProvider user={user}>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="grow pt-2 pb-16">
          <PageTransition>{children}</PageTransition>
        </main>
        <BottomNavbar />
        <ChatButton />
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default MainLayout;
