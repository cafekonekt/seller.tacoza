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
      <div className="grid grid-cols-1 md:grid-cols-4 w-full gap-4">
        <OfferCard />
        <AddOfferCard />
      </div>
      <AddOffer />

      {/* Show this if no offers are available */}
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

const colorArray = [
  "lime",
  "red",
  "yellow",
  "blue",
  "green",
  "indigo",
  "purple",
];

let currentColorIndex = 0;

function OfferCard({ offer }) {
  const color = colorArray[currentColorIndex];
  currentColorIndex = (currentColorIndex + 1) % colorArray.length;

  // Object mapping for dynamic classes
  const gradientClasses = {
    red: "bg-gradient-to-tr from-red-600 via-red-400 to-red-300",
    yellow: "bg-gradient-to-tr from-yellow-600 via-yellow-400 to-yellow-300",
    blue: "bg-gradient-to-tr from-blue-600 via-blue-400 to-blue-300",
    green: "bg-gradient-to-tr from-green-600 via-green-400 to-green-300",
    indigo: "bg-gradient-to-tr from-indigo-600 via-indigo-400 to-indigo-300",
    lime: "bg-gradient-to-tr from-lime-600 via-lime-400 to-lime-300",
    purple: "bg-gradient-to-tr from-purple-600 via-purple-400 to-purple-300",
  };

  return (
    <Card className={gradientClasses[color]}>
      <CardHeader>
        <CardTitle className="text-xl flex items-center border-2 border-white rounded-lg border-dashed p-1 pr-3 w-fit">
          <div className="bg-gray-800 font-bold mr-2 p-1 px-2 rounded text-white text-nowrap">
            30% OFF
          </div>
          FLAT30
        </CardTitle>
        <CardDescription className="text-secondary">
          Expires on 12 Aug 2024
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center justify-between">
        <p className="flex items-center text-white">
          <Users className="h-3.5 w-3.5 mr-2" /> 2/5
        </p>
        <div className="flex items-center gap-2">
          <Button size="sm">View</Button>
          <Button size="icon" variant="outline" className=" rounded-full">
            <Settings2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

function AddOfferCard({ offer }) {
  return (
    <div className="flex items-center justify-center rounded-lg border-2 border-gray-400 border-dashed p-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <p>Create a new custom offer.</p>
        <Button>+ Create</Button>
      </div>
    </div>
  );
}
