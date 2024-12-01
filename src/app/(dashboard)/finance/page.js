// lib
import { getSession } from "@/lib/auth/session";
import { apiGet } from "@/handlers/apiHandler";
// components
import Analytics from "@/app/features/finance/components/Analytics";
import ErrorComponent from "@/components/ErrorComponent";
// server actions
import { getPayments } from "@/app/features/finance/server/actions/getPayments";

export const title = "Payouts Finance";
export const description = "An interactive bar chart";

export default async function PayoutsFinancePage() {
  const user = await getSession();
  const [error, dashboardData] = await getPayments();
  if (error) return <ErrorComponent error={error} />;
  
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
