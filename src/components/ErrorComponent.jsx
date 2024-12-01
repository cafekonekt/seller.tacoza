import { getErrorMessage } from "@/app/utils/getErrorMessage";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function ErrorComponent({ error }) {
  const { message, button } = getErrorMessage(error);
  return (
    <main className="h-full w-full items-center justify-center flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <h1 className="text-lg font-semibold md:text-2xl">{message}</h1>
      <Button>
        {button && (
          <Link href={button.href} className="flex items-center gap-2">
            <ChevronLeft /> {button.text}
          </Link>
        )}
      </Button>
    </main>
  );
}
