"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Guest } from "../schema/table-schema";
import { DataTableColumnHeader } from "../../../../_components/table/data-table-column-header";
import { DataTableRowActions } from "./guest-table-row-actions";

export const columns: ColumnDef<Guest>[] = [
  {
    accessorKey: "last_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("last_name")}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "first_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
    cell: ({ row }) => (
      <span className="max-w-[200px] truncate font-medium">
        {row.getValue("first_name")}
      </span>
    ),
  },
  {
    accessorKey: "email",
    header: () => (
      <DataTableColumnHeader title="Email Address" />
    ),
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "address",
    header: () => (
      <DataTableColumnHeader  title="Address" />
    ),
    cell: ({ row }) => <div>{row.getValue("address")}</div>,
  },
  {
    accessorKey: "contact_no",
    header: () => (
      <DataTableColumnHeader  title="Contact No." />
    ),
    cell: ({ row }) => <div>{row.getValue("contact_no")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
