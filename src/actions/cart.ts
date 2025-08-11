"use server";

import {
  addToCartApi,
  changeQuantityCartApi,
  deleteCartApi,
} from "@/services/cartApi";
import {
  addToCartSchema,
  AddToCartSchemaType,
  changeCartQuantitySchema,
  ChangeCartQuantitySchemaType,
} from "@/validation/cart.dto";
import { revalidateTag } from "next/cache";

export async function addToCartAction(data: AddToCartSchemaType) {
  try {
    const parsed = addToCartSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        fieldErrors: parsed.error.flatten().fieldErrors,
      };
    }

    const response = await addToCartApi(parsed.data);
    revalidateTag("cart"); // Refresh tagged fetch

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
export async function changeCartQuantiyAction(
  data: ChangeCartQuantitySchemaType
) {
  try {
    const parsed = changeCartQuantitySchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        fieldErrors: parsed.error.flatten().fieldErrors,
      };
    }

    const response = await changeQuantityCartApi(parsed.data);
    revalidateTag("cart"); // Refresh tagged fetch

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
export async function deleteCartAction(id: string) {
  try {
    const response = await deleteCartApi(id);
    revalidateTag("cart"); // Refresh tagged fetch

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
