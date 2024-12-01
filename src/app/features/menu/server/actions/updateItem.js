"use server";
import { getSession } from "@/lib/auth/session";
import { apiPut } from "@/handlers/apiHandler";
import { catchError } from "@/app/utils/catchError";

export async function updateItem(item) {
  const user = await getSession();
  const slug = item instanceof FormData ? item.get("slug") : item.slug;

  const [error, response] = await catchError(
    apiPut(`/api/shop/food-items/${slug}/`, item, {
      headers: {
        Authorization: `Bearer ${user?.tokens?.access}`,
      },
    }),
  );
  return [error, response];
}
