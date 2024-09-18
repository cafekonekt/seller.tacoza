import Image from "next/image";
import Link from "next/link";

import { getSession, login } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { Form } from "./Form";

export const description = "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image.";

export default async function Auth({ searchParams }) {
  return (
    <div className="w-full h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <Form searchParams={searchParams} />
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="https://i.pinimg.com/originals/08/d4/4b/08d44bd68ae07ba94dab461409437661.gif"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
