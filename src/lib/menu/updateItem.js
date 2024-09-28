"use server";
import { getSession } from "@/lib/auth/session";
import { apiPut } from "@/handlers/apiHandler";
import { revalidatePath } from "next/cache";

export async function updateItem(item) {
    const user = await getSession();
    try {
        const response = await apiPut(`/api/shop/food-items/${item.slug}/`, item, {
            headers: {
                Authorization: `Bearer ${user?.tokens?.access}`,
            },
        });
        return response
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        revalidatePath("/menu");
    }
}
