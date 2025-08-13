import { cookies } from "next/headers";
import { ShippingAddressApiResponse } from "@/types/api";
import { ShippingAddress } from "@/types/order";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function getCookie() {
  const cookieObj = (await cookies()).get(
    process.env.NEXT_PUBLIC_TOKEN_NAME || "nanubhai"
  );
  return cookieObj?.value;
}

export const getAllShippingAddressApi = async (): Promise<ShippingAddressApiResponse> => {
  const token = await getCookie();
  try {
    const res = await fetch(`${BASE_URL}/api/shipping-address/all`, {
      cache: "no-store", // or 'force-cache',
      next: { tags: ["ShippingAddress"] },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    const result = await res.json();
    if (!res.ok)
      throw new Error(result.message || "Failed to fetch shipping address");

    return result;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
};

export async function createShippingAddressApi(data: Omit<ShippingAddress, "_id" | "userId" | "createdAt" | "updatedAt">) {
  const token = await getCookie();

  try {
    const res = await fetch(`${BASE_URL}/api/shipping-address/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Create shipping address failed");
    }

    return result;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
}

export async function updateShippingAddressApi(id: string, data: {
  street: string;
  city: string;
  postCode: number;
  country: string;
}) {
  const token = await getCookie();

  try {
    const res = await fetch(`${BASE_URL}/api/shipping-address/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Update shipping address failed");
    }

    return result;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
}
