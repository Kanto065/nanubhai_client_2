// Common response type for API responses
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: Error | unknown;
}

// Common props for list items
export interface ListItemProps {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  onClick?: () => void;
  selected?: boolean;
}

// Product related types
export interface ProductBase {
  _id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  rating?: number;
  stock?: number;
}

// Category related types
export interface CategoryBase {
  _id: string;
  name: string;
  image: string;
  description?: string;
  slug: string;
  parentId?: string;
}

// Slide type for banners and carousels
export interface Slide {
  id: string;
  image: string;
  title?: string;
  description?: string;
  link?: string;
}
