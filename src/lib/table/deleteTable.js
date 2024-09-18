"use server";
import { getSession } from "@/lib/auth/session";
import { apiDelete } from "@/handlers/apiHandler";
import { revalidatePath } from "next/cache";

export async function deleteTableWithDelay(prevState, tableId) {
  console.log("Deleting table with delay", tableId);
  const user = await getSession();

  // Proceed with actual deletion
  const response = await apiDelete(`/api/shop/tables/${tableId}/`, {
    headers: {
      Authorization: `Bearer ${user?.tokens?.access}`,
    },
  });

  if (!response) {
    return { message: "Error deleting table", status: "destructive" };
  }
  // Revalidate to refresh the table list
  revalidatePath("/table");

  return { message: "Table deleted successfully", status: "success" };
}
