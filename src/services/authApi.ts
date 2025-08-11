import { CreateUserSchemaType, LoginSchemaType } from "@/validation/user.dto";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
async function getCookie() {
  const cookieObj = (await cookies()).get(
    process.env.NEXT_PUBLIC_TOKEN_NAME || "nanubhai"
  );
  return cookieObj?.value;
}
export async function signupApi(data: CreateUserSchemaType) {
  try {
    const res = await fetch(`${BASE_URL}/api/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Registration failed");
    }

    return result;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
}
export async function loginApi(data: LoginSchemaType) {
  try {
    const res = await fetch(`${BASE_URL}/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Login failed");
    }

    return result;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
}
export async function googleLoginApi(credential: string) {
  try {
    const res = await fetch(`${BASE_URL}/api/user/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential }),
    });
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Login failed");
    }

    return result;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
}
export async function userProfileApi() {
  const token = await getCookie();
  try {
    const res = await fetch(`${BASE_URL}/api/user`, {
      method: "GET",
      cache: "no-store", // always fetch fresh data
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to fetch profile");

    return result.user;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
}
export async function logoutApi() {
  const token = await getCookie();
  try {
    const res = await fetch(`${BASE_URL}/api/user/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to logout");

    return result;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
}
