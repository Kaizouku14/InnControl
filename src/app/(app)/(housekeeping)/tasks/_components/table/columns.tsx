"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "../../../../_components/table/data-table-column-header";
import { DataTableRowActions } from "./task-table-row-actions";
import { Task } from "../schema/table-schema";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "room_no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Room No." />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("room_no")}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "floor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Room Floor" />
    ),
    cell: ({ row }) => (
      <span className="max-w-[200px] truncate font-medium">
        {row.getValue("floor")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: () => (
      <DataTableColumnHeader  title="Status" />
    ),
    cell: ({ row }) => (
      <Badge
        variant="secondary"
        className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 px-3 py-1 rounded-lg transition-colors duration-300"
      >
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />, 
  },
];
