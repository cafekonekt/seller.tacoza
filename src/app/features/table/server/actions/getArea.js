"use server";
import { getSession, logout } from "@/lib/auth/session";
import { apiGet } from "@/handlers/apiHandler";
import { catchError } from "@/app/utils/catchError";

export async function getArea() {
  const user = await getSession();
  const [error, response] = await catchError(
    apiGet("/api/shop/area", {
      headers: {
        Authorization: `Bearer ${user?.tokens?.access}`,
        cache: "no-store",
      },
    }),
  );
  return [error, response];
}
