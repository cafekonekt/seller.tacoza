"use server";
import { getSession, logout } from "@/lib/auth/session";
import { apiGet } from "@/handlers/apiHandler";
import { notFound, redirect } from "next/navigation";

export async function getMenu() {
  const user = await getSession();
  try {
    const response = await apiGet("/api/shop/food-items/", {
      headers: {
        Authorization: `Bearer ${user?.tokens?.access}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}