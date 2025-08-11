"use server";
import { createOrderApi } from "@/services/orderApi";
import { OrderSchemaType } from "@/validation/order.dto";
import { revalidateTag } from "next/cache";

export async function createOrderAction(data: OrderSchemaType) {
  try {
    // const parsed = createOrderSchema.safeParse(data);

    // if (!parsed.success) {
    //   return {
    //     success: false,
    //     fieldErrors: parsed.error.flatten().fieldErrors,
    //   };
    // }

    // const response = await createOrderApi(parsed.data);
    const response = await createOrderApi(data);
    revalidateTag("Order");
    return {
      success: true,
      message: response?.message || "Order created successfully",
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
