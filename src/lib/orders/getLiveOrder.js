"use server";
import { getSession, logout } from "@/lib/auth/session";
import { apiGet, apiPut } from "@/handlers/apiHandler";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function getOrders() {
  const user = await getSession();
  const response = await apiGet("/api/shop/live-orders", {
    headers: {
      Authorization: `Bearer ${user?.tokens?.access}`,
      cache: "no-store",
    },
  });
  if (response.status === 404) return notFound();
  if (response.status === 401) {
    logout();
    redirect("/login");
  }
  return response;
}

export async function updateOrderStatus(orderId, status) {
  const user = await getSession();
  try {
    const response = await apiPut(`/api/shop/live-orders/${orderId}/`, {
      status,
    }, {
      headers: {
        Authorization: `Bearer ${user?.tokens?.access}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error updating order status:", error);
    return null;
  } finally {
    revalidatePath("/orders");
  }
}
