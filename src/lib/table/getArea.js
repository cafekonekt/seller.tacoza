"use server"
import { getSession, logout } from "@/lib/auth/session";
import { apiGet } from "@/handlers/apiHandler";
import { notFound } from "next/navigation";

export async function getArea() {
  const user = await getSession();
  try {
    const response = await apiGet("/api/shop/area", {
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
