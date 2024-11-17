import React from "react";
import { SquareMinus, SquarePlus } from "lucide-react";

export function SetQuantity() {
  return (
    <div className="flex items-center justify-center w-fit bg-green-50 rounded text-green-600">
      <SquareMinus size={24} onClick />
      <span id="counter" className="font-bold w-8 text-center">
        2
      </span>
      <SquarePlus size={24} onClick />
    </div>
  );
}
