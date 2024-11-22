"use client";

import { Row } from "@tanstack/react-table";
import { Ban, BookOpenCheck, MoreHorizontal, Pencil } from "lucide-react";
import { transactionSchema } from "../schema/transaction-table-schema";
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
  const task = transactionSchema.parse(row.original);

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
          <span>Processed</span>
          <BookOpenCheck />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex justify-between">
          <span>Canceled</span>
          <Ban />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );  
}
