export interface ProductImage {
  image: string;
  _id: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
  images?: ProductImage[];
  category: string;
  brand: string;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  isNewArrive: boolean;
  isBestSelling: boolean;
  isTopRated: boolean;
  isWeekendDeal: boolean;
  freeDelivery?: boolean;
  previousPrice?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  _id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  _id: string;
  userId: string;
  productId: string;
  products: Product[];
  firstImage?: {
    image: string;
    _id: string;
  };
  variant?: string;
  quantity: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}
