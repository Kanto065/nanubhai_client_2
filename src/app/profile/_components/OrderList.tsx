"use client";

import {
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Package,
  RotateCcw,
  Search,
  Truck,
  Undo2,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Order, OrderStatus } from "@/types/order";
import { getImageUrl } from "@/utils";
import dayjs from "dayjs";

export default function OrderList({ orders }: { orders: Order[] }) {
  // State for expanded order details
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all");

  // Toggle order details expansion
  const toggleOrderDetails = (orderId: string) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  // Get status badge
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "placed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            Placed
          </span>
        );
      case "processing":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            Processing
          </span>
        );
      case "shipping":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Truck className="w-3 h-3 mr-1" />
            Shipping
          </span>
        );
      case "delivered":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Check className="w-3 h-3 mr-1" />
            Delivered
          </span>
        );
      case "returned":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            <RotateCcw className="w-3 h-3 mr-1" />
            Returned
          </span>
        );
      case "refunded":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
            <Undo2 className="w-3 h-3 mr-1" />
            Refunded
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
            <X className="w-3 h-3 mr-1" />
            Cancelled
          </span>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-linear-to-r from-gray-800 to-black p-6 text-white">
        <h2 className="text-2xl font-bold">My Orders</h2>
        <p className="text-gray-300">View and track your order history</p>
      </div>

      {/* Filters */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
          <div className="relative grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search orders by ID or product name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black"
            />
          </div>

          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700 mr-2">
              Status:
            </span>
            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value as OrderStatus | "all")
              }
              className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black py-2 px-3"
            >
              <option value="all">All Orders</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="divide-y divide-gray-200">
        {orders?.length > 0 ? (
          orders?.map((order: Order) => (
            <div
              key={order?._id}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              {/* Order Summary */}
              <div
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center cursor-pointer"
                onClick={() => toggleOrderDetails(order?._id)}
              >
                <div className="flex flex-col mb-2 sm:mb-0">
                  <div className="flex items-center">
                    <span className="font-bold text-black">
                      {order?.orderId}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-sm text-gray-600">
                      {dayjs(order?.createdAt).format(
                        "DD MMM YYYY, hh:mm:ss A"
                      )}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center">
                    <Package className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-600">
                      {order?.orderitems?.length}
                      {order?.orderitems?.length === 1 ? "item" : "items"}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="font-medium text-black">
                      ৳{order?.totalAmount}
                    </span>
                  </div>
                </div>

                <div className="flex items-center">
                  {getStatusBadge(order?.status)}
                  <button className="ml-4 text-gray-500 focus:outline-none">
                    {expandedOrderId === order?._id ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Order Details (Expanded) */}
              {expandedOrderId === order?._id && (
                <div className="mt-4 border-t border-gray-200 pt-4">
                  {/* Order Items */}
                  <h3 className="text-lg font-medium text-black mb-3">
                    Order Items
                  </h3>
                  <div className="space-y-3">
                    {order?.orderitems.map((item) => (
                      <div
                        key={item?._id}
                        className="flex items-center p-3 border border-gray-200 rounded-md"
                      >
                        <div className="w-16 h-16 shrink-0 bg-gray-100 rounded-md overflow-hidden">
                          <Image
                            src={
                              item?.image
                                ? getImageUrl(item?.image)
                                : "/images/product-placeholder.jpg"
                            }
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 grow">
                          <Link
                            href={`/products/${item?.productId}`}
                            className="text-black font-medium hover:text-primary"
                          >
                            {item?.name}
                          </Link>
                          <div className="flex justify-between mt-1">
                            <span className="text-sm text-gray-600">
                              Qty: {item?.quantity}
                            </span>
                            <span className="font-medium text-black">
                              ৳{item?.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shipping & Payment Info */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium text-black mb-2">
                        Shipping Information
                      </h3>
                      {order?.shippingaddress?.map((shipping) => (
                        <div
                          key={shipping?._id}
                          className="bg-gray-50 p-3 rounded-md"
                        >
                          <p className="text-gray-600">{shipping?.street}</p>
                          <p className="text-gray-600">
                            {shipping?.city},{shipping?.postCode}
                          </p>
                          <p className="text-gray-600">{shipping?.country}</p>

                          {/* {order?.trackingNumber && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-sm font-medium text-black">
                              Tracking Number:
                            </p>
                            <p className="text-blue-600">
                              {order.trackingNumber}
                            </p>
                          </div>
                        )} */}
                        </div>
                      ))}
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-black mb-2">
                        Payment Information
                      </h3>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Payment Method:</span>
                          <span className="text-black">
                            {order?.paymentType}
                          </span>
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="text-black">
                              ৳{order?.grossAmount}
                            </span>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-gray-600">Shipping:</span>
                            <span className="text-black">
                              ৳{order?.shippingAmount}
                            </span>
                          </div>
                          <div className="flex justify-between mt-2 pt-2 border-t border-gray-200 font-bold">
                            <span className="text-gray-600">Total:</span>
                            <span className="text-black">
                              ৳{order?.netAmount}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-wrap gap-3 justify-end">
                    <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                      Contact Support
                    </button>
                    {order.status === "delivered" && (
                      <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none">
                        Write a Review
                      </button>
                    )}
                    {(order?.status === "processing" ||
                      order?.status === "shipping") && (
                      <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none">
                        Track Order
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-black mb-1">
              No orders found
            </h3>
            <p className="text-gray-500">
              {searchQuery || filterStatus !== "all"
                ? "Try adjusting your search or filter criteria"
                : "You haven't placed any orders yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
