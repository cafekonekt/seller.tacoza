import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Bike,
  Check,
  ClipboardPen,
  Package,
  Receipt,
  ReceiptText,
  Search,
  User,
  UserPlus,
  UtensilsCrossed,
} from "lucide-react";
import { Options } from "../pos/page";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SetQuantity } from "./setQuantity";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="w-full flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="h-full w-full grid gap-4 md:grid-cols-3 p-4 pt-0">
          <div className="flex flex-col md:col-span-2 gap-2">
            <h3 className="text-sm font-semibold uppercase">Category</h3>
            <div className="grid md:grid-cols-4 p-2 rounded-xl bg-muted border h-1/3 overflow-y-scroll">
              <POScategory />
            </div>
            <h3 className="text-sm font-semibold uppercase">Items</h3>
            <div className="grid md:grid-cols-3 gap-2 p-2 rounded-xl bg-muted border h-2/3 overflow-y-scroll">
              <POSitem />
              <POSitem />
            </div>
          </div>
          <div>
            <h3 className="hidden flex gap-1 flex-0 text-sm font-semibold uppercase mb-2">
              <ReceiptText /> Summary
            </h3>
            <div className="flex flex-col h-full border rounded-xl bg-muted gap-1">
              <POSordertype />
              <POStable />
              <span className="text-xs font-semibold opacity-70 ml-2 mt-2">
                ITEMS
              </span>
              <div className="mx-1 gap-2 flex flex-col h-full bg-white p-2 rounded-xl border overflow-y-scroll">
                <POSaddeditem />
                <POSaddeditem />
                <POSaddeditem />
              </div>
              <div className="h-40 rounded-b-xl w-full bg-black flex self-end"></div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

function HeaderSide() {
  return (
    <div className="hidden ml-auto md:flex md:gap-2 md:block">
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>
      <Options />
    </div>
  );
}

function POScategory() {
  return (
    <div className="h-12 bg-green-500 text-secondary text-nowrap rounded-lg items-center justify-start flex gap-2 px-2 hover:shadow-md">
      <Image
        src="/pizza.jpg"
        alt="Food"
        width={50}
        height={50}
        className="w-8 h-8 rounded-lg object-cover"
      />
      South Indian
      <span className="h-6 w-6 text-sm flex items-center justify-center rounded-full bg-white/20 bg-opacity-40">
        10
      </span>
    </div>
  );
}

function POSitem() {
  return (
    <div className="flex gap-2 col-span-1 h-20 bg-white rounded-lg p-2 hover:shadow-md select-none">
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
      <div className="flex flex-col justify-between ml-2">
        <div className="flex font-semibold">
          <Image
            src="/veg.svg"
            alt="veg"
            width={12}
            height={12}
            className="h-3.5 w-3.5 mt-1 mr-1"
          />
          Pizza
        </div>
        <div className="text-sm text-muted-foreground">₹ 299</div>
      </div>
      <Badge className="ml-auto h-fit">2x</Badge>
    </div>
  );
}

function POStable() {
  return (
    <>
      <span className="text-xs font-semibold opacity-70 ml-2">OPTIONS</span>
      <div className="flex select-none gap-1 mx-1">
        <div className="flex flex-col items-center justify-center cursor-pointer bg-white h-14 aspect-square p-2 rounded-xl bg-muted border">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-chairs-table-platter"
          >
            <path d="M12 6V5" />
            <path d="M8 10a4 4 0 0 1 8 0" />
            <path d="M6 10h12" />
            <path d="M12 10v9" />
            <path d="M8 19v-4c0-.6-.4-1-1-1H2" />
            <path d="M2 8v11" />
            <path d="M16 19v-4a1 1 0 0 1 1-1h5" />
            <path d="M22 8v11" />
          </svg>
          <span className="px-2 text-xs text-center text-white bg-black rounded-lg">
            Table-2
          </span>
        </div>
        <div className="flex flex-col items-center justify-center cursor-pointer bg-white h-14 aspect-square p-2 rounded-xl bg-muted border">
          <UserPlus size={20} strokeWidth={3} />
          <span className="mt-1 px-2 text-xs text-center text-white bg-black rounded-lg">
            ADD
          </span>
        </div>
        <div className="flex flex-col justify-center cursor-pointer text-sm bg-white h-14 aspect-video p-2 px-4 rounded-xl bg-muted border">
          <div className="flex items-center">
            <User size={18} strokeWidth={3} className="mr-1" /> Jatin K
          </div>
          <span className="text-xs text-foreground/50">99XX789789</span>
        </div>
        <div className="flex flex-col items-center justify-center cursor-pointer bg-white h-14 aspect-square p-2 rounded-xl bg-muted border">
          <ClipboardPen size={20} strokeWidth={3} />
          <span className="mt-1 px-2 text-xs text-center text-white bg-black rounded-lg">
            <Check size={16} />
          </span>
        </div>
      </div>
    </>
  );
}

function POSordertype() {
  return (
    <ToggleGroup type="single" variant="outline" className="w-full mb-2 p-1">
      <ToggleGroupItem value="bold" className="bg-white w-full">
        <UtensilsCrossed className="w-3.5 h-3.5 mr-1" />
        <p className="hidden md:block">DineIn</p>
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" className="bg-white w-full">
        <Package className="w-3.5 h-3.5 mr-1" />
        <p className="hidden md:block">Takeaway</p>
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" className="bg-white w-full">
        <Bike className="w-3.5 h-3.5 mr-1" />
        <p className="hidden md:block">Delivery</p>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

function POSaddeditem() {
  return (
    // <div className="flex items-center justify-between" key={key}>
    //   <p className="font-medium flex items-center">
    //     <Image src="/veg.svg" alt="Dash" height="16" width="16" />
    //     <span className="text-muted-foreground ml-2 mr-1">
    //       {item.quantity} x
    //     </span>
    //     {item.food_item.name} {item.variant ? `- ${item.variant}` : ""}
    //   </p>
    //   {item.addons && (
    //     <span className="text-sm text-muted-foreground">
    //       {item.addons.map((addon) => addon.name).join(", ")}
    //     </span>
    //   )}
    //   <span className="flex items-center text-base font-medium">
    //     ₹{item.totalPrice}
    //   </span>
    // </div>
    //
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium flex">
          <Image
            src="/veg.svg"
            alt="Dash"
            height="16"
            width="16"
            className="mt-1.5 mr-1 h-3.5 w-3.5"
          />
          Panner Butter Masala - Full
        </p>
        <span className="text-sm text-muted-foreground">
          Extra Cheese, Extra Butter
        </span>
      </div>
      <div>
        <SetQuantity />
        <span className="flex items-center text-base font-medium">₹199</span>
      </div>
    </div>
  );
}
