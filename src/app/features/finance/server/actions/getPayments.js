"use server";
import { getSession } from "@/lib/auth/session";
import { apiGet } from "@/handlers/apiHandler";
import { catchError } from "@/app/utils/catchError";

export async function getPayments() {
  const user = await getSession();
  const [error, response] = await catchError(
    apiGet("/api/shop/get-payments/90", {
      headers: {
        Authorization: `Bearer ${user?.tokens?.access}`,
      },
    }),
  );
  return [error, response];
}
