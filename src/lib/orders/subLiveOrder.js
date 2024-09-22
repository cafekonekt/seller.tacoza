"use server"
import { getSession, logout } from "@/lib/auth/session";
import { apiGet } from "@/handlers/apiHandler";
import { notFound, redirect } from "next/navigation";

export async function getSubscriptionURL() {
  const user = await getSession();
  try {
    const response = await apiGet("/api/shop/subscription", {
      headers: {
        Authorization: `Bearer ${user?.tokens?.access}`,
        cache: "no-store",
      },
    });
    return response;
  } catch (error) {
    return null;
  }
}
