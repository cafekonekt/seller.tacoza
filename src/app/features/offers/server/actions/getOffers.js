"use server";
import { getSession } from "@/lib/auth/session";
import { catchError } from "@/app/utils/catchError";
import { apiGet } from "@/handlers/apiHandler";

export async function getOffers(formData) {
  const user = await getSession();
  const [error, request] = await catchError(
    apiGet("/api/shop/discount-coupons", {
      headers: { Authorization: `Bearer ${user?.tokens?.access}` },
    }),
  );
  return [error, request];
}
