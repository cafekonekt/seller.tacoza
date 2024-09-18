import { getSession } from "@/lib/auth/session";
import { apiGet } from "@/handlers/apiHandler";
import { notFound } from "next/navigation";

export async function getArea() {
  const response = await apiGet("/api/shop/area");
  return response;
}
