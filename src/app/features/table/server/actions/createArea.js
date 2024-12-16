"use server";
import { getSession } from "@/lib/auth/session";
import { apiPost } from "@/handlers/apiHandler";
import { catchError } from "@/app/utils/catchError";
import { revalidatePath } from "next/cache";

export async function createArea(formData) {
  const user = await getSession();
  const [error, response] = await catchError(
    apiPost("/api/shop/area/", formData, {
      headers: {
        Authorization: `Bearer ${user?.tokens?.access}`,
      },
    }),
  );
  revalidatePath("/table");
  return [error, response];
}