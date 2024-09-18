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

import QrDialog from "./qr";
import { getTables } from "@/lib/table/getTable";
import { getArea } from "@/lib/table/getArea";
import { AddTable } from "./AddTable";
import { AddArea } from "./AddArea";
import { DeleteTable } from "./DeleteTable";

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
            {tables && tables.map((name) => (
              <TableRow key={name.name}>
                <TableCell className="font-medium">{name.name}</TableCell>
                <TableCell>{name.capacity}</TableCell>
                <TableCell>{name.area}</TableCell>
                <TableCell className="justify-end flex gap-2">
                  <QrDialog table={name} />        
                  <DeleteTable tableId={name.id} />
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
  const response_tables = getTables();
  const response_ares = getArea();
  const [tables, areas] = await Promise.all([response_tables, response_ares]);

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
