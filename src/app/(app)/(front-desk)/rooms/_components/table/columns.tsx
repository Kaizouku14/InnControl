"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Room } from "../../schema/table-schema";
import { DataTableColumnHeader } from "../../../../_components/table/data-table-column-header";
import { DataTableRowActions } from "./room-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Room>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "room_no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Room No" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("room_no")}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Room Type" />
    ),
    cell: ({ row }) => (
      <span className="max-w-[200px] truncate font-medium">
        {row.getValue("type")}
      </span>
    ),
  },
  {
    accessorKey: "rate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rate" />
    ),
    cell: ({ row }) => <div>{row.getValue("rate")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <Badge
          variant="secondary"
          className={`${
            row.getValue("status") === "available"
              ? "bg-green-100 text-green-800 hover:bg-green-200"
              : row.getValue("status") === "dirty"
              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
              : "bg-red-100 text-red-800 hover:bg-red-200"
          } px-3 py-1 rounded-lg transition-colors duration-300`}
        >
          {row.getValue("status")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "floor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Floor" />
    ),
    cell: ({ row }) => <div>{row.getValue("floor")}</div>,
  },
  {
    accessorKey: "capacity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Capacity" />
    ),
    cell: ({ row }) => <div>{row.getValue("capacity")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
