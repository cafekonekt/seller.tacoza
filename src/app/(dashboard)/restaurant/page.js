// components
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RestaurantManagement } from "@/app/features/restaurant/components/RestaurantManagement";
import { RestaurantDocument } from "@/app/features/restaurant/components/RestaurantDocument";
import { RestaurantGallery } from "@/app/features/restaurant/components/RestaurantGallery";
import { RestaurantPayment } from "@/app/features/restaurant/components/RestaurantPayment";
import ErrorComponent from "@/components/ErrorComponent";
// server actions
import { getOutlet } from "@/app/features/restaurant/server/actions/getOutlet";

export const metadata = {
  title: "Manage Restaurant - tacoza Seller",
  description: "tacoza Seller Dashboard",
};

export default async function Manage() {
  const [error, outlet] = await getOutlet();
  if (error) return <ErrorComponent error={error} />

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-y-scroll">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Manage Restaurant</h1>
      </div>
      <Tabs defaultValue="info" className="w-full">
        <TabsList>
          <TabsTrigger value="info">Restaurant Management</TabsTrigger>
          <TabsTrigger value="hour">Images</TabsTrigger>
          <TabsTrigger value="documents">Documnets</TabsTrigger>
          <TabsTrigger value="payment">Payments</TabsTrigger>
        </TabsList>
        <RestaurantManagement outlet={outlet} />
        <RestaurantGallery outlet={outlet} />
        <RestaurantDocument />
        <RestaurantPayment />
      </Tabs>
    </main>
  );
}
