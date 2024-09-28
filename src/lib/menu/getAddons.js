"use server";
import { getSession } from "@/lib/auth/session";
import { apiGet } from "@/handlers/apiHandler";

export async function getAddons() {
  const user = await getSession();
  try {
    const response = await apiGet("/api/shop/addon-categories", {
      headers: {
        Authorization: `Bearer ${user?.tokens?.access}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal Server Error" };
  }
}