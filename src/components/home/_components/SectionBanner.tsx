"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Slide {
  id: number;
  image: string;
  alt: string;
  title: string;
  subtitle: string;
}

export default function SectionBanner({ slides }: { slides: Slide[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[200px] md:h-[300px] overflow-hidden rounded-2xl shadow-lg mx-auto mb-8 max-w-[95%]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent flex flex-col items-center justify-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl text-white">{slide.subtitle}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
