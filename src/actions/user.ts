"use server";

import { loginApi, logoutApi, signupApi } from "@/services/authApi";
import {
  createUserSchema,
  CreateUserSchemaType,
  LoginSchemaType,
  loginUserSchema,
} from "@/validation/user.dto";
import { cookies } from "next/headers";

export async function signUpAction(data: CreateUserSchemaType) {
  try {
    const parsed = createUserSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        fieldErrors: parsed.error.flatten().fieldErrors,
      };
    }

    const response = await signupApi(parsed.data);
    return {
      success: true,
      message: response.message,
    };
  } catch (error: unknown) {
    let message = "An unknown error occurred.";
    if (error instanceof Error) {
      message = error.message;
    }
    return {
      success: false,
      message,
    };
  }
}
export async function loginAction(data: LoginSchemaType) {
  try {
    const parsed = loginUserSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        fieldErrors: parsed.error.flatten().fieldErrors,
      };
    }

    const response = await loginApi(parsed.data);
    (await cookies()).set({
      name: process.env.NEXT_PUBLIC_TOKEN_NAME || "nanubhai",
      value: response.access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 days
    });

    return {
      success: true,
      user: response.user,
    };
  } catch (error: unknown) {
    let message = "An unknown error occurred.";
    if (error instanceof Error) {
      message = error.message;
    }
    return {
      success: false,
      message,
    };
  }
}

export async function logoutAction() {
  try {
    await logoutApi();
    (await cookies()).delete(process.env.NEXT_PUBLIC_TOKEN_NAME || "nanubhai");
    return {
      success: true,
      message: "Logout successfull",
    };
  } catch (error: unknown) {
    let message = "An unknown error occurred.";
    if (error instanceof Error) {
      message = error.message;
    }
    return {
      success: false,
      message,
    };
  }
}
