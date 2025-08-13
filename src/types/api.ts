export interface CreateOrderData {
  phone?: string;
  shippingAddressId: string;
  totalAmount: number;
  discountAmount?: number;
  shippingAmount: number;
  paymentType: "cod" | "nagad" | "bkash" | "card";
  transactionId?: string;
}

export interface OrderApiResponse {
  success: boolean;
  message: string;
  order?: {
    _id: string;
    orderId: string;
    userId: string;
    shippingAddressId: string;
    totalAmount: number;
    discountAmount: number;
    shippingAmount: number;
    netAmount: number;
    status: string;
    paymentStatus: string;
    paymentType: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ShippingAddressApiResponse {
  success: boolean;
  message: string;
  shippingAddresses: Array<{
    _id: string;
    userId: string;
    street: string;
    city: string;
    postCode: number;
    country: string;
    createdAt: string;
    updatedAt: string;
  }>;
}
