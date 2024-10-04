"use client";
import { useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useOrderContext } from "@/context/OrderContext";
import { updateOrderStatus } from "@/lib/orders/getLiveOrder";
import { useMediaQuery } from "@react-hook/media-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderCard } from "./OrderCard";

const STATUS = {
  new: "pending",
  preparing: "processing",
  completed: "completed",
};

export default function LiveOrder() {
  const { liveOrder, setOrder } = useOrderContext();

  const changeOrderStatus = useCallback(async (orderId, fromStatus, toStatus) => {
    try {
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
      
      
      // Update the order status on the server
      await updateOrderStatus(orderId, STATUS[toStatus]);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  }, [setOrder]);

  const onDrop = async (event, toStatus) => {
    const orderId = event.dataTransfer.getData("order_id");
    const fromStatus = event.dataTransfer.getData("fromStatus");
    if (fromStatus === toStatus) return;
    changeOrderStatus(orderId, fromStatus, toStatus);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDragStart = (event, order, fromStatus) => {
    event.dataTransfer.setData("order_id", order.order_id);
    event.dataTransfer.setData("fromStatus", fromStatus);
  };

  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop) {
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
                    <OrderCard key={order.order_id} order={order} status={status} changeOrderStatus={changeOrderStatus} onDragStart={onDragStart} />
                  ))}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </main>
    );
  }
  return (
    <main className="w-screen p-4 overflow-auto">
      <Tabs defaultValue="new">
        <TabsList>
          {Object.keys(liveOrder).map((status, key) => (
            <TabsTrigger value={status} asChild key={key}>
              <div className="flex">
                <span>{status.toUpperCase()}</span>
                <Badge className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  {liveOrder[status].length}
                </Badge>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.keys(liveOrder).map((status, key) => (
          <TabsContent value={status} key={key}>
            <Card className="bg-muted h-[80vh] overflow-y-scroll">
              <CardContent className="p-2">
                {/* Order Card start */}
                {liveOrder[status].map((order) => (
                  <OrderCard key={order.order_id} order={order} status={status} changeOrderStatus={changeOrderStatus} onDragStart={onDragStart} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}
