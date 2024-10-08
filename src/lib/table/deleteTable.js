"use server";
import { getSession } from "@/lib/auth/session";
import { apiDelete } from "@/handlers/apiHandler";
import { revalidatePath } from "next/cache";

export async function deleteTable(tableId) {
  console.log("Deleting table", tableId);
  const user = await getSession();

  // Proceed with actual deletion
  const response = await apiDelete(`/api/shop/table/${tableId}/`, {
    headers: {
      Authorization: `Bearer ${user?.tokens?.access}`,
    },
  });

  if (response.status === 400) {
    return { message: "Table not found", status: "destructive" };
  }
  // Revalidate to refresh the table list
  revalidatePath("/table");
  return { message: "Table deleted successfully", status: "success" };
}
