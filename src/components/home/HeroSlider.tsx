"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    image: "/images/hero1.jpg",
    alt: "First slide",
    title: "Welcome to NanuBhai",
    subtitle: "Discover amazing products",
  },
  {
    id: 2,
    image: "/images/hero2.jpg",
    alt: "Second slide",
    title: "New Arrivals",
    subtitle: "Check out our latest collection",
  },
  {
    id: 3,
    image: "/images/hero3.jpg",
    alt: "Third slide",
    title: "Special Offers",
    subtitle: "Limited time deals",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-2xl shadow-lg mx-auto my-6 max-w-[95%]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            {/* Use Next.js Image component for optimized images */}
            <Image
              src={slide?.image}
              alt={slide?.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />

            {/* Overlay with text */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent flex flex-col items-center justify-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                {slide?.title}
              </h2>
              <p className="text-lg md:text-xl text-white">{slide?.subtitle}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Indicator dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white w-6" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
