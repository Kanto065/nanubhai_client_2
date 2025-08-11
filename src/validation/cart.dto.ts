import zod from "zod";

export const addToCartSchema = zod.object({
  productId: zod
    .string("Product id must be string")
    .trim()
    .nonempty("Product id is required!"),
  quantity: zod
    .number("Quantity must be number")
    .min(1, "Quantity must be at least 1"),
});

export const changeCartQuantitySchema = zod.object({
  productId: zod
    .string("Product id must be string")
    .trim()
    .nonempty("Product id is required!"),
  quantity: zod
    .number("Quantity must be number")
    .min(1, "Quantity must be at least 1"),
  type: zod.enum(["INC", "DEC"], "Invalid type"),
});

// Types
export type AddToCartSchemaType = zod.infer<typeof addToCartSchema>;
export type ChangeCartQuantitySchemaType = zod.infer<
  typeof changeCartQuantitySchema
>;
