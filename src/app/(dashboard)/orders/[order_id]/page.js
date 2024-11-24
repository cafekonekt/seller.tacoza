import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  CreditCard,
  Mail,
  MoreVertical,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineHeading,
  TimelineItem,
  TimelineLine,
} from "@/components/ui/timeline";
import { Separator } from "@/components/ui/separator";
import { getOrder } from "@/lib/orders/getOrder";
import Link from "next/link";

export default async function Dashboard({ params }) {
  const order = await getOrder(params.order_id);
  
  console.log(order, "order");

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">
          Order #{order.order_id} - {new Date(order.created_at).toDateString()}
        </h1>
      </div>
      <div className="grid grid-cols-5 gap-4 items-center justify-center">
        <Card className="col-span-3 overflow-hidden w-full">
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                Order {order.order_id.split("-")[0]}
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy Order ID</span>
                </Button>
              </CardTitle>
              <CardDescription>Date: {new Date(order.created_at).toDateString()}</CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                  {Math.floor((new Date(order.updated_at).getTime() - new Date(order.created_at).getTime()) / (1000 * 60))} Minutes
                </span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <MoreVertical className="h-3.5 w-3.5" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Export</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Trash</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
              <div className="font-semibold">Order Details</div>
              <ul className="grid gap-3">
                {
                  order.items.map((item, key) => (
                    <li className="flex items-center justify-between" key={key}>
                      <span className="text-muted-foreground">
                        {item.food_item.name} x <span>{item.quantity}</span>
                      </span>
                      <span>{item.food_item.price}</span>
                    </li>
                  ))
                }
              </ul>
              <Separator className="my-2" />
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>INR {order.total}</span>
                </li>
                {/* <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>$5.00</span>
                </li> */}
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>INR {order.total * 0.05}</span>
                </li>
                <li className="flex items-center justify-between font-semibold">
                  <span className="text-muted-foreground">Total</span>
                  <span>INR {order.total}</span>
                </li>
              </ul>
            </div>
            {/* <Separator className="my-4" />
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <div className="font-semibold">Shipping Information</div>
                <address className="grid gap-0.5 not-italic text-muted-foreground">
                  <span>Liam Johnson</span>
                  <span>1234 Main St.</span>
                  <span>Anytown, CA 12345</span>
                </address>
              </div>
              <div className="grid auto-rows-max gap-3">
                <div className="font-semibold">Billing Information</div>
                <div className="text-muted-foreground">
                  Same as shipping address
                </div>
              </div>
            </div> */}
            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold">Customer Information</div>
              <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Customer</dt>
                  <dd>{order.user.name}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Email</dt>
                  <dd>
                    <Link href="mailto:">{order.user.email}</Link>
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Phone</dt>
                  <dd>
                    <Link href="tel:">{order.user.phone_number}</Link>
                  </dd>
                </div>
              </dl>
            </div>
            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold">Payment Information</div>
              <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-1 text-muted-foreground">
                    Payment Method
                  </dt>
                  <dd>{order.payment_method.toUpperCase()}</dd>
                </div>
              </dl>
            </div>
          </CardContent>
          <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">
              Updated <time dateTime="2023-11-23">November 23, 2023</time>
            </div>
            <Pagination className="ml-auto mr-0 w-auto">
              <PaginationContent>
                <PaginationItem>
                  <Button size="icon" variant="outline" className="h-6 w-6">
                    <ChevronLeft className="h-3.5 w-3.5" />
                    <span className="sr-only">Previous Order</span>
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button size="icon" variant="outline" className="h-6 w-6">
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span className="sr-only">Next Order</span>
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
        <div className="flex flex-col col-span-2 gap-4 h-full">
          <Card className="flex gap-2 p-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>{order.user.name}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <div className="font-semibold">{order.user.name}</div>
              <p className="text-muted-foreground">Customer</p>
              <Button size="sm" variant="outline">
                <Mail className="h-4 w-4 mr-2" /> Email
              </Button>
            </div>
          </Card>
          <Card className="h-full">
            <CardHeader className="text-lg font-bold">
              Status History
            </CardHeader>
            <CardContent className="">
              <Timeline>
                {order.order_timeline.map((item, key) => (
                  <TimelineItem key={key} status={item.done ? "done" : ""}>
                    <TimelineHeading side="right">{item.stage}</TimelineHeading>
                    <TimelineDot status={item.done ? "done" : ""} />
                    {item.done && (order.order_timeline?.length-1 !== key) && <TimelineLine done />}
                    <TimelineContent>
                      <p>{new Date(item.created_at).toLocaleString()}</p>
                      {item.content}
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
