"use server";
import { getSession, logout } from "@/lib/auth/session";
import { apiGet } from "@/handlers/apiHandler";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import { subDays, format } from "date-fns";
import { catchError } from "@/app/utils/catchError";

export async function getOrder(order_id) {
  const user = await getSession();
  const [error, response] = await catchError(
    apiGet(`/api/shop/order/${order_id}`, {
      headers: {
        Authorization: `Bearer ${user?.tokens?.access}`,
        cache: "no-store",
      },
    }),
  );
  return [error, response];
}

export async function getOrders(range) {
  if (Object.keys(range).length === 0) {
    range = {
      from: format(subDays(new Date(), 7), "yyyy-MM-dd"),
      to: format(new Date(), "yyyy-MM-dd"),
    };
  }
  const user = await getSession();
  const [error, response] = await catchError(
    apiGet(`/api/shop/orders?start_date=${range.from}&end_date=${range.to}`, {
      headers: {
        Authorization: `Bearer ${user?.tokens?.access}`,
        cache: "no-store",
      },
    }),
  );
  return [error, response];
}
