import Analytics from "./analytics";
import { getSession } from "@/lib/auth/session";
import { apiGet } from "@/handlers/apiHandler";

export const title = "Payouts Finance";
export const description = "An interactive bar chart";

export default async function PayoutsFinancePage() {
  const user = await getSession();
  const dashboardData = await apiGet("/api/shop/get-payments/90", {
      headers: {
          Authorization: `Bearer ${user?.tokens?.access}`,
      },
  });
  const { orders_by_day, payouts_by_day } = dashboardData;
  
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-y-scroll">
      <div className="hidden flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Orders</h1>
      </div>
      <Analytics chartData={orders_by_day} tableData={payouts_by_day} />
    </main>
  );
}
