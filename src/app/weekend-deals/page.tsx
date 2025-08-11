'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';

// Define product type
interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  freeShipping: boolean;
  category: string;
}

export default function WeekendDealsPage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 72,
    minutes: 0,
    seconds: 0,
  });

  // Countdown timer functionality
  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const totalSeconds = prevTime.hours * 3600 + prevTime.minutes * 60 + prevTime.seconds - 1;

        if (totalSeconds <= 0) {
          clearInterval(countdownTimer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, []);

  // Format time with leading zeros
  const formatTime = (value: number) => {
    return value.toString().padStart(2, '0');
  };

  // Sample weekend deals products
  const products: Product[] = [
    {
      id: 1,
      title: 'Piping nozzles for cake decoration',
      image: '/images/product1.jpg',
      price: 499.00,
      originalPrice: 699.00,
      discount: 30,
      freeShipping: true,
      category: 'Nozzles and Piping bags'
    },
    {
      id: 2,
      title: 'Professional kitchen knife set',
      image: '/images/product2.jpg',
      price: 2499.00,
      originalPrice: 3299.00,
      discount: 25,
      freeShipping: true,
      category: 'Baking Tools'
    },
    {
      id: 3,
      title: 'Non-stick frying pan',
      image: '/images/product3.jpg',
      price: 699.00,
      originalPrice: 899.00,
      discount: 22,
      freeShipping: false,
      category: 'Baking Tools'
    },
    {
      id: 4,
      title: 'Electric hand mixer',
      image: '/images/product4.jpg',
      price: 1199.00,
      originalPrice: 1599.00,
      discount: 25,
      freeShipping: true,
      category: 'Baking Tools'
    },
    {
      id: 5,
      title: 'Silicone baking mat set',
      image: '/images/product5.jpg',
      price: 399.00,
      originalPrice: 599.00,
      discount: 33,
      freeShipping: true,
      category: 'Baking Accessories'
    },
    {
      id: 6,
      title: 'Digital kitchen scale',
      image: '/images/product6.jpg',
      price: 599.00,
      originalPrice: 799.00,
      discount: 25,
      freeShipping: false,
      category: 'Measuring Tools'
    },
    {
      id: 7,
      title: 'Cake decorating turntable',
      image: '/images/product1.jpg',
      price: 899.00,
      originalPrice: 1299.00,
      discount: 30,
      freeShipping: true,
      category: 'Cake Decorating Kits'
    },
    {
      id: 8,
      title: 'Fondant rolling pin',
      image: '/images/product2.jpg',
      price: 349.00,
      originalPrice: 499.00,
      discount: 30,
      freeShipping: true,
      category: 'Fondants and Tools'
    },
  ];

  return (
    <div className="flex flex-col bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Page Header with Countdown */}
        <div className="bg-linear-to-r from-black to-gray-800 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <div className="w-2 h-16 bg-primary rounded-full mr-4 hidden md:block"></div>
              <div>
                <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-2">Weekend Flash Deals</h1>
                <p className="text-gray-300 text-lg">Limited time offers on our best products</p>
              </div>
            </div>

            <div className="flex items-center bg-black/30 rounded-full px-4 py-3 mt-4 md:mt-0">
              <Clock className="h-6 w-6 text-primary mr-2" />
              <span className="text-white font-medium mr-2">Ends in:</span>
              <div className="flex items-center space-x-1">
                <div className="bg-primary text-white font-bold rounded px-3 py-2 text-lg">
                  {formatTime(timeLeft.hours)}
                </div>
                <span className="text-white">:</span>
                <div className="bg-primary text-white font-bold rounded px-3 py-2 text-lg">
                  {formatTime(timeLeft.minutes)}
                </div>
                <span className="text-white">:</span>
                <div className="bg-primary text-white font-bold rounded px-3 py-2 text-lg">
                  {formatTime(timeLeft.seconds)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className="block h-full"
            >
              <article
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 h-full cursor-pointer"
              >
                {/* Product Image with Discount Badge */}
                <figure className="relative aspect-square">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                    {product.discount}% OFF
                  </div>
                </figure>

                {/* Product Details */}
                <div className="p-3 flex flex-col grow">
                  <div className="text-xs text-gray-600 mb-1">{product.category}</div>
                  <h3 className="text-sm font-extrabold mb-1 line-clamp-2 text-black text-black!" style={{ color: 'black' }} title={product.title}>
                    {product.title}
                  </h3>

                  {product.freeShipping && (
                    <span className="text-[10px] text-green-600 font-medium mb-1">Free Shipping</span>
                  )}

                  <div className="mt-auto flex items-center">
                    <span className="text-sm font-extrabold text-black text-black!" style={{ color: 'black' }}>৳{product.price.toFixed(2)}</span>
                    <span className="ml-2 text-xs text-gray-500 line-through">৳{product.originalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
