"use client";

import React, { useState } from "react";
import { Star, Upload, Check } from "lucide-react";
import Image from "next/image";

// Sample products for the dropdown
const sampleProducts = [
  { id: 1, name: "Piping nozzles for cake decoration" },
  { id: 2, name: "Professional kitchen knife set" },
  { id: 3, name: "Non-stick frying pan" },
  { id: 4, name: "Electric hand mixer" },
  { id: 5, name: "Silicone baking mat set" },
  { id: 6, name: "Digital kitchen scale" },
];

const StarRating = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (rating: number) => void;
}) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          className="focus:outline-none transition-transform hover:scale-110"
        >
          <Star
            className={`w-6 h-6 sm:w-8 sm:h-8 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
      <span className="ml-2 text-xs sm:text-sm text-gray-600">
        {rating > 0
          ? `${rating} star${rating > 1 ? "s" : ""}`
          : "Select rating"}
      </span>
    </div>
  );
};

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    productId: "",
    title: "",
    review: "",
    pros: "",
    cons: "",
    name: "",
    email: "",
  });

  const [rating, setRating] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.productId) newErrors.productId = "Please select a product";
    if (rating === 0) newErrors.rating = "Please select a rating";
    if (!formData.title) newErrors.title = "Please enter a review title";
    if (!formData.review) newErrors.review = "Please enter your review";
    if (!formData.name) newErrors.name = "Please enter your name";
    if (!formData.email) newErrors.email = "Please enter your email";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form
      setFormData({
        productId: "",
        title: "",
        review: "",
        pros: "",
        cons: "",
        name: "",
        email: "",
      });
      setRating(0);
      setFiles([]);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-green-100 mb-3 sm:mb-4">
            <Check className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Review Submitted Successfully
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            Thank you for sharing your experience! Your review will be published
            after moderation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <label
            htmlFor="productId"
            className="block text-sm font-medium text-black text-black! mb-1"
            style={{ color: "black" }}
          >
            Select Product <span className="text-red-500">*</span>
          </label>
          <select
            id="productId"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.productId ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black text-black!`}
            style={{ color: "black" }}
          >
            <option value="">Select a product</option>
            {sampleProducts.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
          {errors.productId && (
            <p className="mt-1 text-sm text-red-600">{errors.productId}</p>
          )}
        </div>

        <div>
          <label
            className="block text-sm font-medium text-black text-black! mb-1"
            style={{ color: "black" }}
          >
            Rating <span className="text-red-500">*</span>
          </label>
          <StarRating rating={rating} setRating={setRating} />
          {errors.rating && (
            <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-black text-black! mb-1"
            style={{ color: "black" }}
          >
            Review Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black text-black!`}
            style={{ color: "black" }}
            placeholder="Summarize your experience"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="review"
            className="block text-sm font-medium text-black text-black! mb-1"
            style={{ color: "black" }}
          >
            Your Review <span className="text-red-500">*</span>
          </label>
          <textarea
            id="review"
            name="review"
            value={formData.review}
            onChange={handleChange}
            rows={4}
            className={`w-full px-3 py-2 border ${
              errors.review ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black text-black!`}
            style={{ color: "black" }}
            placeholder="What did you like or dislike? How was your experience with the product?"
          ></textarea>
          {errors.review && (
            <p className="mt-1 text-sm text-red-600">{errors.review}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="pros"
              className="block text-sm font-medium text-black text-black! mb-1"
              style={{ color: "black" }}
            >
              Pros (optional)
            </label>
            <input
              type="text"
              id="pros"
              name="pros"
              value={formData.pros}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black text-black!"
              style={{ color: "black" }}
              placeholder="What did you like?"
            />
          </div>

          <div>
            <label
              htmlFor="cons"
              className="block text-sm font-medium text-black text-black! mb-1"
              style={{ color: "black" }}
            >
              Cons (optional)
            </label>
            <input
              type="text"
              id="cons"
              name="cons"
              value={formData.cons}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black text-black!"
              style={{ color: "black" }}
              placeholder="What could be improved?"
            />
          </div>
        </div>

        <div>
          <label
            className="block text-sm font-medium text-black text-black! mb-1"
            style={{ color: "black" }}
          >
            Add Photos (optional)
          </label>
          <div className="mt-1 flex justify-center px-3 sm:px-6 pt-4 pb-5 sm:pt-5 sm:pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none"
                >
                  <span>Upload photos</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 5MB each
              </p>
            </div>
          </div>

          {files.length > 0 && (
            <div className="mt-4">
              <h4
                className="text-sm font-medium text-black text-black! mb-2"
                style={{ color: "black" }}
              >
                Uploaded Photos:
              </h4>
              <div className="flex flex-wrap gap-2">
                {files.map((file, index) => (
                  <div key={index} className="relative">
                    <div className="h-20 w-20 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        width={400}
                        height={400}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600"
                    >
                      <span className="sr-only">Remove</span>
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-black text-black! mb-1"
              style={{ color: "black" }}
            >
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black text-black!`}
              style={{ color: "black" }}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black text-black! mb-1"
              style={{ color: "black" }}
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black text-black!`}
              style={{ color: "black" }}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
