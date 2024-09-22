"use server";
import { getSession } from "@/lib/auth/session";
import { apiPost } from "@/handlers/apiHandler";
import { revalidatePath } from "next/cache";

export async function createTable(prevState, formData) {
  const user = await getSession();

  const data = {
    name: formData.get("name"),
    capacity: formData.get("capacity"),
    area: formData.get("area"),
  };
  try {
    const response = await apiPost("/api/shop/tables/", data, {
      headers: {
        Authorization: `Bearer ${user?.tokens?.access}`,
      },
    });
    if (response.status === 404 || response.status === 401 || response.status === 400 || response.status === 500) {
      return { message: "Error Creating Table", status: "destructive" };
    }
    revalidatePath("/table");
    return { message: "Table created successfully", status: "success" };
  } catch (error) {
    return { message: "Error Creating Table", status: "destructive" };
  }
}
