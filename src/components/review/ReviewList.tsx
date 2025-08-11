"use client";

import React, { useState } from "react";
import { Star, ThumbsUp, User } from "lucide-react";
import Image from "next/image";

// Sample products for reference
const sampleProducts = [
  { id: 1, name: "Piping nozzles for cake decoration" },
  { id: 2, name: "Professional kitchen knife set" },
  { id: 3, name: "Non-stick frying pan" },
  { id: 4, name: "Electric hand mixer" },
  { id: 5, name: "Silicone baking mat set" },
  { id: 6, name: "Digital kitchen scale" },
];

// Sample existing reviews
const sampleReviews = [
  {
    id: 1,
    productId: 1,
    userName: "Sarah Johnson",
    rating: 5,
    title: "Perfect for cake decorating!",
    review:
      "These piping nozzles are amazing! The variety of tips allows for so many different designs. The quality is excellent and they are easy to clean. Highly recommend for any home baker!",
    pros: "Durable, easy to clean, great variety",
    cons: "Storage case could be better",
    date: "2023-11-15",
    helpful: 24,
    images: ["/images/product1.jpg"],
    verified: true,
  },
  {
    id: 2,
    productId: 2,
    userName: "Michael Chen",
    rating: 4,
    title: "Great knife set for the price",
    review:
      "This knife set is excellent value for money. The knives are sharp and handle well. The block is attractive on the counter. Only giving 4 stars because one of the steak knives had a small nick in the blade.",
    pros: "Sharp, good grip, attractive block",
    cons: "Quality control could be better",
    date: "2023-10-28",
    helpful: 18,
    images: [],
    verified: true,
  },
  {
    id: 3,
    productId: 3,
    userName: "Emily Rodriguez",
    rating: 5,
    title: "Best non-stick pan I have ever used",
    review:
      "This pan is incredible! I have been using it daily for 3 months and it still looks brand new. Nothing sticks to it and cleanup is a breeze. The handle stays cool and it heats evenly.",
    pros: "Truly non-stick, easy cleaning, even heating",
    cons: "None so far",
    date: "2023-12-05",
    helpful: 32,
    images: ["/images/product3.jpg", "/images/product4.jpg"],
    verified: true,
  },
];

interface ReviewCardProps {
  review: (typeof sampleReviews)[0];
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);
  const [voted, setVoted] = useState(false);

  const handleHelpfulClick = () => {
    if (!voted) {
      setHelpfulCount((prev) => prev + 1);
      setVoted(true);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center">
          <div className="bg-gray-100 rounded-full p-1.5 sm:p-2 mr-2 sm:mr-3">
            <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
          </div>
          <div>
            <p
              className="font-medium text-black  text-sm sm:text-base"
              style={{ color: "black" }}
            >
              {review.userName}
            </p>
            <div className="flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 sm:w-4 sm:h-4 ${
                      i < review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              {review.verified && (
                <span className="ml-1 sm:ml-2 text-[10px] sm:text-xs bg-green-100 text-green-800 px-1.5 sm:px-2 py-0.5 rounded-full">
                  Verified Purchase
                </span>
              )}
            </div>
          </div>
        </div>
        <span className="text-xs sm:text-sm text-gray-500">{review.date}</span>
      </div>

      <h3
        className="font-bold text-base sm:text-lg text-black mb-1 sm:mb-2"
        style={{ color: "black" }}
      >
        {review.title}
      </h3>
      <p
        className="text-sm sm:text-base text-gray-700 text-gray-700! mb-2 sm:mb-3"
        style={{ color: "#374151" }}
      >
        {review.review}
      </p>

      {(review.pros || review.cons) && (
        <div className="mb-2 sm:mb-3 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {review.pros && (
            <div className="bg-green-50 p-2 sm:p-3 rounded-md">
              <p
                className="font-medium text-green-800 text-green-800! text-sm mb-0.5 sm:mb-1"
                style={{ color: "#065f46" }}
              >
                Pros:
              </p>
              <p
                className="text-xs sm:text-sm text-green-700 text-green-700!"
                style={{ color: "#047857" }}
              >
                {review.pros}
              </p>
            </div>
          )}
          {review.cons && (
            <div className="bg-red-50 p-2 sm:p-3 rounded-md">
              <p
                className="font-medium text-red-800 text-red-800! text-sm mb-0.5 sm:mb-1"
                style={{ color: "#991b1b" }}
              >
                Cons:
              </p>
              <p
                className="text-xs sm:text-sm text-red-700 text-red-700!"
                style={{ color: "#b91c1c" }}
              >
                {review.cons}
              </p>
            </div>
          )}
        </div>
      )}

      {review.images.length > 0 && (
        <div className="mb-2 sm:mb-3">
          <p
            className="font-medium text-black text-black! text-sm mb-1 sm:mb-2"
            style={{ color: "black" }}
          >
            Photos:
          </p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {review.images.map((image, index) => (
              <div
                key={index}
                className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-md overflow-hidden"
              >
                <Image
                  src={image}
                  width={400}
                  height={400}
                  alt={`Review image ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-200 gap-2 sm:gap-0">
        <div className="flex items-center">
          <button
            onClick={handleHelpfulClick}
            disabled={voted}
            className={`flex items-center text-xs sm:text-sm ${
              voted ? "text-gray-400" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span>Helpful ({helpfulCount})</span>
          </button>
        </div>
        <div className="text-xs sm:text-sm text-gray-500 truncate">
          Product: {sampleProducts.find((p) => p.id === review.productId)?.name}
        </div>
      </div>
    </div>
  );
};

const ReviewList = () => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <div className="mb-4 sm:mb-6">
        <h2
          className="text-lg sm:text-xl font-semibold text-black text-black! mb-3 sm:mb-4"
          style={{ color: "black" }}
        >
          Customer Reviews
        </h2>

        <div className="flex items-center mb-3 sm:mb-4">
          <div className="flex mr-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400"
              />
            ))}
          </div>
          <span
            className="text-base sm:text-lg font-medium text-black text-black!"
            style={{ color: "black" }}
          >
            4.7 out of 5
          </span>
        </div>

        <div
          className="text-xs sm:text-sm text-gray-700 text-gray-700! mb-4 sm:mb-6"
          style={{ color: "#374151" }}
        >
          Based on {sampleReviews.length} reviews
        </div>

        <div className="space-y-4">
          {sampleReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
