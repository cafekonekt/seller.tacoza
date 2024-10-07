'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";

import Link from "next/link";
import { login } from "@/lib/auth/session";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast"

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      Login
    </Button>
  );
}
export function Form({ searchParams }) {
  const [state, formAction] = useActionState(login, { message: null });
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    console.log(state)
    if (state.message) {
      toast({
        title: state.message,
        variant: state.status,
      });
    }
    if (state.status === "success") {
      searchParams.next ? router.push(searchParams.next) : router.push("/");
    }
  }, [state, router, searchParams, toast]);

  return (
    <form className="grid gap-4" action={formAction}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          name="email"
          type="email"
          placeholder="m@example.com"
          required
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          <Link
            href="/forgot-password"
            className="ml-auto inline-block text-sm underline"
          >
            Forgot your password?
          </Link>
        </div>
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required />
      </div>
      <SubmitButton />
    </form>
  );
}