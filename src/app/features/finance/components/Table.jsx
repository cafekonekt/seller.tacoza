import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// server actions
import { getOrderByDate } from "@/app/features/finance/server/actions/getOrder";

export function PayoutsFinanceTable({ selectedDate, orders }) {
  const paymentStatus = {
    success: "success",
    pending: "pending",
    active: "incomplete",
    failed: "failed",
  };
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold">Orders for {selectedDate}</h2>
      <Table>
        <TableCaption>
          A list of your recent orders for the selected day.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.orders?.map((order) => (
            <TableRow key={order.order_id}>
              <TableCell className="font-medium">
                {order.order_id.split("-")[0]}
              </TableCell>
              <TableCell>{paymentStatus[order.payment_status]}</TableCell>
              <TableCell>{order.payment_method}</TableCell>
              <TableCell className="text-right">{order.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {orders?.payout && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total Amount</TableCell>
              <TableCell className="text-right">
                INR {orders?.payout?.amount?.toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>PG Charges + Tax</TableCell>
              <TableCell className="text-right">
                INR -
                {(
                  orders?.payout?.amount * 0.0199 +
                  orders?.payout?.amount * 0.0199 * 0.18
                ).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Total Payout Amount</TableCell>
              <TableCell className="text-right">
                INR{" "}
                {orders?.payout?.amount?.toFixed(2) -
                  (
                    orders?.payout?.amount * 0.0199 +
                    orders?.payout?.amount * 0.0199 * 0.18
                  ).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Payout Status</TableCell>
              <TableCell className="text-right">
                {orders?.payout?.status?.toUpperCase()}
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
}
