import CategoryProductList from "@/components/categories/CategoryProductList";
import { getSingleCategory } from "@/services/categoryApi";
type Params = Promise<{ id: string }>;

export default async function CategoryPage({ params }: { params: Params }) {
  const { id } = await params;
  try {
    const resData = await getSingleCategory(id);

    const { category } = resData;
    return (
      <div className="flex flex-col bg-gray-50">
        <div className="max-w-7xl mx-auto w-full px-2 sm:px-4 py-4 md:py-6">
          <CategoryProductList id={id} categoryName={category?.name} />
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

{
  /* <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-64 bg-gray-200 rounded"></div>
              </div> */
}
