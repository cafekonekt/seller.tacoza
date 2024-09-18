import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RestaurantManagement } from "./RestaurantManagement";
import { RestaurantDocument } from "./RestaurantDocument";
import { RestaurantGallery } from "./RestaurantGallery";
import { RestaurantPayment } from "./RestaurantPayment";
import { getOutlet } from "@/lib/outlet/getOutlet";

export default async function Manage() {
  const outlet = await getOutlet();
  console.log(outlet);
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
        <RestaurantManagement />
        <RestaurantGallery />
        <RestaurantDocument />
        <RestaurantPayment />
      </Tabs>
    </main>
  );
}
