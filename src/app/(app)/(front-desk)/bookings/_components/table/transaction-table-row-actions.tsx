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
import { api } from "@/app/_trpc/client";
import { toast } from "sonner";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = transactionSchema.parse(row.original);
  const processedMutation = api.transaction.processedTransaction.useMutation();

  const handleProcessedTransaction = () => {
    toast.promise(
      processedMutation.mutateAsync({
        transaction_id: task.transaction_id,
        room_no: task.room_no,
      }),
      {
        loading: "Processing...",
        success: "Transaction processed",
        error: (error: unknown) => {
          return (error as Error).message;
        },
      }
    );
  };

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
        <DropdownMenuItem
          className="flex justify-between"
          onClick={handleProcessedTransaction}
          disabled={task.status === "processed" || task.status === "canceled"}
        >
          <span>Processed</span>
          <BookOpenCheck />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex justify-between"
          disabled={task.status === "processed" || task.status === "canceled"}
        >
          <span>Canceled</span>
          <Ban />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
