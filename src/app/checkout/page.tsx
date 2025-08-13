import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CheckoutForm from "./_components/CheckoutForm";
import { getAllCartApi } from "@/services/cartApi";
import { getAllShippingAddressApi } from "@/services/shippingAddressApi";
import { ShippingAddress } from "@/types/order";

export default async function CheckoutPage() {
  let cartItems = [];
  let shippingAddress: Array<ShippingAddress> = [];
  try {
    const cartResult = await getAllCartApi();
    const shippingAddressResult = await getAllShippingAddressApi();
    cartItems = cartResult?.cart;
    shippingAddress = shippingAddressResult?.shippingAddresses.map(addr => ({
      ...addr,
      createdAt: new Date(addr.createdAt),
      updatedAt: new Date(addr.updatedAt)
    }));
  } catch (error) {
    // Log or ignore unauthorized error, but don't block rendering
    console.error("Fetch failed:", error);
  }
  return (
    <div className="flex flex-col bg-gray-50 min-h-screen py-6">
      <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link
          href="/cart"
          className="flex items-center text-gray-700 mb-6 hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span>Back to Cart</span>
        </Link>

        <CheckoutForm carts={cartItems} addresses={shippingAddress} />
      </div>
    </div>
  );
}
