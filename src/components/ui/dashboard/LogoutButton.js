"use client"
import {
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/auth/session";

export default function LogoutButton() {
  return (
    <DropdownMenuItem
      onClick={() => {
        logout();
      }}
    >
      Logout
    </DropdownMenuItem>
  );
}