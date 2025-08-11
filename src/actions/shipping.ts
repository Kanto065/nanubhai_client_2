"use server";

import {
  createShippingAddressApi,
  updateShippingAddressApi,
} from "@/services/shippingAddressApi";
import { revalidateTag } from "next/cache";

export async function createShippingAddressAction(data: any) {
  try {
    //    const parsed = addToCartSchema.safeParse(data);
    //    if (!parsed.success) {
    //      return {
    //        success: false,
    //        fieldErrors: parsed.error.flatten().fieldErrors,
    //      };
    //    }

    const response = await createShippingAddressApi(data);
    revalidateTag("ShippingAddress"); // Refresh tagged fetch

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
export async function updateShippingAddressAction(id: string, data: any) {
  try {
    //    const parsed = addToCartSchema.safeParse(data);
    //    if (!parsed.success) {
    //      return {
    //        success: false,
    //        fieldErrors: parsed.error.flatten().fieldErrors,
    //      };
    //    }

    const response = await updateShippingAddressApi(id, data);
    revalidateTag("ShippingAddress"); // Refresh tagged fetch

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
