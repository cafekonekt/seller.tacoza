"use server";
import { getSession } from "@/lib/auth/session";
import { apiGet } from "@/handlers/apiHandler";

export async function getAddons() {
  const user = await getSession();
  const response = await apiGet("/api/shop/addons", {
    headers: {
      Authorization: `Bearer ${user?.tokens?.access}`,
    },
  });
  return response;
}