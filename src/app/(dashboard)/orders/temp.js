"use client";
import { useState } from "react";
import {
  DndContext,
  closestCenter,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import {
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  SortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

export default function LiveOrder() {
  const [orders, setOrders] = useState({
    newOrders: ["23", "24"],
    preparing: ["22"],
    completed: [],
  });

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    if (!activeContainer || !overContainer) return;

    if (activeContainer !== overContainer) {
      setOrders((prev) => {
        const activeItems = [...prev[activeContainer]];
        const overItems = [...prev[overContainer]];

        const activeIndex = activeItems.indexOf(active.id);
        if (activeIndex !== -1) {
          activeItems.splice(activeIndex, 1);
        }

        overItems.push(active.id);

        return {
          ...prev,
          [activeContainer]: activeItems,
          [overContainer]: overItems,
        };
      });
    } else {
      setOrders((prev) => {
        const items = [...prev[activeContainer]];
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return {
          ...prev,
          [activeContainer]: arrayMove(items, oldIndex, newIndex),
        };
      });
    }
  };

  const findContainer = (id) => {
    if (orders.newOrders.includes(id)) return "newOrders";
    if (orders.preparing.includes(id)) return "preparing";
    if (orders.completed.includes(id)) return "completed";
    return null;
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Live Orders</h1>
      </div>
      <div className="grid grid-cols-3 gap-8">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {Object.keys(orders).map((status) => (
            <SortableContext
              key={status}
              items={orders[status]}
              strategy={verticalListSortingStrategy}
            >
              <Droppable id={status}>
                <div className="text-lg font-bold mb-2 flex gap-2 items-center">
                  {status === "newOrders"
                    ? "New Orders"
                    : status.charAt(0).toUpperCase() + status.slice(1)}{" "}
                  <Badge className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </div>
                <Card className="bg-muted pt-4 h-full">
                  <CardContent>
                    {orders[status].map((orderId) => (
                      <Draggable key={orderId} id={orderId}>
                        <Order id={orderId} />
                      </Draggable>
                    ))}
                  </CardContent>
                </Card>
              </Droppable>
            </SortableContext>
          ))}
        </DndContext>
      </div>
    </main>
  );
}

function Order({ id }) {
  return (
    <div className="\]order rounded-xl my-2 hover:shadow-md bg-white">
      <div className="grid gap-4 p-4">
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-medium text-muted-foreground">
            Order placed on 23 Mar, 08:23 PM
            <span className="flex item gap-2 text-lg mt-1">
              ID: {id}
              <Badge className="bg-blue-500 text-white">Table - 4 Inside</Badge>
            </span>
          </span>
          <div className="flex flex-col items-end text-base font-medium">
            1st Order by Rahul
            <div className="flex items-center border bg-muted px-2 rounded-full w-fit mt-2 animate-pulse">
              <UtensilsCrossed className="w-5 h-5 mr-2" />
              DineIn
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <p className="font-medium flex items-center gap-2">
            <Image src="/veg.svg" alt="Dash" height="16" width="16" />
            <span className="text-muted-foreground">1 x </span>
            Chole Bhature
          </p>
          <span className="flex items-center text-base font-medium">₹ 120</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-medium flex items-center gap-2">
            <Image src="/veg.svg" alt="Dash" height="16" width="16" />
            <span className="text-muted-foreground">2 x </span>
            Masala Dosa
          </p>
          <span className="flex items-center text-base font-medium">₹ 200</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between mt-2">
          <p className="text-base">
            Total Bill
            <span className="ml-2 px-2 text-sm font-semibold border border-blue-500 text-blue-500 bg-blue-100 rounded-lg">
              PAID
            </span>
          </p>

          <span className="flex items-center text-base font-medium">₹ 320</span>
        </div>
      </div>
      <Progress className="h-6 rounded-lg rounded-t-none" value={33} />
    </div>
  );
}

// Droppable component
export function Droppable({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  const style = { opacity: isOver ? 0.5 : 1 };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}

export function Draggable({ id, children }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = { transform: CSS.Translate.toString(transform) };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}
