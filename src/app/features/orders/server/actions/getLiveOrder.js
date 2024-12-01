"use server";
import { getSession, logout } from "@/lib/auth/session";
import { apiGet, apiPut } from "@/handlers/apiHandler";
import { catchError } from "@/app/utils/catchError";

export async function getOrders() {
  const user = await getSession();
  const [error, response] = await catchError(
    apiGet("/api/shop/live-orders", {
      headers: {
        Authorization: `Bearer ${user?.tokens?.access}`,
        cache: "no-store",
      },
    }),
  );
  return [error, response];
}

export async function updateOrderStatus(orderId, status) {
  const user = await getSession();
  const [error, response] = await catchError(
    apiPut(
      `/api/shop/live-orders/${orderId}/`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${user?.tokens?.access}`,
        },
      },
    ),
  );
  return [error, response];
}
