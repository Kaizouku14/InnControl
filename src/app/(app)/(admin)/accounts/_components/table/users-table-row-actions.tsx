"use client";

import { Row } from "@tanstack/react-table";
import { Delete, MoreHorizontal, Pencil } from "lucide-react";

import { userTableSchema } from "../schema/user-table-schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = userTableSchema.parse(row.original);
 
  console.log(task);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem className="flex justify-between">
          <span>Edit</span>
          <Pencil />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex justify-between"
        >
          <span>Delete</span>
          <Delete />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
