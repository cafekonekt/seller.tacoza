"use server";
import { getSession } from "@/lib/auth/session";
import { apiPost } from "@/handlers/apiHandler";

export async function createOffer(prevState, formData) {
    const user = await getSession();
    console.log(formData);
    return { message: "Offer created successfully", status: "success" };
    // try {
    //     const response = await apiPost("/api/shop/discount-coupons/", offer, {
    //         headers: {
    //             Authorization: `Bearer ${user?.tokens?.access}`,
    //         },
    //     });
    //     return response;
    // } catch (error) {
    //     console.error(error);
    //     return null;
    // }
}
