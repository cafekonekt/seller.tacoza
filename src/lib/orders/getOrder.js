"use server";
import { getSession } from "@/lib/auth/session";
import { apiGet } from "@/handlers/apiHandler";
import { notFound } from "next/navigation";

export async function getOrder(order_id) {
  const user = await getSession();
  const response = await apiGet(`/api/shop/order/${order_id}`, {
    headers: {
      Authorization: `Bearer ${user?.tokens?.access}`,
      cache: "no-store",
    },
  });
  if (!response) notFound();
  return response;
}

export async function getOrders() {
  const user = await getSession();
  const response = await apiGet("/api/shop/orders", {
    headers: {
      Authorization: `Bearer ${user?.tokens?.access}`,
      cache: "no-store",
    },
  });
  return response;
}
