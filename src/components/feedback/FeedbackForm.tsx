"use client";

import React, { useState } from "react";
import { MessageSquare, Check } from "lucide-react";

// Feedback types
const feedbackTypes = [
  { id: "website_experience", label: "Website Experience" },
  { id: "product_suggestion", label: "Product Suggestion" },
  { id: "customer_service", label: "Customer Service" },
  { id: "shipping_delivery", label: "Shipping & Delivery" },
  { id: "feature_request", label: "Feature Request" },
  { id: "bug_report", label: "Bug Report" },
  { id: "other", label: "Other" },
];

interface SatisfactionRatingProps {
  rating: number;
  setRating: (rating: number) => void;
}

const SatisfactionRating: React.FC<SatisfactionRatingProps> = ({
  rating,
  setRating,
}) => {
  const ratings = [
    { value: 1, label: "Very Dissatisfied", emoji: "😠" },
    { value: 2, label: "Dissatisfied", emoji: "🙁" },
    { value: 3, label: "Neutral", emoji: "😐" },
    { value: 4, label: "Satisfied", emoji: "🙂" },
    { value: 5, label: "Very Satisfied", emoji: "😄" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        {ratings.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setRating(item.value)}
            className={`flex flex-col items-center p-1 sm:p-2 rounded-lg transition-all ${
              rating === item.value
                ? "bg-black text-white scale-110"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <span className="text-xl sm:text-2xl mb-0.5 sm:mb-1">
              {item.emoji}
            </span>
            <span className="text-[10px] sm:text-xs font-medium hidden sm:inline">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    feedbackType: "",
    subject: "",
    message: "",
    name: "",
    email: "",
    phone: "",
  });

  const [satisfaction, setSatisfaction] = useState(0);
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.feedbackType)
      newErrors.feedbackType = "Please select a feedback type";
    if (!formData.subject) newErrors.subject = "Please enter a subject";
    if (!formData.message) newErrors.message = "Please enter your feedback";
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
        feedbackType: "",
        subject: "",
        message: "",
        name: "",
        email: "",
        phone: "",
      });
      setSatisfaction(0);
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
            Thank You for Your Feedback!
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            We appreciate you taking the time to share your thoughts with us.
            Your feedback helps us improve our services.
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
            htmlFor="feedbackType"
            className="block text-sm font-medium text-black text-black! mb-1"
            style={{ color: "black" }}
          >
            Feedback Type <span className="text-red-500">*</span>
          </label>
          <select
            id="feedbackType"
            name="feedbackType"
            value={formData.feedbackType}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.feedbackType ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black text-black!`}
            style={{ color: "black" }}
          >
            <option value="">Select feedback type</option>
            {feedbackTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.feedbackType && (
            <p className="mt-1 text-sm text-red-600">{errors.feedbackType}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-black text-black! mb-1"
            style={{ color: "black" }}
          >
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.subject ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black text-black!`}
            style={{ color: "black" }}
            placeholder="Brief summary of your feedback"
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-black text-black! mb-1"
            style={{ color: "black" }}
          >
            Your Feedback <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={`w-full px-3 py-2 border ${
              errors.message ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black text-black!`}
            style={{ color: "black" }}
            placeholder="Please share your thoughts, suggestions, or concerns..."
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        <div>
          <label
            className="block text-sm font-medium text-black text-black! mb-3"
            style={{ color: "black" }}
          >
            How satisfied are you with our website/service?
          </label>
          <SatisfactionRating
            rating={satisfaction}
            setRating={setSatisfaction}
          />
        </div>

        <div className="pt-3 sm:pt-4 border-t border-gray-200">
          <h3
            className="text-base sm:text-lg font-medium text-black text-black! mb-3 sm:mb-4"
            style={{ color: "black" }}
          >
            Contact Information
          </h3>

          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-black text-black! mb-1"
                style={{ color: "black" }}
              >
                Name <span className="text-red-500">*</span>
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

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-black text-black! mb-1"
                style={{ color: "black" }}
              >
                Phone (optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black text-black!"
                style={{ color: "black" }}
              />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-500 flex items-center justify-center">
            <MessageSquare className="inline-block w-4 h-4 mr-1" />
            We read every piece of feedback and use it to improve our services
          </p>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
