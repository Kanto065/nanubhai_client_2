"use client";

import { CreditCard, Truck } from "lucide-react";
import React from "react";

interface PaymentMethodIconProps {
  method: "cod" | "card" | "bkash";
  size?: "sm" | "md" | "lg";
}

const PaymentMethodIcon: React.FC<PaymentMethodIconProps> = ({
  method,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  const renderIcon = () => {
    switch (method) {
      case "cod":
        return (
          <div className="flex items-center">
            <Truck
              className={`${sizeClasses[size]} text-black mr-2`}
              style={{ color: "black" }}
            />
            <div className="flex flex-col">
              <span className="font-bold text-black">CASH</span>
              <span className="text-xs text-black">ON DELIVERY</span>
            </div>
          </div>
        );
      case "card":
        return (
          <div className="flex items-center space-x-2">
            <CreditCard
              className={`${sizeClasses[size]} text-black`}
              style={{ color: "black" }}
            />
            <span className="font-bold text-black">VISA</span>
            <span className="font-bold text-black">MASTER</span>
            <span className="font-bold text-black">AMEX</span>
          </div>
        );
      case "bkash":
        return (
          <div className="flex items-center">
            <div className="relative h-6 w-6 mr-2">
              <div className="absolute inset-0 bg-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">b</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-black" style={{ color: "black" }}>
                bKash
              </span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return <div>{renderIcon()}</div>;
};

export default PaymentMethodIcon;
