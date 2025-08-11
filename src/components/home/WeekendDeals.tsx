"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

// Define the deal type
interface Deal {
  id: number;
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  discount: string;
  link: string;
}

// Sample deals data
const deals: Deal[] = [
  {
    id: 1,
    image: "/images/product1.jpg",
    alt: "Weekend Special - Piping Nozzles",
    title: "Weekend Special",
    subtitle: "Piping Nozzles Set",
    discount: "Up to 30% OFF",
    link: "/weekend-deals", // Link to Weekend Deals page
  },
  {
    id: 2,
    image: "/images/product2.jpg",
    alt: "Flash Sale - Kitchen Knife Set",
    title: "Flash Sale",
    subtitle: "Professional Kitchen Tools",
    discount: "Up to 25% OFF",
    link: "/weekend-deals", // Link to Weekend Deals page
  },
  {
    id: 3,
    image: "/images/product3.jpg",
    alt: "Limited Offer - Baking Essentials",
    title: "Limited Offer",
    subtitle: "Baking Essentials",
    discount: "Buy 1 Get 1 Free",
    link: "/weekend-deals", // Link to Weekend Deals page
  },
];

export default function WeekendDeals() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    hours: 72,
    minutes: 0,
    seconds: 0,
  });

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % deals.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Countdown timer functionality
  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const totalSeconds =
          prevTime.hours * 3600 + prevTime.minutes * 60 + prevTime.seconds - 1;

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
  const formatTime = useCallback((value: number) => {
    return value.toString().padStart(2, "0");
  }, []);

  // Navigate to previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + deals.length) % deals.length);
  };

  // Navigate to next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % deals.length);
  };

  return (
    <div className="bg-linear-to-r from-black to-gray-800 py-6 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Countdown */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="w-2 h-12 bg-primary rounded-full mr-3 hidden md:block"></div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 md:mb-0">
              Weekend Flash Deals
            </h2>
          </div>

          <div className="flex items-center bg-black/30 rounded-full px-4 py-2">
            <Clock className="h-5 w-5 text-primary mr-2" />
            <span className="text-white font-medium mr-2">Ends in:</span>
            <div className="flex items-center space-x-1">
              <div className="bg-primary text-white font-bold rounded px-2 py-1 text-sm">
                {formatTime(timeLeft.hours)}
              </div>
              <span className="text-white">:</span>
              <div className="bg-primary text-white font-bold rounded px-2 py-1 text-sm">
                {formatTime(timeLeft.minutes)}
              </div>
              <span className="text-white">:</span>
              <div className="bg-primary text-white font-bold rounded px-2 py-1 text-sm">
                {formatTime(timeLeft.seconds)}
              </div>
            </div>
          </div>
        </div>

        {/* Deals Slider */}
        <div className="relative overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {deals.map((deal) => (
              <Link
                href={deal.link}
                key={deal.id}
                className="min-w-full relative h-[200px] md:h-[300px] block"
              >
                <div className="relative w-full h-full overflow-hidden rounded-xl">
                  <Image
                    src={deal.image}
                    alt={deal.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 1200px"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-black/70 to-transparent flex flex-col justify-center px-8 md:px-12">
                    <span className="text-primary font-bold text-lg md:text-xl mb-1">
                      {deal.title}
                    </span>
                    <h3 className="text-white font-extrabold text-2xl md:text-4xl mb-2">
                      {deal.subtitle}
                    </h3>
                    <p className="text-white text-xl md:text-2xl font-bold">
                      {deal.discount}
                    </p>
                    <button className="mt-4 bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded-full w-max transition-all">
                      Shop Now
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition-all"
            aria-label="Previous deal"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition-all"
            aria-label="Next deal"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Indicator dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {deals.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-primary w-6" : "bg-white/50"
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to deal ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
