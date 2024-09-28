"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Timer, UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useOrderContext } from "@/context/OrderContext";
import { updateOrderStatus, getOrders } from "@/lib/orders/getLiveOrder";
import { Button } from "@/components/ui/button";

const STATUS = {
  newOrders: "pending",
  preparing: "processing",
  completed: "completed",
};

export default function LiveOrder() {
  const { liveOrder, setOrder } = useOrderContext();

  const onDrop = async (event, toStatus) => {
    const orderId = event.dataTransfer.getData("order_id");
    const fromStatus = event.dataTransfer.getData("fromStatus");

    if (fromStatus === toStatus) return;

    // Update the order status on the server
    try {
      // Update the local state after a successful API response
      setOrder((prev) => {
        const fromItems = prev[fromStatus].filter(
          (existingItem) => existingItem.order_id !== orderId,
        );
        const toItems = [
          ...prev[toStatus],
          prev[fromStatus].find(
            (existingItem) => existingItem.order_id === orderId,
          ),
        ];
        return {
          ...prev,
          [toStatus]: toItems,
          [fromStatus]: fromItems,
        };
      });
      
      await updateOrderStatus(orderId, STATUS[toStatus]); // Update status via API
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDragStart = (event, order, fromStatus) => {
    event.dataTransfer.setData("order_id", order.order_id);
    event.dataTransfer.setData("fromStatus", fromStatus);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-auto">
      <div className="grid grid-cols-3 gap-4">
        {Object.keys(liveOrder).map((status) => (
          <div
            key={status}
            className="flex flex-col gap-4"
            onDrop={(event) => onDrop(event, status)}
            onDragOver={onDragOver}
          >
            <div className="text-lg font-bold flex gap-2 items-center">
              <span>{status.toUpperCase()}</span>
              <Badge className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                {liveOrder[status].length}
              </Badge>
            </div>
            <Card className="bg-muted h-[80vh] overflow-y-scroll">
              <CardContent className="p-2">
                {/* Order Card start */}
                {liveOrder[status].map((order) => (
                  <div
                    className="order rounded-xl my-2 hover:shadow-md bg-white"
                    key={order.order_id}
                    onDragStart={(event) => onDragStart(event, order, status)}
                    draggable
                  >
                    <div className="grid p-4">
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          Order placed on{" "}
                          {new Date(order.created_at).toLocaleString()}
                          <span className="flex item gap-2 text-lg mt-1">
                            ID: {order.order_id.split("-")[0]}
                            <div className="bg-gray-200 text-primary text-sm font-bold px-2 items-center flex rounded-full">
                              {order.table}
                            </div>
                          </span>
                        </span>
                        <div className="flex flex-col items-end text-base font-medium">
                          <span className="text-end leading-tight">
                            Order by {order.user.name}
                          </span>
                          <div className="flex items-center border bg-muted px-2 rounded-full w-fit mt-2 animate-pulse">
                            <UtensilsCrossed className="w-5 h-5 mr-2" />
                            {order.order_type}
                          </div>
                        </div>
                      </div>
                      <Separator className="my-2" />
                      {order.items.map((item, key) => (
                        <div
                          className="flex items-center justify-between"
                          key={key}
                        >
                          <p className="font-medium flex items-center gap-2">
                            <Image
                              src="/veg.svg"
                              alt="Dash"
                              height="16"
                              width="16"
                            />
                            <span className="text-muted-foreground">
                              {item.quantity} x{" "}
                            </span>
                            {item.food_item.name} - Full
                          </p>
                          <span className="flex items-center text-base font-medium">
                            ₹ {item.totalPrice}
                          </span>
                        </div>
                      ))}
                      <span className="text-sm text-muted-foreground">
                        Addons, Cheese
                      </span>
                      <Separator className="my-2" />
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-base">
                          Total Bill
                          <span className="ml-2 px-2 text-sm font-semibold border border-blue-500 text-blue-500 bg-blue-100 rounded-lg">
                            PAID
                          </span>
                        </p>

                        <span className="flex items-center text-base font-medium">
                          ₹ {order.total}
                        </span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <OrderTimer order={order} />
                        <Button className="bg-green-500 text-secondary">
                          Start Preparing
                        </Button>
                      </div>
                    </div>
                    <Progress
                      className="h-1.5 rounded-lg rounded-t-none"
                      value={50}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </main>
  );
}

function OrderTimer({ order }) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      const orderTime = new Date(order.created_at).getTime();
      const elapsedSeconds = Math.floor((currentTime - orderTime) / 1000);
      setElapsedTime(elapsedSeconds);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [order.created_at]);

  const minutesElapsed = Math.floor(elapsedTime / 60);
  const secondsElapsed = elapsedTime % 60;
  const timerColor =
    minutesElapsed < 5 ? "green" : minutesElapsed < 10 ? "yellow" : "red";

  return (
    <span
      className={`flex items-center w-fit px-2 text-sm font-bold gap-1 rounded-md bg-${timerColor}-200 text-${timerColor}-600`}
    >
      <Timer className="w-5 h-5" />
      {minutesElapsed}:
      {secondsElapsed < 10 ? `0${secondsElapsed}` : secondsElapsed}
    </span>
  );
}
