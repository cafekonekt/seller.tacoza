import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex items-center justify-center overflow-hidden h-full">
      <div className="flex items-center font-bold">
        <LoaderCircle className="w-6 h-6 animate-spin mr-2" /> Loading
      </div>
    </main>
  );
}
