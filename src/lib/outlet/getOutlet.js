import { getSession } from "@/lib/auth/session";
import { apiGet } from "@/handlers/apiHandler";
import { notFound } from "next/navigation";

export async function getOutlet() {
  const user = await getSession();
  const response = await apiGet(`/api/shop/outlet`, {
    headers: {
      Authorization: `Bearer ${user?.tokens?.access}`,
      cache: "no-store",
    },
  });
  if (!response) notFound();
  return response;
}
