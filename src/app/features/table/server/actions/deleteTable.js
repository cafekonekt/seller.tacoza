"use server";
import { getSession } from "@/lib/auth/session";
import { apiDelete } from "@/handlers/apiHandler";
import { catchError } from "@/app/utils/catchError";
import { revalidatePath } from "next/cache";

export async function deleteTable(tableId) {
  const user = await getSession();
  const [error, response] = await catchError(
    apiDelete(`/api/shop/table/${tableId}/`, {
      headers: {
        Authorization: `Bearer ${user?.tokens?.access}`,
      },
    }),
  );
  revalidatePath("/table");
  return [error, response];
}
