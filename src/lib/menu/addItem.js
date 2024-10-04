"use server";
import { getSession } from "@/lib/auth/session";
import { apiPost } from "@/handlers/apiHandler";

export async function addItem(item) {
    const user = await getSession();
    try {
        const response = await apiPost("/api/shop/food-items/", item, {
            headers: {
                Authorization: `Bearer ${user?.tokens?.access}`,
            },
        });
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}
