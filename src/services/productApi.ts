const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProducts = async (type?: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/product/all?type=${type || ""}`, {
      cache: "no-store", // or 'force-cache'
    });

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

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

export const getSingleProduct = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/product/${id}`, {
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
