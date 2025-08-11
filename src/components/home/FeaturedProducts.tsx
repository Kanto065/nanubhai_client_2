import SectionHeader from "./_components/SectionHeader";
import SectionBanner from "./_components/SectionBanner";
import { getProducts } from "@/services/productApi";
import ProductCard from "../products/ProductCard";

// Hero slider data
const slides = [
  {
    id: 1,
    image: "/images/best_selling_hero_image.jpg",
    alt: "Best selling products",
    title: "Top Products of the Month",
    subtitle: "Discover our most popular items",
  },
  {
    id: 2,
    image: "/images/hero2.jpg",
    alt: "Best selling products",
    title: "Top Products of the Month",
    subtitle: "Discover our most popular items",
  },
];

export default async function FeaturedProducts() {
  try {
    const resData = await getProducts("featured");
    const { products } = resData;

    return (
      <section className="py-8 md:py-12">
        {/* Section Header */}
        <SectionHeader content="Featured Products" />

        {/* Hero Banner */}
        <SectionBanner slides={slides} />

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 px-2 sm:px-4">
          {products?.length > 0 &&
            products?.map((product: any, index: number) => (
              <ProductCard key={product?._id} product={product} index={index} />
            ))}
        </div>
      </section>
    );
  } catch (error) {
    return (
      <div className="text-red-600">
        Error loading data: {(error as Error).message}
      </div>
    );
  }
}
