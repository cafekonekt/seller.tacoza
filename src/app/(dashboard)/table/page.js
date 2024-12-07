// components
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import QrDialog from "@/app/features/table/components/QR";
import { AddTable } from "@/app/features/table/components/AddTable";
import { AddArea } from "@/app/features/table/components/AddArea";
import { DeleteTable } from "@/app/features/table/components/DeleteTable";
import ErrorComponent from "@/components/ErrorComponent";
// server actions
import { getTables } from "@/app/features/table/server/actions/getTable";
import { getArea } from "@/app/features/table/server/actions/getArea";

export const metadata = {
  title: "Tables - tacoza Seller",
  description: "tacoza Seller Dashboard",
};

export function TableList({ tables }) {
  return (
    <Card className="py-8">
      <CardContent>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Area</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tables &&
              tables.map((name) => (
                <TableRow key={name.name}>
                  <TableCell className="font-medium">{name.name}</TableCell>
                  <TableCell>{name.capacity}</TableCell>
                  <TableCell>{name.area}</TableCell>
                  <TableCell className="justify-end flex gap-2">
                    <QrDialog table={name} />
                    <DeleteTable tableId={name.table_id} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default async function TablePage() {
  const promiseTables = getTables();
  const promiseAreas = getArea();
  const [[errorTables, tables], [errorAreas, areas]] = await Promise.all([promiseTables, promiseAreas]);
  const error = errorTables || errorAreas;
  if (error) return <ErrorComponent error={error} />
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Table Management</h1>
        <div className="flex items-center gap-4 ml-auto">
          <AddTable areas={areas} />
          <AddArea />
        </div>
      </div>
      <TableList tables={tables} />
    </main>
  );
}
