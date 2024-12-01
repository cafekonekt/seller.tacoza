"use server";
import { getSession } from "@/lib/auth/session";
import { apiPost } from "@/handlers/apiHandler";
import { catchError } from "@/app/utils/catchError";

export async function addItem(item) {
  const user = await getSession();
  const [error, response] = await catchError(
    apiPost("/api/shop/food-items/", item, {
      headers: {
        Authorization: `Bearer ${user?.tokens?.access}`,
      },
    }),
  );
  return [error, response];
}
