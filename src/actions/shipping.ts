"use server";

import {
  createShippingAddressApi,
  updateShippingAddressApi,
} from "@/services/shippingAddressApi";
import { revalidateTag } from "next/cache";
import { ShippingAddressSchemaType, shippingAddressSchema } from "@/validation/shipping.dto";

export async function createShippingAddressAction(data: ShippingAddressSchemaType) {
  try {
    const parsed = shippingAddressSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        fieldErrors: parsed.error.flatten().fieldErrors,
      };
    }

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
export async function updateShippingAddressAction(id: string, data: ShippingAddressSchemaType) {
  try {
    const parsed = shippingAddressSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        fieldErrors: parsed.error.flatten().fieldErrors,
      };
    }

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
