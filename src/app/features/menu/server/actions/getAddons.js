"use server";
import { getSession } from "@/lib/auth/session";
import { apiGet } from "@/handlers/apiHandler";
import { catchError } from "@/app/utils/catchError";

export async function getAddons() {
  const user = await getSession();
  const [error, response] = await catchError(
    apiGet("/api/shop/addon-categories", {
      headers: {
        Authorization: `Bearer ${user?.tokens?.access}`,
      },
    }),
  );
  return [error, response];
}
