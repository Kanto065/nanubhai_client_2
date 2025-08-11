'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Package, Truck, Check, ArrowLeft, Download, Clock } from 'lucide-react';

// Define order status type
type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';

// Define order interface
interface OrderItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

interface OrderDetailProps {
  orderId: string;
  onBack: () => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ orderId, onBack }) => {
  // In a real app, this would come from an API call using the orderId
  const order: Order = {
    id: orderId,
    date: '2023-11-15T10:30:00',
    status: 'shipped',
    total: 129.95,
    items: [
      {
        id: 1,
        productId: 101,
        name: 'Professional Kitchen Knife Set',
        price: 89.95,
        quantity: 1,
        image: '/images/products/knife-set.jpg'
      },
      {
        id: 2,
        productId: 203,
        name: 'Silicone Baking Mat',
        price: 19.99,
        quantity: 2,
        image: '/images/products/baking-mat.jpg'
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    paymentMethod: 'Credit Card (ending in 4242)',
    trackingNumber: 'TRK928374651',
    estimatedDelivery: '2023-11-20'
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status badge and icon
  const getStatusInfo = (status: OrderStatus) => {
    switch (status) {
      case 'processing':
        return {
          icon: <Clock className="h-8 w-8 text-blue-500" />,
          badge: (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              Processing
            </span>
          ),
          message: 'Your order is being processed and will be shipped soon.'
        };
      case 'shipped':
        return {
          icon: <Truck className="h-8 w-8 text-yellow-500" />,
          badge: (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
              Shipped
            </span>
          ),
          message: 'Your order is on the way! Track your shipment to see the delivery status.'
        };
      case 'delivered':
        return {
          icon: <Check className="h-8 w-8 text-green-500" />,
          badge: (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Delivered
            </span>
          ),
          message: 'Your order has been delivered. Thank you for shopping with us!'
        };
      case 'cancelled':
        return {
          icon: (
            <svg className="h-8 w-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          ),
          badge: (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
              Cancelled
            </span>
          ),
          message: 'This order has been cancelled. Please contact customer support for more information.'
        };
      default:
        return {
          icon: <Package className="h-8 w-8 text-gray-500" />,
          badge: null,
          message: ''
        };
    }
  };

  const statusInfo = getStatusInfo(order.status);

  // Calculate subtotal
  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = order.total - subtotal;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Order Header */}
      <div className="bg-linear-to-r from-gray-800 to-black p-6 text-white">
        <div className="flex justify-between items-center">
          <button 
            onClick={onBack}
            className="flex items-center text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span>Back to Orders</span>
          </button>
          <button className="flex items-center bg-white text-black px-3 py-1 rounded-md hover:bg-gray-100 transition-colors">
            <Download className="h-4 w-4 mr-1" />
            <span>Invoice</span>
          </button>
        </div>
        <div className="mt-4">
          <h2 className="text-2xl font-bold">Order {order.id}</h2>
          <p className="text-gray-300">Placed on {formatDate(order.date)}</p>
        </div>
      </div>
      
      {/* Order Status */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center">
          {statusInfo.icon}
          <div className="ml-4">
            <div className="flex items-center">
              <h3 className="text-lg font-medium text-black mr-3">Order Status:</h3>
              {statusInfo.badge}
            </div>
            <p className="text-gray-600 mt-1">{statusInfo.message}</p>
          </div>
        </div>
        
        {order.trackingNumber && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black">Tracking Number:</p>
                <p className="text-blue-600">{order.trackingNumber}</p>
              </div>
              {order.estimatedDelivery && (
                <div className="mt-2 sm:mt-0">
                  <p className="text-sm font-medium text-black">Estimated Delivery:</p>
                  <p className="text-gray-600">{new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                </div>
              )}
              {order.status === 'shipped' && (
                <button className="mt-3 sm:mt-0 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none">
                  Track Package
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Order Items */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-black mb-4">Order Items</h3>
        <div className="space-y-4">
          {order.items.map(item => (
            <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center p-4 border border-gray-200 rounded-md">
              <div className="w-20 h-20 shrink-0 bg-gray-100 rounded-md overflow-hidden">
                <Image
                  src={item.image || '/images/product-placeholder.jpg'}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-4 grow">
                <Link href={`/products/${item.productId}`} className="text-black font-medium hover:text-primary">
                  {item.name}
                </Link>
                <div className="mt-1 text-sm text-gray-600">
                  Unit Price: ৳{item.price.toFixed(2)}
                </div>
              </div>
              <div className="mt-3 sm:mt-0 flex items-center">
                <span className="text-sm text-gray-600 mr-4">Qty: {item.quantity}</span>
                <span className="font-medium text-black">৳{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Shipping & Payment Info */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-black mb-3">Shipping Information</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="font-medium text-black">{order.shippingAddress.name}</p>
            <p className="text-gray-600">{order.shippingAddress.street}</p>
            <p className="text-gray-600">
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
            </p>
            <p className="text-gray-600">{order.shippingAddress.country}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-black mb-3">Payment Information</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-gray-600">Payment Method:</p>
            <p className="font-medium text-black mb-4">{order.paymentMethod}</p>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-black">৳{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Shipping:</span>
                <span className="text-black">৳{shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 font-bold">
                <span>Total:</span>
                <span>৳{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <div className="flex flex-wrap gap-3 justify-end">
          <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
            Contact Support
          </button>
          {order.status === 'delivered' && (
            <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none">
              Write a Review
            </button>
          )}
          {order.status === 'processing' && (
            <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none">
              Cancel Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
