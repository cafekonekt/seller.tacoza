"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
// icons
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
// components
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DatePickerWithRange } from "@/components/ui/daterange-picker";
import { Badge } from "@/components/ui/badge";
// library
import { subDays, isWithinInterval, format } from "date-fns";


export const columns = [
  {
    accessorKey: "order_id",
    header: "Order ID",
    cell: ({ row }) => <div>{row.getValue("order_id")?.split("-")?.[0]}</div>,
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => <div>{row.getValue("user").name}</div>,
  },
  {
    accessorKey: "table",
    header: "Table",
    cell: ({ row }) => {
      const table = row.getValue("table");
      return <div>{table ? table : "N/A"}</div>;
    },
  },
  {
    accessorKey: "order_type",
    header: "Order Type",
    cell: ({ row }) => <Badge>{row.getValue("order_type")}</Badge>,
  },
  {
    accessorKey: "total",
    header: () => <div className="text-right">Total Amount</div>,
    cell: ({ row }) => {
      const total = row.getValue("total");
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(total);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className={`uppercase ${row.getValue("status") === 'pending' ? 'bg-yellow-500' : 'bg-green-500'} text-white font-bold text-sm px-2 p-1 rounded-xl w-28 text-center`}>
        {row.getValue("status")}
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Placed On",
    cell: ({ row }) => {
      const date = row.getValue("created_at");
      return <div>{format(new Date(date), "PPpp")}</div>;
    },
  },
  {
    accessorKey: "cooking_instructions",
    header: "Cooking Instructions",
    cell: ({ row }) => {
      const instructions = row.getValue("cooking_instructions");
      return <div>{instructions ? instructions : "None"}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(row.getValue("order_id"))}
          >
            Copy Order ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View Order Details</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];


export default function OrderTable({ searchParams, data }) {
  const router = useRouter(); // Initialize useRouter
  // Extract the 'from' and 'to' dates from the searchParams
  const fromUrl = searchParams?.from ? new Date(searchParams.from) : subDays(new Date(), 7);
  const toUrl = searchParams?.to ? new Date(searchParams.to) : new Date();

  const [sorting, setSorting] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [dateRange, setDateRange] = React.useState({ from: fromUrl, to: toUrl }); // Date range state

  const table = useReactTable({
    data, // Use server-side filtered data
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
  });

  const applyFilters = () => {
    const from = format(dateRange.from, "yyyy-MM-dd");
    const to = format(dateRange.to, "yyyy-MM-dd");
    router.push(`/orders/all?from=${from}&to=${to}`);
  };

  const handleClick = (row) => {
    router.push(`/orders/${row.getValue("order_id")}`);
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex flex-col md:flex-row items-center py-4 space-y-4 md:space-y-0 md:space-x-4">
        <Input
          placeholder="Filter order ID..."
          value={table.getColumn("order_id")?.getFilterValue() ?? ""}
          onChange={(event) => table.getColumn("order_id")?.setFilterValue(event.target.value)}
          className="max-w-sm flex-1"
        />
        <DatePickerWithRange
          date={dateRange} // Use the current date range
          setDate={setDateRange} // Set date via handler
        />
        <Button variant="primary" className="max-w-sm" onClick={applyFilters}>
          Apply Filters
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup, key) => (
              <TableRow key={key}>
                {headerGroup.headers.map((header, header_key) => (
                  <TableHead key={header_key}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, key) => (
                <TableRow key={key} data-state={row.getIsSelected() && "selected"} onClick={() => handleClick(row)}>
                  {row.getVisibleCells().map((cell, row_key) => (
                    <TableCell key={row_key}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 md:space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
