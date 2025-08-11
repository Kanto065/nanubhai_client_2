const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const getSingleCategory = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/category/${id}`, {
      cache: "no-store", // or 'force-cache'
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to fetch products");

    return result;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
};
