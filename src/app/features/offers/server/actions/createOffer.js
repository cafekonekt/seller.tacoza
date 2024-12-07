"use server";
import { getSession } from "@/lib/auth/session";
import { apiPost } from "@/handlers/apiHandler";
import { revalidatePath } from "next/cache";

export async function createOffer(formData) {
    const user = await getSession();
    try {
        await apiPost("/api/shop/discount-coupons/", formData, {
            headers: {
                Authorization: `Bearer ${user?.tokens?.access}`,
            },
        });
        revalidatePath("/offers");
        return { message: "Offer created successfully", status: "success" };
    } catch (error) {
        console.error(error);
        return { message: "Error creating offer", status: "destructive" };
    }
}
