"use server";
import { getSession } from "@/lib/auth/session";
import { apiPost } from "@/handlers/apiHandler";
import { revalidatePath } from "next/cache";

export async function createArea(formData) {
  const user = await getSession();

  const response = await apiPost("/api/shop/area/", formData, {
    headers: {
      Authorization: `Bearer ${user?.tokens?.access}`,
    },
  });
  if (response.status === 404 || response.status === 401){
    return { message: "Error Creating Area", status: "destructive" };
  }
  revalidatePath("/table");
  return { message: "Area created successfully", status: "success" };
}
