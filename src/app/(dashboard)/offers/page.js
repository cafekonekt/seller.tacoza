import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import { Settings2, Users } from "lucide-react";
import { AddOffer } from "./AddOffer";

export const metadata = {
  title: "Offers - tacoza Seller",
  description: "tacoza Seller Dashboard",
};

export default async function Offers() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Offers</h1>
      </div>
      <div className="grid grid-cols-4 w-full gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="border-2 border-gray-300 rounded-lg border-dashed p-1 pr-3 w-fit">
              <Badge className="h-6 bg-green-500 font-bold text-sm mr-2">
                30% OFF
              </Badge>
              FLAT30
            </CardTitle>
            <CardDescription>Expires on 12 Aug 2024</CardDescription>
          </CardHeader>
          <CardFooter className="flex items-center justify-between">
            <p className="flex items-center">
              <Users className="h-3.5 w-3.5 mr-2" /> 2/5
            </p>
            <div className="flex items-center gap-2">
              <Button size="sm">View</Button>
              <Button size="sm" variant="outline">
                <Settings2 className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      <AddOffer />
      <div className="hidden flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no offers
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start selling as soon as you add a offer.
          </p>
          <Button className="mt-4">Add Offer</Button>
        </div>
      </div>
    </main>
  );
}
