import { logout } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export function getErrorMessage(error) {
  const status = error?.status;
  switch (status) {
    case 404:
      return {
        message: "404 Not Found",
        button: { text: "Go Back", href: "/" },
      };
    case 500:
      return { message: "Internal Server Error" };
    case 401:
      return {
        message: "Unauthorized",
        button: { text: "Login", href: "/login" },
      };
    default:
      return { message: "An unexpected error occurred" };
  }
}
