import { Button } from "@/components/ui/button";
import { Download, ShoppingCart } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Marketing - tacoza Seller",
  description: "tacoza Seller Dashboard",
};

export default function Templates({ n = 10 }) {
  return (
    <main className="flex flex-1 flex-col gap-8 p-4 lg:gap-6 lg:p-6 overflow-y-scroll max-h-screen">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Templates</h1>
        <Button variant="outline" className="ml-auto">
          Buy <ShoppingCart className="ml-1 w-4 h-4" />
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: n }).map((_, index) => (
          <div
            key={index}
            className="col-span-1 flex flex-col items-center border-2 rounded-2xl shadow-md"
          >
            <Image
              src="/tacoza-qr-1.jpg"
              alt="table"
              width={400}
              height={600}
              className="w-full h-full object-cover rounded-t-2xl"
            />
            <div className="w-full h-20 font-semibold flex items-center p-4 bg-muted">
              Tacoza QR Template
              <Button className="ml-auto">
                Download <Download className="ml-1 w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
