import OrderTable from "./data";
import { getOrders } from "@/lib/orders/getOrder";

export default async function Dashboard({ searchParams }) {
  const range = await searchParams;
  const response = await getOrders(range);
  console.log(response, "response");
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-y-scroll">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Orders</h1>
      </div>
      <OrderTable searchParams={range} data={response.results} />
    </main>
  );
}
