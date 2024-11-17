import { ChartFinanceComponent } from "./chart";
import { PayoutsFinanceTable } from "./table";

export default async function PayoutsFinancePage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-y-scroll">
      <div className="hidden flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Orders</h1>
      </div>
      <ChartFinanceComponent />
      <PayoutsFinanceTable />
    </main>
  );
}
