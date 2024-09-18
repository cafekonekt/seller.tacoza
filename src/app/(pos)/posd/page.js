import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  ListFilter,
  MoreVertical,
  Search,
  Truck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Options } from "../pos/page";

export const description =
  "An orders dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. The main area has a list of recent orders with a filter and export button. The main area also has a detailed view of a single order with order details, shipping information, billing information, customer information, and payment information.";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Orders</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Recent Orders</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
          <Options />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="/vercel.svg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4  lg:col-span-2 overflow-hidden">
            <h2 className="text-lg font-bold text-primary">Categories</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {/* Category */}
              <div className="h-20 bg-green-500 text-secondary font-bold text-nowrap rounded-lg items-center justify-start flex gap-2 px-2 hover:shadow-md">
                <div className="h-16 aspect-square">
                  <Image
                    src="/pizza.jpg"
                    alt="Food"
                    width={50}
                    height={50}
                    className="w-full h-full rounded-lg object-cover"
                  />
                </div>
                South Indian
                <span className="h-6 w-6 text-sm flex items-center justify-center rounded-full bg-white/20 bg-opacity-40">
                  10
                </span>
              </div>
            </div>
            <Tabs defaultValue="week">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 gap-1 text-sm"
                      >
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Filter</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Fulfilled
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Declined
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Refunded
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1 text-sm"
                  >
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Export</span>
                  </Button>
                </div>
              </div>
              <TabsContent value="week">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>
                      Recent orders from your store.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 bg-muted w-[1000px] p-2 rounded-lg overflow-x-scroll">
                      <div className="h-10 w-fit bg-white rounded-lg items-center justify-center flex px-2 hover:shadow">
                        All
                      </div>
                      <div className="h-10 w-56 bg-white rounded-lg items-center justify-center flex px-2">
                        South Indian
                      </div>
                      <div className="h-10 w-56 bg-blue-500 text-secondary text-nowrap rounded-lg items-center justify-center flex gap-2 px-2 hover:shadow-md">
                        <div className="h-8 aspect-square">
                          <Image
                            src="/pizza.jpg"
                            alt="Food"
                            width={50}
                            height={50}
                            className="w-full h-full rounded-lg object-cover"
                          />
                        </div>
                        South Indian
                      </div>
                      <div className="h-10 w-56 bg-white rounded-lg items-center justify-center flex px-2">
                        South Indian
                      </div>
                      <div className="h-10 w-56 bg-white rounded-lg items-center justify-center flex px-2">
                        South Indian
                      </div>
                      <div className="h-10 w-56 bg-white rounded-lg items-center justify-center flex px-2">
                        South Indian
                      </div>
                      <div className="h-10 w-56 bg-white rounded-lg items-center justify-center flex px-2">
                        South Indian
                      </div>
                    </div>
                    <div className="grid-cols-3 grid mt-4 gap-4 bg-muted p-2 rounded-lg overflow-x-scroll">
                      <div className="flex gap-2 col-span-1 h-20 bg-white rounded-lg p-2 hover:shadow-md">
                        <div className="w-2 h-full bg-blue-500 rounded-full" />
                        <div className="h-full aspect-square">
                          <Image
                            src="/pizza.jpg"
                            alt="Food"
                            width={80}
                            height={80}
                            className="w-full h-full rounded-lg object-cover"
                          />
                        </div>
                        <div className="flex flex-col ml-2">
                          <Image
                            src="/veg.svg"
                            alt="veg"
                            width={12}
                            height={12}
                          />
                          <div className="font-semibold">Pizza</div>
                          <div className="text-sm text-muted-foreground">
                            ₹ 299
                          </div>
                        </div>
                        <Badge className="ml-auto h-fit">2x</Badge>
                      </div>
                      <div className="flex gap-2 col-span-1 h-20 bg-white rounded-lg p-2 hover:shadow">
                        <div className="w-2 h-full bg-blue-500 rounded-full" />
                        <div className="h-full aspect-square">
                          <Image
                            src="/pizza.jpg"
                            alt="Food"
                            width={80}
                            height={80}
                            className="w-full h-full rounded-lg object-cover"
                          />
                        </div>
                        <div className="flex flex-col ml-2">
                          <Image
                            src="/non-veg.svg"
                            alt="non-veg"
                            width={12}
                            height={12}
                          />
                          <div className="font-semibold">Garlic Bread</div>
                          <div className="text-sm text-muted-foreground">
                            ₹ 99
                          </div>
                        </div>
                        <Badge className="hidden ml-auto h-fit">2x</Badge>
                      </div>
                      <div className="flex gap-2 col-span-1 h-20 bg-white rounded-lg p-2 hover:shadow">
                        <div className="w-2 h-full bg-green-500 rounded-full" />
                        <div className="h-full aspect-square">
                          <Image
                            src="/pizza.jpg"
                            alt="Food"
                            width={80}
                            height={80}
                            className="w-full h-full rounded-lg object-cover"
                          />
                        </div>
                        <div className="flex flex-col ml-2">
                          <Image
                            src="/veg.svg"
                            alt="veg"
                            width={12}
                            height={12}
                          />
                          <div className="font-semibold">
                            Paneer Peprika Pizza
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ₹ 499
                          </div>
                        </div>
                        <Badge className="ml-auto h-fit">1x</Badge>
                      </div>
                      <div className="flex gap-2 col-span-1 h-20 bg-white rounded-lg p-2 hover:shadow">
                        <div className="w-2 h-full bg-orange-500 rounded-full" />
                        <div className="h-full aspect-square">
                          <Image
                            src="/pizza.jpg"
                            alt="Food"
                            width={80}
                            height={80}
                            className="w-full h-full rounded-lg object-cover"
                          />
                        </div>
                        <div className="flex flex-col ml-2">
                          <Image
                            src="/veg.svg"
                            alt="veg"
                            width={12}
                            height={12}
                          />
                          <div className="font-semibold w-52 truncate">
                            8 Toppings Paneer Maharaja Pizza
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ₹ 899
                          </div>
                        </div>
                        <Badge className="ml-auto h-fit">1x</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    Order Oe31b70H
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Copy className="h-3 w-3" />
                      <span className="sr-only">Copy Order ID</span>
                    </Button>
                  </CardTitle>
                  <CardDescription>Date: November 23, 2023</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <Button size="sm" variant="outline" className="h-8 gap-1">
                    <Truck className="h-3.5 w-3.5" />
                    <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                      Track Order
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
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Glimmer Lamps x <span>2</span>
                      </span>
                      <span>$250.00</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Aqua Filters x <span>1</span>
                      </span>
                      <span>$49.00</span>
                    </li>
                  </ul>
                  <Separator className="my-2" />
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>$299.00</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>$5.00</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>$25.00</span>
                    </li>
                    <li className="flex items-center justify-between font-semibold">
                      <span className="text-muted-foreground">Total</span>
                      <span>$329.00</span>
                    </li>
                  </ul>
                </div>
                <Separator className="my-4" />
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
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Customer Information</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Customer</dt>
                      <dd>Liam Johnson</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Email</dt>
                      <dd>
                        <a href="mailto:">liam@acme.com</a>
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Phone</dt>
                      <dd>
                        <a href="tel:">+1 234 567 890</a>
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
                        <CreditCard className="h-4 w-4" />
                        Visa
                      </dt>
                      <dd>**** **** **** 4532</dd>
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
          </div>
        </main>
      </div>
    </div>
  );
}
