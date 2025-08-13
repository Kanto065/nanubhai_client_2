import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function getCookie() {
  const cookieObj = (await cookies()).get(
    process.env.NEXT_PUBLIC_TOKEN_NAME || "nanubhai"
  );
  return cookieObj?.value;
}
import { CreateOrderData, OrderApiResponse } from "@/types/api";

export const createOrderApi = async (data: CreateOrderData): Promise<OrderApiResponse> => {
  const token = await getCookie();
  try {
    const res = await fetch(`${BASE_URL}/api/order/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Create order failed");
    }

    return result;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
};
export const getMyOrdersApi = async () => {
  const token = await getCookie();
  try {
    const res = await fetch(`${BASE_URL}/api/order/myorder`, {
      cache: "no-store", // or 'force-cache',
      next: { tags: ["Order"] },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to fetch orders");

    return result;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
};
