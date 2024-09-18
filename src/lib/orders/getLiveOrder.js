"use server";
import { getSession } from "@/lib/auth/session";
import { apiGet, apiPut } from "@/handlers/apiHandler";

export async function getOrders() {
  const user = await getSession();
  const response = await apiGet("/api/shop/live-orders", {
    headers: {
      Authorization: `Bearer ${user?.tokens?.access}`,
      cache: "no-store",
    },
  });
  return response;
}

export async function updateOrderStatus(orderId, status) {
  const user = await getSession();
  if (!user) {
    return;
  }
  const response = await apiPut(
    `/api/shop/live-orders/${orderId}/`,
    {
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${user?.tokens?.access}`,
      },
    },
  );
  return response;
}
