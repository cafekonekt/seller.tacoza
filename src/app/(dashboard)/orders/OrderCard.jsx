import { useState, useEffect } from "react";
import { Timer, UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export const OrderCard = ({ order, status, changeOrderStatus, onDragStart }) => {
    console.log(order.items);
    return (
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
                        {new Date(order.created_at).toLocaleString().split(":").slice(0, 2).join(":")}
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
                            {item.food_item.name} {item.variant ? `- ${item.variant}` : ""}
                        </p>
                        <br />
                        {item.addons && <span className="text-sm text-muted-foreground">
                            {item.addons.map((addon) => addon.name).join(", ")}
                        </span>}
                        <span className="flex items-center text-base font-medium">
                            ₹ {item.totalPrice}
                        </span>
                    </div>
                ))}
                <Separator className="my-2" />
                <div className="flex items-center justify-between mt-2">
                    <p className="text-base">
                        Total Bill
                        <span className="ml-2 px-2 text-sm font-semibold border border-blue-500 text-blue-500 bg-blue-100 rounded-lg">
                            {order.payment_status.toUpperCase()}
                        </span>
                    </p>
                    <span className="flex items-center text-base font-medium">
                        ₹ {order.total}
                    </span>
                </div>
                <div className="flex justify-between mt-2">
                    <OrderTimer order={order} />
                    <Button className="bg-green-500 text-secondary" onClick={() => {
                        changeOrderStatus(order.order_id, status, status === "new" ? "preparing" : "completed");
                    }}>
                        {status === "new" ? "Start Preparing" : "Mark as Completed"}
                    </Button>
                </div>
            </div>
            <Progress
                className="h-1.5 rounded-lg rounded-t-none"
                value={50}
            />
        </div>
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
