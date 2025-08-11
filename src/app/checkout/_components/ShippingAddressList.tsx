"use client";

import {
  createShippingAddressAction,
  updateShippingAddressAction,
} from "@/actions/shipping";
import { CircleX, PencilLine, Plus, Save } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type ShippingAddress = {
  _id: string;
  street: string;
  city: string;
  postCode: number;
  country: string;
};

type Props = {
  onSelect: (selected: string) => void;
  addresses: any;
};

export default function ShippingAddressList({ onSelect, addresses }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mode, setMode] = useState<"add" | "edit" | null>(null); // initially hidden

  const [shippingInfo, setShippingInfo] = useState({
    id: "",
    street: "",
    city: "",
    postCode: 0,
    country: "",
  });

  // Set first address as selected by default
  useEffect(() => {
    if (addresses?.length > 0) {
      const defaultAddress = addresses[0];
      setSelectedId(defaultAddress._id);
      onSelect(defaultAddress._id);
    }
  }, [addresses]);

  const handleSelect = (address: ShippingAddress) => {
    setSelectedId(address._id);
    onSelect(address._id);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: name === "postCode" ? parseInt(value) || 0 : value,
    }));
  };

  const handleAddNew = () => {
    setShippingInfo({
      id: "",
      street: "",
      city: "",
      postCode: 0,
      country: "",
    });
    setMode("add");
  };

  const handleEdit = (e: React.MouseEvent, address: ShippingAddress) => {
    e.preventDefault();
    e.stopPropagation();

    setShippingInfo({
      id: address._id,
      street: address.street,
      city: address.city,
      postCode: address.postCode,
      country: address.country,
    });
    setMode("edit");
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (
      !shippingInfo?.street ||
      !shippingInfo?.city ||
      !shippingInfo?.postCode ||
      !shippingInfo?.country
    ) {
      return toast.error("Shiping values are missing");
    }

    let result;
    if (mode === "add") {
      result = await createShippingAddressAction(shippingInfo);
    } else if (mode === "edit") {
      result = await updateShippingAddressAction(shippingInfo.id, shippingInfo);
    }

    toast.success(
      result?.message || mode === "add"
        ? "Shipping address added successfully"
        : "Shipping address updated successfully"
    );
    setMode(null); // Hide form
    setShippingInfo({
      id: "",
      street: "",
      city: "",
      postCode: 0,
      country: "",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-700!">Shipping Addresses</h2>
        <button
          onClick={handleAddNew}
          className="bg-gray-200 text-gray-700 hover:text-green-500 hover:bg-green-200 transition-colors cursor-pointer rounded-md p-1"
          title="Add"
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>

      <div className="space-y-4">
        {addresses?.length > 0 ? (
          addresses?.map((address: ShippingAddress) => (
            <label
              key={address._id}
              className={`flex items-start p-3 rounded-xl border relative transition cursor-pointer ${
                selectedId === address._id
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <input
                type="radio"
                name="shippingAddress"
                className="h-4 w-4 accent-blue-600 mt-1"
                checked={selectedId === address._id}
                onChange={() => handleSelect(address)}
              />
              <div className="ml-4 text-sm text-gray-800">
                <p className="font-medium">
                  {address.street}, {address.city}, {address.postCode},{" "}
                  {address.country}
                </p>
              </div>
              <button
                onClick={(e: React.MouseEvent) => handleEdit(e, address)}
                className="absolute top-2 right-2 bg-gray-200 text-gray-700 hover:text-blue-500 hover:bg-blue-200 transition-colors cursor-pointer rounded-md p-1"
                title="Edit"
              >
                <PencilLine className="h-6 w-6" />
              </button>
            </label>
          ))
        ) : (
          <p className="text-center text-gray-500">No address found</p>
        )}
      </div>

      {/* Shipping Info Form */}
      {mode && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-700!">
              {mode === "add" ? "Add New Address" : "Edit Address"}
            </h2>
            <div className="flex items-center gap-x-4">
              <button
                onClick={handleSave}
                className="bg-gray-200 text-gray-700 hover:text-green-500 hover:bg-green-200 transition-colors cursor-pointer rounded-md px-2 py-1 text-base"
                title="Save"
              >
                <Save className="h-6 w-6 inline-block mr-1" /> Save
              </button>
              <button
                onClick={() => setMode(null)}
                className="bg-gray-200 text-gray-700 hover:text-red-500 hover:bg-red-200 transition-colors cursor-pointer rounded-md px-2 py-1 text-base"
                title="Save"
              >
                <CircleX className="h-6 w-6 inline-block mr-1" /> Cancel
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="street"
                value={shippingInfo.street}
                onChange={handleInputChange}
                placeholder="Street Address"
                className="w-full p-3 rounded border border-gray-300 bg-white text-black"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="city"
                value={shippingInfo.city}
                onChange={handleInputChange}
                placeholder="City"
                className="w-full p-3 rounded border border-gray-300 bg-white text-black"
                required
              />
              <input
                type="number"
                name="postCode"
                value={shippingInfo.postCode}
                onChange={handleInputChange}
                required
                placeholder="Post Code"
                className="w-full p-3 rounded border border-gray-300 bg-white text-black"
              />
              <input
                type="text"
                name="country"
                value={shippingInfo.country}
                onChange={handleInputChange}
                required
                placeholder="Country"
                className="w-full p-3 rounded border border-gray-300 bg-white text-black"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
