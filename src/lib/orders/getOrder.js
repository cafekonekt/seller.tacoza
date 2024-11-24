"use server";
import { getSession, logout } from "@/lib/auth/session";
import { apiGet } from "@/handlers/apiHandler";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import { subDays } from "date-fns";

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

export async function getOrders(range) {
  if (Object.keys(range).length === 0) {
    range = {
      from: subDays(new Date(), 7),
      to: new Date().toLocaleDateString(),
    };
  }

  const user = await getSession();
  const response = await apiGet(`/api/shop/orders?start_date=${range.from}&end_date=${range.to}`, {
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

export async function getOrderByDate(date) {
  const user = await getSession();
  const response = await apiGet(`/api/shop/orders?date=${date}`, {
    headers: {
      Authorization: `Bearer ${user?.tokens?.access}`,
    },
  });
  if (response.status === 404) return notFound();
  if (response.status === 401) {
    logout();
    redirect('/login');
  }
  return response;
}