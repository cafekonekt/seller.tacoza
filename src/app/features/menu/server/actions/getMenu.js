"use server";
import { getSession, logout } from "@/lib/auth/session";
import { apiGet } from "@/handlers/apiHandler";
import { catchError } from "@/app/utils/catchError";

export async function getMenu() {
  const user = await getSession();
  const [error, response] = await catchError(
    apiGet("/api/shop/food-items/", {
      headers: {
        Authorization: `Bearer ${user?.tokens?.access}`,
      },
    }),
  );
  return [error, response];
}
