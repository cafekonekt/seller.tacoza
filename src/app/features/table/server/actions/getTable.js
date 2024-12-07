import { getSession, logout } from "@/lib/auth/session";
import { apiGet } from "@/handlers/apiHandler";
import { notFound, redirect } from "next/navigation";
import { catchError } from "@/app/utils/catchError";

export async function getTables() {
  const user = await getSession();
  const [error, response] = await catchError(
    apiGet("/api/shop/tables", {
      headers: {
        Authorization: `Bearer ${user?.tokens?.access}`,
        cache: "no-store",
      },
    }),
  );
  return [error, response];
}
