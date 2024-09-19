import { getSession } from "@/lib/auth/session";
import { apiGet } from "@/handlers/apiHandler";
import { notFound } from "next/navigation";

export async function getArea() {
  const user = await getSession();
  const response = await apiGet("/api/shop/area", {
    headers: {
      Authorization: `Bearer ${user?.tokens?.access}`,
      cache: "no-store",
    },
  });
  if (response.status === 404) return notFound();
  if (response.status === 401) {
    logout();
    redirect("/login");
  }
  return response;
}
