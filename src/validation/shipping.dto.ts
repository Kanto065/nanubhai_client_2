import { z } from "zod";

export const shippingAddressSchema = z.object({
  street: z.string().min(5, "Street address must be at least 5 characters"),
  city: z.string().min(2, "City name must be at least 2 characters"),
  postCode: z.number().min(1000, "Post code must be at least 4 digits"),
  country: z.string().min(2, "Country name must be at least 2 characters"),
});

export type ShippingAddressSchemaType = z.infer<typeof shippingAddressSchema>;
