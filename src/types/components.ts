import { Product } from "./product";

export interface ProductListProps {
  products: Product[];
  title: string;
  viewAllLink?: string;
  loading?: boolean;
}

export interface CategoryListProps {
  categories: {
    _id: string;
    name: string;
    image: string;
    description?: string;
    slug: string;
  }[];
  title: string;
  viewAllLink?: string;
  loading?: boolean;
}
