import zod from "zod";

export const createOrderSchema = zod.object({
  phone: zod
    .string("Phone number must be a string!")
    .regex(
      /^(01)[0-9]{9}$/,
      "Phone number must be 11 digits and start with 01!"
    )
    .optional(),
  shippingAddressId: zod
    .string("Shipping address must be string")
    .trim()
    .nonempty("Shipping address ID is required"),
  totalAmount: zod
    .number("Total amount must be number")
    .positive()
    .min(1, "Total amount is required"),
  discountAmount: zod.number("Discount amount must be number").optional(),
  shippingAmount: zod
    .number("Shipping amount must be number")
    .positive()
    .min(1, "Shipping amount is required"),
  paymentType: zod.enum(
    ["cod", "bkash", "nagad", "card"],
    "Invalid payment type"
  ),
  transactionId: zod.string("Transaction id must be string").trim().optional(),
});

export const changeOrderStatusSchema = zod.object({
  status: zod
    .enum(["placed", "processing", "shipping", "delivered"], "Invalid staus")
    .optional(),
  paymentStatus: zod
    .enum(["not_paid", "paid"], "Invalid payment status")
    .optional(),
});

// Types
export type OrderSchemaType = zod.infer<typeof createOrderSchema>;
