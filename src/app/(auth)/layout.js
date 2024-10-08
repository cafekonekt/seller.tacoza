import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Login",
  description: "tacoza Seller Dashboard",
};
import { UserProvider } from "@/context/UserContext";

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </UserProvider>
    </html>
  );
}
