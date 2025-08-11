import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BaseURL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://backend.nanuvaierrosonakothon.com";
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseURL,
    credentials: "include",
  }),
  tagTypes: ["Cart", "Shipping", "Order"],
  endpoints: () => ({}),
});
