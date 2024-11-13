"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Room } from "../schema/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { Checkbox } from "@/components/ui/checkbox"

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
    accessorFn: (row) => row.room_no,

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Room No" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("room_no")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "type",
    accessorFn: (row) => row.type,

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
    accessorFn: (row) => row.rate,

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rate" />
    ),
    cell: ({ row }) => <div>{row.getValue("rate")}</div>,
  },
  {
    accessorKey: "status",
    accessorFn: (row) => row.status,

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return <div className="w-[100px]">{row.getValue("status")}</div>
    },
  },
  {
    accessorKey: "floor",
    accessorFn: (row) => row.floor,

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Floor" />
    ),
    cell: ({ row }) => <div>{row.getValue("floor")}</div>,
  },
  {
    accessorKey: "capacity",
    accessorFn: (row) => row.capacity,

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Capacity" />
    ),
    cell: ({ row }) => <div>{row.getValue("capacity")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
