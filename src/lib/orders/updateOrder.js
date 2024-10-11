"use server";
import { getSession } from "@/lib/auth/session";
import { apiPut } from "@/handlers/apiHandler";

export async function updateOrder(order_id, status) {
    try {
        const user = await getSession();
        const response = await apiPut(`/api/shop/order/${order_id}/`, {
            status
        }, {
            headers: {
                Authorization: `Bearer ${user?.tokens?.access}`,
                cache: "no-store",
            },
        });
        return response;
    } catch (error) {
        console.error("Error updating order status:", error);
        return null;
    }
}