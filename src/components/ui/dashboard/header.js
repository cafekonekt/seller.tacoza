"use client";
import Link from "next/link";
import {
  BadgePercent,
  Bell,
  Briefcase,
  ChefHat,
  CircleUser,
  Grid2X2,
  Home,
  LineChart,
  Menu,
  QrCode,
  Ratio,
  Salad,
  Search,
  ShoppingCart,
  Store,
  TvMinimal,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import LogoutButton from "./LogoutButton";
import { usePathname } from "next/navigation";
import { useOrderContext } from "@/context/OrderContext";

export function Header() {
  const pathname = usePathname();
  const { liveOrder } = useOrderContext();

  const navItems = [
    { href: "/", label: "Dashboard", icon: Home },
    {
      href: "#",
      label: "POS",
      icon: TvMinimal,
      badge: "Coming Soon",
    },
    {
      href: "/orders",
      label: "Live Orders",
      icon: ShoppingCart,
      badgeCount: liveOrder?.newOrders?.length
        ? liveOrder.newOrders.length
        : "",
    },
    { href: "/orders/all", label: "Orders", icon: ShoppingCart },
    { href: "/menu", label: "Menu", icon: Salad },
    { href: "/table", label: "Tables", icon: Ratio },
    { href: "/offers", label: "Offers", icon: BadgePercent },
    { href: "/restaurant", label: "Outlet", icon: Store },
    { href: "/marketing", label: "Marketing", icon: Briefcase },
    { href: "#", label: "Customers", icon: Users, badge: "Coming Soon" },
    { href: "#", label: "Finance", icon: LineChart, badge: "Coming Soon" },
  ];

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <div className="flex h-14 items-center border-b lg:h-[60px] lg:px-6">
            <Image src="/image.png" width={100} height={30} alt="tacoza" />
          </div>
          <nav className="grid items-start text-sm font-medium lg:px-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                    isActive ? "bg-muted text-primary" : ""
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                  {item.badge && (
                    <Badge
                      variant="outline"
                      className="ml-auto flex h-6 shrink-0 items-center justify-center rounded-full"
                    >
                      {item.badge}
                    </Badge>
                  )}
                  {item.badgeCount && (
                    <div className="ml-auto relative flex h-6 w-6">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75" />
                      <Badge className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 relative">
                        {item.badgeCount}
                      </Badge>
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto">
            <Card className="hidden">
              <CardHeader>
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-yellow-200 border-2 shadow-yellow-200">
              <CardHeader>
                <CardTitle>Pro Plan</CardTitle>
                <CardDescription>
                  Unlocked all features and unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full">
                  More
                </Button>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
      <div className="hidden md:w-full md:flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>

      <div className="flex items-center gap-4 rounded-lg p-1 bg-accent">
        <div className="w-10 h-10 aspect-square">
          <img
            src="https://content.jdmagicbox.com/comp/indore/d3/0731px731.x731.150724143308.n7d3/catalogue/mahal-restaurant-indore-city-indore-north-indian-restaurants-0rocnxqfcp.jpg"
            alt="Restaurant"
            height="100"
            width="100"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="text-muted-foreground text-xs">
          <div className="text-sm text-primary font-semibold">Sagar Gaire</div>
          Chhindwara
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full hover:shadow-md"
            >
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <LogoutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
