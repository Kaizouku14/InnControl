"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "./item-table-row-actions";
import { Badge } from "@/components/ui/badge";
import { Inventory } from "../schema/inventory-table-schema";
import { DataTableColumnHeader } from "@/app/(app)/_components/table/data-table-column-header";

export const columns: ColumnDef<Inventory>[] = [
  {
    accessorKey: "item_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Item ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("item_id")}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "item_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Item Name" />
    ),
    cell: ({ row }) => (
      <span className="max-w-[200px] truncate font-medium">
        {row.getValue("item_name")}
      </span>
    ),
  },
  {
    accessorKey: "category",
    header: () => <DataTableColumnHeader title="category" />,
    cell: ({ row }) => {
      return (
        <Badge
          variant="secondary"
          className={`bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1 rounded-lg transition-colors duration-300`}
        >
          {row.getValue("category")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: () => <DataTableColumnHeader title="Quantity" />,
    cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
  },
  {
    accessorKey: "location",
    header: () => <DataTableColumnHeader title="Location" />,
    cell: ({ row }) => <div>{row.getValue("location")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
