"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../../../_components/table/data-table-column-header";
import { DataTableRowActions } from "./lost-item-table-row-actions";
import { Badge } from "@/components/ui/badge";
import { LostItem } from "../schema/table-schema";
import ImageDialog from "../image-dialog";

export const columns: ColumnDef<LostItem>[] = [
  {
    accessorKey: "item_lost",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lost Item" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("item_lost")}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "room_no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Room Found" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("room_no")}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "item_color",
    header: () => <DataTableColumnHeader title="Item Color" />,
    cell: ({ row }) => (
      <span className="max-w-[200px] truncate font-medium">
        {row.getValue("item_color")}
      </span>
    ),
  },
  {
    accessorKey: "issued_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="issued_date" />
    ),
    cell: ({ row }) => <div>{row.getValue("issued_date")}</div>,
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
            row.getValue("status") === "returned"
              ? "bg-green-100 text-green-800 hover:bg-green-200"
              : row.getValue("status") === "disposed"
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
    accessorKey: "item_img",
    header: () => <DataTableColumnHeader title="Item Image" />,
    cell: ({ row }) => (
      <div>
        {row.getValue("item_img") ? (
           <ImageDialog item_image={row.getValue("item_img") as string}/>
         ) : (
          <p className="text-muted-foreground text-xs">No image found.</p>
        )}
      </div>
       
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
