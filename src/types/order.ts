export type OrderStatus =
  | "placed" // Order has been placed by user
  | "processing" // Seller is preparing the order
  | "shipping" // Order is shipped and on the way
  | "delivered" // Order has been delivered to the customer
  | "cancelled" // Order was cancelled (by user or system)
  | "returned" // Customer has returned the order
  | "refunded"; // Money has been refunded

export type PaymentType = "cod" | "bard" | "bkasah" | "nagad";
export type PaymentStatus = "not_paid" | "paid";

export interface OrderItem {
  _id: number;
  orderId: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface ShippingAddress {
  _id: string;
  userId: string;
  street: string;
  city: string;
  postCode: number;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  _id: string;
  orderId: string;
  userId: string;
  shippingAddressId: string;
  totalAmount: number;
  discountAmount: number;
  grossAmount: number;
  shippingAmount: number;
  netAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentType: PaymentType;
  createdAt: Date;
  updatedAt: Date;
  orderitems: OrderItem[];
  shippingaddress: ShippingAddress[];
}
