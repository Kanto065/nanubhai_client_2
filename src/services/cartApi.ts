import {
  AddToCartSchemaType,
  ChangeCartQuantitySchemaType,
} from "@/validation/cart.dto";
import { cookies } from "next/headers";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function getCookie() {
  const cookieObj = (await cookies()).get(
    process.env.NEXT_PUBLIC_TOKEN_NAME || "nanubhai"
  );
  return cookieObj?.value;
}
export async function getAllCartApi() {
  const token = await getCookie();
  try {
    const res = await fetch(`${BASE_URL}/api/cart/all`, {
      method: "GET",
      cache: "no-store", // always fetch fresh data
      next: { tags: ["cart"] },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to fetch cart");

    return result;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
}

export async function addToCartApi(data: AddToCartSchemaType) {
  const token = await getCookie();

  try {
    const res = await fetch(`${BASE_URL}/api/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Add to cart failed");
    }

    return result;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
}
export async function changeQuantityCartApi(
  data: ChangeCartQuantitySchemaType
) {
  const token = await getCookie();

  try {
    const res = await fetch(`${BASE_URL}/api/cart/change-quantity`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Change cart quantity failed");
    }

    return result;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
}
export async function deleteCartApi(id: string) {
  const token = await getCookie();

  try {
    const res = await fetch(`${BASE_URL}/api/cart/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to delete cart");
    }

    return result;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
}
