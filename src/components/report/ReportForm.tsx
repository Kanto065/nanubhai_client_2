"use client";

import React, { useState } from "react";
import { AlertCircle, Upload, Check } from "lucide-react";

// Issue types for the report form
const issueTypes = [
  { id: "product_defect", label: "Product Defect" },
  { id: "shipping_damage", label: "Shipping Damage" },
  { id: "wrong_item", label: "Wrong Item Received" },
  { id: "missing_parts", label: "Missing Parts" },
  { id: "not_as_described", label: "Not As Described" },
  { id: "delivery_issue", label: "Delivery Issue" },
  { id: "other", label: "Other Issue" },
];

// Sample products for the dropdown
const sampleProducts = [
  { id: 1, name: "Piping nozzles for cake decoration" },
  { id: 2, name: "Professional kitchen knife set" },
  { id: 3, name: "Non-stick frying pan" },
  { id: 4, name: "Electric hand mixer" },
  { id: 5, name: "Silicone baking mat set" },
  { id: 6, name: "Digital kitchen scale" },
  { id: 7, name: "Stainless steel mixing bowls" },
  { id: 8, name: "Ceramic dinner plate set" },
];

const ReportForm = () => {
  const [formData, setFormData] = useState({
    orderNumber: "",
    productId: "",
    issueType: "",
    description: "",
    name: "",
    email: "",
    phone: "",
  });

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
    if (!formData.issueType)
      newErrors.issueType = "Please select an issue type";
    if (!formData.description)
      newErrors.description = "Please describe the issue";
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
        orderNumber: "",
        productId: "",
        issueType: "",
        description: "",
        name: "",
        email: "",
        phone: "",
      });
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
            Report Submitted Successfully
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            Thank you for bringing this to our attention. We&apos;ve received
            your report and will review it promptly.
          </p>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            A confirmation has been sent to your email address. Our customer
            service team will contact you within 24-48 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Order Information */}
        <div>
          <h2
            className="text-xl font-semibold text-black text-black! mb-4"
            style={{ color: "black" }}
          >
            Order Information
          </h2>

          <div className="mb-4">
            <label
              htmlFor="orderNumber"
              className="block text-sm font-medium text-black text-black! mb-1"
              style={{ color: "black" }}
            >
              Order Number (optional)
            </label>
            <input
              type="text"
              id="orderNumber"
              name="orderNumber"
              value={formData.orderNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black text-black!"
              style={{ color: "black" }}
              placeholder="e.g., ORD-12345"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="productId"
              className="block text-sm font-medium text-black text-black! mb-1"
              style={{ color: "black" }}
            >
              Product <span className="text-red-500">*</span>
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
        </div>

        {/* Issue Details */}
        <div>
          <h2
            className="text-xl font-semibold text-black text-black! mb-4"
            style={{ color: "black" }}
          >
            Issue Details
          </h2>

          <div className="mb-4">
            <label
              htmlFor="issueType"
              className="block text-sm font-medium text-black text-black! mb-1"
              style={{ color: "black" }}
            >
              Issue Type <span className="text-red-500">*</span>
            </label>
            <select
              id="issueType"
              name="issueType"
              value={formData.issueType}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.issueType ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black text-black!`}
              style={{ color: "black" }}
            >
              <option value="">Select issue type</option>
              {issueTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.issueType && (
              <p className="mt-1 text-sm text-red-600">{errors.issueType}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-black text-black! mb-1"
              style={{ color: "black" }}
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full px-3 py-2 border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-black text-black!`}
              style={{ color: "black" }}
              placeholder="Please describe the issue in detail..."
            ></textarea>
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-black text-black! mb-1"
              style={{ color: "black" }}
            >
              Attachments (optional)
            </label>
            <div className="mt-1 flex justify-center px-3 sm:px-6 pt-4 pb-5 sm:pt-5 sm:pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none"
                  >
                    <span>Upload files</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      multiple
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>

            {files.length > 0 && (
              <div className="mt-4">
                <h4
                  className="text-sm font-medium text-black text-black! mb-2"
                  style={{ color: "black" }}
                >
                  Uploaded Files:
                </h4>
                <ul className="space-y-2">
                  {files.map((file, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md"
                    >
                      <span className="text-sm truncate max-w-xs">
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h2
            className="text-xl font-semibold text-black text-black! mb-4"
            style={{ color: "black" }}
          >
            Contact Information
          </h2>

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

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            <AlertCircle className="inline-block w-4 h-4 mr-1" />
            We take all reports seriously and will respond within 24-48 hours.
          </p>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;
