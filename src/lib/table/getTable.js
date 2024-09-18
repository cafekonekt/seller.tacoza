import { getSession } from "@/lib/auth/session";
import { apiGet } from "@/handlers/apiHandler";
import { notFound } from "next/navigation";

export async function getTables() {
  const user = await getSession();
  const response = await apiGet("/api/shop/tables", {
    headers: {
      Authorization: `Bearer ${user?.tokens?.access}`,
      cache: "no-store",
    },
  });
  return response;
}
