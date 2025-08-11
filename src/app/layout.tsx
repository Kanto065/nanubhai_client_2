import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MainLayout from "@/app/_components/MainLayout";
import ReduxProvider from "@/redux/ReduxProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EStore - Your Online Shop",
  description: "Find the best products at great prices",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <ReduxProvider>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
          >
            <MainLayout>{children}</MainLayout>
          </GoogleOAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
