import { getOrders } from "@/app/features/orders/server/actions/getOrder";
import OrderTable from "@/app/features/orders/components/OrderTable";
import ErrorComponent from "@/components/ErrorComponent";

export default async function Dashboard({ searchParams }) {
  const range = await searchParams;
  const [error, response] = await getOrders(range);
  
  if (error) return <ErrorComponent error={error} />

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-y-scroll">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Orders</h1>
      </div>
      <OrderTable searchParams={range} data={response.results} />
    </main>
  );
}
