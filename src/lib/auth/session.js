"use server";
import { encrypt, decrypt } from "@/lib/auth/util/lib";
import { cookies } from "next/headers";
import { apiPost } from "@/handlers/apiHandler";

export async function login(formData) {
  const user = {
    email: formData.email,
    password: formData.password,
  };
  try {
    const response = await apiPost("/api/auth/login/", user);
    console.log(response.status, "response");
    if (response.status === 401) {
      return { message: "Invalid email or password", status: "destructive" };
    }
    if (response) {
      const cookieStore = cookies();
      const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365);
      const session = await encrypt(response);
      cookieStore.set({
        name: "session",
        value: session,
        httpOnly: true,
        expires,
      });
      return { message: "Login successful", status: "success" };
    }
  } catch (error) {
    return { message: "An unexpected error occurred", status: "destructive" };
  }
}

export async function getSession() {
  const cookieStore = cookies();
  const session = await cookieStore.get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function logout() {
  const cookieStore = cookies();
  cookieStore.set({
    name: "session",
    value: "",
    maxAge: 0,
  });
}
