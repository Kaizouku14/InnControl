"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "../schema/transaction-table-schema";
import { DataTableColumnHeader } from "@/app/(app)/_components/table/data-table-column-header";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "guest_fullname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Guest Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("guest_fullname")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "room_no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Room Booked" />
    ),
    cell: ({ row }) => <div className="ml-6">{row.getValue("room_no")}</div>,
  },
  {
    accessorKey: "check_in",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Checked In" />
    ),
    cell: ({ row }) => <div>{row.getValue("check_in")}</div>,
  },
  {
    accessorKey: "check_out",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Checked Out" />
    ),
    cell: ({ row }) => <div>{row.getValue("check_out")}</div>,
  },
  {
    accessorKey: "no_of_nights",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No. of Nights" />
    ),
    cell: ({ row }) => (
      <div className="ml-8">{row.getValue("no_of_nights")}</div>
    ),
  },
  {
    accessorKey: "payment_amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Amount" />
    ),
    cell: ({ row }) => <div>{row.getValue("payment_amount")}</div>,
  },
  {
    accessorKey: "payment_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Date" />
    ),
    cell: ({ row }) => <div>{row.getValue("payment_date")}</div>,
  },
  {
    accessorKey: "payment_method",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Method" />
    ),
    cell: ({ row }) => <div>{row.getValue("payment_method")}</div>,
  },
  {
    accessorKey: "booking_type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Booking Type" />
    ),
    cell: ({ row }) => <div>{row.getValue("booking_type")}</div>,
  },
  {
    accessorKey: "additional_service",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Service" />
    ),
    cell: ({ row }) => <div>{row.getValue("additional_service") || "N/A"}</div>,
  },
  {
    accessorKey: "outstanding_balance",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Balance" />
    ),
    cell: ({ row }) => (
      <div className="ml-4">{row.getValue("outstanding_balance") || "N/A"}</div>
    ),
  },
  {
    accessorKey: "discount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Discount" />
    ),
    cell: ({ row }) => <div>{row.getValue("discount") || "N/A"}</div>,
  },
];
