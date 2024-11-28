"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "../schema/user-table-schema";
import { DataTableColumnHeader } from "../../../../_components/table/data-table-column-header";
import { DataTableRowActions } from "./users-table-row-actions";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("lastName")}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
    cell: ({ row }) => (
      <span className="max-w-[200px] truncate font-medium">
        {row.getValue("firstName")}
      </span>
    ),
  },
  {
    accessorKey: "email",
    header: () => <div>Email Address</div>,
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "address",
    header: () => <div>Address</div>,
    cell: ({ row }) => <div>{row.getValue("address")}</div>,
  },
  {
    accessorKey: "contact_no",
    header: () => <div>Contact No.</div>,
    cell: ({ row }) => <div>{row.getValue("contact_no")}</div>,
  },
  {
    accessorKey: "department",
    header: () => <div>Department</div>,
    cell: ({ row }) => {
      return (
        <Badge
          variant="secondary"
          className={`${
            row.getValue("department") === "frontdesk"
              ? "bg-green-100 text-green-800 hover:bg-green-200"
              : row.getValue("department") === "housekeeping"
              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
              : "bg-red-100 text-red-800 hover:bg-red-200"
          } px-3 py-1 rounded-lg transition-colors duration-300`}
        >
          {row.getValue("department")}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
