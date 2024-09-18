"use server";
import { getSession } from "@/lib/auth/session";
import { apiGet } from "@/handlers/apiHandler";

export async function getMenu() {
  const user = await getSession();
  const response = await apiGet("/api/shop/menu", {
    headers: {
      Authorization: `Bearer ${user?.tokens?.access}`,
    },
  });
  return response;
}