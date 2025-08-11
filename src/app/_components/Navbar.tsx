import { Search } from "lucide-react";
import Link from "next/link";
import MenuButton from "./_components/MenuButton";
import NavProfile from "./_components/NavProfile";
import { getAllCartApi } from "@/services/cartApi";

export default async function Navbar() {
  let totalItem = 0;
  try {
    const { total } = await getAllCartApi();
    totalItem = total;
  } catch (error) {
    // Log or ignore unauthorized error, but don't block rendering
    console.error("Cart fetch failed:", error);
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <MenuButton />
              <Link
                href="/"
                className="ml-4 text-2xl font-extrabold tracking-tight"
              >
                <span className="text-gray-800">NanuBhai</span>
              </Link>
            </div>
            <NavProfile cartTotal={totalItem} />
          </div>
        </div>
      </nav>

      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="relative flex items-center">
            <input
              type="search"
              placeholder="Search For Products"
              className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-800"
            />
            <Search className="absolute left-3 h-5 w-5 text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  );
}
