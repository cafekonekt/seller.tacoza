"use server";
import { getSession } from "@/lib/auth/session";
import { apiPut } from "@/handlers/apiHandler";
import { catchError } from "@/app/utils/catchError";

export async function updateOrder(order_id, status) {
  const user = await getSession();
  const [error, response] = await catchError(
    apiPut(
      `/api/shop/order/${order_id}/`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${user?.tokens?.access}`,
          cache: "no-store",
        },
      },
    ),
  );
  return [error, response];
}
