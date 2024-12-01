"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal, Undo2 , Trash} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { lostAndFoundSchema } from "../schema/table-schema";
import { api } from "@/app/_trpc/client";
import { toast } from "sonner";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = lostAndFoundSchema.parse(row.original);

  const returnItemMutation = api.lostAndFound.returnLostItem.useMutation();
  const handleReturnItem = () => {
    toast.promise(returnItemMutation.mutateAsync({ lost_item_id: task.lost_item_id }), {
      loading: "Returning item...",
      success: () => "Item returned successfully",
      error : (error: unknown) => {
        return (error as Error).message
      }
    })
  }

  const disposeItemMutation = api.lostAndFound.disposeLostItem.useMutation();
  const handleDisposeItem = () => {
    toast.promise(disposeItemMutation.mutateAsync({ lost_item_id: task.lost_item_id }), {
      loading: "Disposing item...",
      success: () => "Item Disposed successfully",
      error : (error: unknown) => {
        return (error as Error).message
      }
    })
  } 

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
        <DropdownMenuItem className="flex justify-between" onClick={handleReturnItem}>
          <span>Return</span>
          <Undo2 />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex justify-between" onClick={handleDisposeItem}>
          <span>Disposed</span>
          <Trash />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
