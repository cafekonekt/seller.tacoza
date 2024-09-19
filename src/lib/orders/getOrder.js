"use server";
import { getSession, logout } from "@/lib/auth/session";
import { apiGet } from "@/handlers/apiHandler";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";

export async function getOrder(order_id) {
  const user = await getSession();
  const response = await apiGet(`/api/shop/order/${order_id}`, {
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

export async function getOrders() {
  const user = await getSession();
  const response = await apiGet("/api/shop/orders", {
    headers: {
      Authorization: `Bearer ${user?.tokens?.access}`,
      cache: "no-store",
    },
  });
  if (response.status === 404) return notFound();
  if (response.status === 401) {
    logout();
    redirect('/login');
  }
  return response;
}
