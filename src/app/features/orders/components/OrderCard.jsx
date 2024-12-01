import { useState, useEffect } from "react";
import Image from "next/image";
// components
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// icons
import { ReceiptText, Timer, User, UtensilsCrossed } from "lucide-react";
// server actions
import { updateOrder } from "@/app/features/orders/server/actions/updateOrder";

export const OrderCard = ({
  order,
  status,
  changeOrderStatus,
  onDragStart,
}) => {
  const orderTime = new Date(order.created_at)
    .toLocaleTimeString()
    .replace(/\s*(\d{2}:\d{2}:\d{2})\s*/, "$1")
    .replace(/:\d{2}\s*/, " ");

  const updatePaymentStatus = (value) => {
    const orderStatusMap = {
      paid: "success",
      unpaid: "pending",
      cancle: "cancelled",
    };
    updateOrder(order.order_id, orderStatusMap[value]);
  };

  return (
    <div
      className="order rounded-xl my-2 hover:shadow-md bg-white"
      key={order.order_id}
      onDragStart={(event) => onDragStart(event, order, status)}
      draggable
    >
      <div className="grid p-4">
        <div className="flex justify-between">
          <span className="text-sm font-medium">
            <span className="text-base font-bold mr-2">
              ID: {order.order_id.split("-")[0]}
            </span>
            at {orderTime}
          </span>
          <span className="flex gap-1 text-sm bg-gradient-to-tr from-gray-200 border rounded-md p-1 w-fit text-end leading-tight">
            <User size={16} />
            {order.user.name.slice(0, 10)}
          </span>
        </div>
        <div className="flex gap-2 text-xs font-semibold uppercase">
          {order.table && (
            <div className="border-gray-200 border bg-gradient-to-tr from-gray-200 px-2 p-1 items-center flex rounded-md">
              {order.table}
            </div>
          )}
          <span className="flex gap-1 border-gray-200 bg-gradient-to-tr from-gray-200 border px-2 p-1 rounded-md w-fit">
            <UtensilsCrossed size={14} />
            {order.order_type}
          </span>
        </div>
        <Separator className="my-2" />
        {order.items.map((item, key) => (
          <div className="flex items-center justify-between" key={key}>
            <p className="font-medium flex items-center">
              <Image src="/veg.svg" alt="Dash" height="16" width="16" />
              <span className="text-muted-foreground ml-2 mr-1">
                {item.quantity} x
              </span>
              {item.food_item.name} {item.variant ? `- ${item.variant}` : ""}
            </p>
            {item.addons && (
              <span className="text-sm text-muted-foreground">
                {item.addons.map((addon) => addon.name).join(", ")}
              </span>
            )}
            <span className="flex items-center text-base font-medium">
              ₹{item.totalPrice}
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-dashed">
          <div className="flex items-center text-base">
            <ReceiptText size={16} />
            Bill
            {order.payment_status === "success" ? (
              <span className="ml-2 px-2 text-sm font-semibold border border-blue-500 text-blue-500 bg-blue-100 rounded-lg">
                PAID
              </span>
            ) : (
              <Select
                defaultValue="unpaid"
                onValueChange={(value) => updatePaymentStatus(value)}
              >
                <SelectTrigger className="w-fit h-6 ml-2">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">
                    <span className="ml-2 px-2 text-sm font-semibold border border-blue-500 text-blue-500 bg-blue-100 rounded-lg">
                      PAID
                    </span>
                  </SelectItem>
                  <SelectItem value="unpaid">
                    <span className="ml-2 px-2 text-sm font-semibold border border-blue-500 text-blue-500 bg-blue-100 rounded-lg">
                      UNPAID
                    </span>
                  </SelectItem>
                  <SelectItem value="cancle">
                    <span className="ml-2 px-2 text-sm font-semibold border border-blue-500 text-blue-500 bg-blue-100 rounded-lg">
                      CANCLE
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
            <span className="ml-2 px-2 text-sm font-semibold border border-yellow-600 text-yellow-600 bg-yellow-100 rounded-lg">
              {order.payment_method.toUpperCase()}
            </span>
          </div>
          <span className="flex items-center text-base font-medium">
            ₹{order.total}
          </span>
        </div>
        <div className="flex justify-between mt-2">
          <OrderTimer order={order} />
          <Button
            className="bg-green-500 text-secondary"
            onClick={() => {
              changeOrderStatus(
                order.order_id,
                status,
                status === "new" ? "preparing" : "completed",
              );
            }}
          >
            {status === "new" ? "Start Preparing" : "Mark as Completed"}
          </Button>
        </div>
      </div>
      <Progress className="h-1.5 rounded-lg rounded-t-none hidden" value={50} />
    </div>
  );
};

function OrderTimer({ order }) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (order.status === "completed") {
      const completedTime =
        new Date(order.updated_at).getTime() -
        new Date(order.created_at).getTime();
      setElapsedTime(Math.floor(completedTime / 1000));
      return;
    }

    const intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      const orderTime = new Date(order.created_at).getTime();
      const elapsedSeconds = Math.floor((currentTime - orderTime) / 1000);
      setElapsedTime(elapsedSeconds);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [order.created_at, order.updated_at, order.status]);

  const minutesElapsed = Math.floor(elapsedTime / 60);
  const secondsElapsed = elapsedTime % 60;

  // Assign specific class names based on the time elapsed and avg_preparation_time
  let bgColorClass = "bg-green-200";
  let textColorClass = "text-green-600";

  if (minutesElapsed >= 10 && minutesElapsed < order.avg_preparation_time) {
    bgColorClass = "bg-yellow-200";
    textColorClass = "text-yellow-600";
  } else if (minutesElapsed >= order.avg_preparation_time) {
    bgColorClass = "bg-red-200";
    textColorClass = "text-red-600";
  }

  return (
    <span
      className={`flex items-center w-fit px-2 text-sm font-bold gap-1 rounded-md ${bgColorClass} ${textColorClass}`}
    >
      <Timer className="w-5 h-5" />
      {minutesElapsed}:
      {secondsElapsed < 10 ? `0${secondsElapsed}` : secondsElapsed}
    </span>
  );
}
