import ProductDetailCard from "@/components/products/ProductDetailCard";
import { getSingleProduct } from "@/services/productApi";

type Params = Promise<{ id: string }>;
export default async function ProductPage({ params }: { params: Params }) {
  const { id } = await params;

  try {
    const resData = await getSingleProduct(id);
    const { product } = resData;

    return (
      <div className="flex flex-col bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <ProductDetailCard product={product} />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="text-red-600">
        Error loading data: {(error as Error).message}
      </div>
    );
  }
}
