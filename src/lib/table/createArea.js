"use server";
import { getSession } from "@/lib/auth/session";
import { apiPost } from "@/handlers/apiHandler";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

export async function createArea(prevState, formData) {
  const user = await getSession();

  const data = {
    name: formData.get("name"),
  };

  const response = await apiPost("/api/shop/area/", data, {
    headers: {
      Authorization: `Bearer ${user?.tokens?.access}`,
    },
  });
  if (!response) {
    return { message: "Error Creating Area", status: "destructive" };
  }
  revalidatePath("/table");
  return { message: "Area created successfully", status: "success" };
}
