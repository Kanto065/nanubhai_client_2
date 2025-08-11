import HeroSlider from "@/components/home/HeroSlider";
import CategoryGrid from "@/components/home/CategoryGrid";
import BestSellingProduct from "@/components/home/BestSellingProduct";
import NewArriveProducts from "@/components/home/NewArriveProducts";
import TopRatedProducts from "@/components/home/TopRatedProducts";
import WeekendDeals from "@/components/home/WeekendDeals";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default async function Home() {
  return (
    <div className="flex flex-col bg-gray-50">
      <WeekendDeals />
      <HeroSlider />
      <div className="max-w-7xl mx-auto w-full px-2 sm:px-4 py-4 md:py-6">
        <CategoryGrid />
      </div>
      <div className="max-w-7xl mx-auto w-full">
        <BestSellingProduct />
      </div>
      <div className="max-w-7xl mx-auto w-full">
        <NewArriveProducts />
      </div>
      <div className="max-w-7xl mx-auto w-full">
        <FeaturedProducts />
      </div>
      <div className="max-w-7xl mx-auto w-full">
        <TopRatedProducts />
      </div>
    </div>
  );
}
