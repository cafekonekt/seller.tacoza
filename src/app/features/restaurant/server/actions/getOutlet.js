import { getSession, logout } from "@/lib/auth/session";
import { apiGet } from "@/handlers/apiHandler";
import { catchError } from "@/app/utils/catchError";

export async function getOutlet() {
  const user = await getSession();
  const [error, response] = await catchError(
    apiGet(`/api/shop/outlet`, {
      headers: {
        Authorization: `Bearer ${user?.tokens?.access}`,
        cache: "no-store",
      },
    }),
  );

  return [error, response];
}
