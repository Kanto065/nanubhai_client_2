import React from "react";
import UserDashboard from "@/app/profile/_components/UserDashboard";
import { getMyOrdersApi } from "@/services/orderApi";

export default async function ProfilePage() {
  let orders = [];
  try {
    const result = await getMyOrdersApi();
    orders = result?.orders;
  } catch (error) {
    // Log or ignore unauthorized error, but don't block rendering
    console.error("Orders fetch failed:", error);
  }

  return <UserDashboard orders={orders} />;
}
