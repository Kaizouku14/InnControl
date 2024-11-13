"use client";

import { Row } from "@tanstack/react-table";
import { Delete, MoreHorizontal, Pencil } from "lucide-react";

import { roomSchema } from "../../schema/schema";
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
  const task = roomSchema.parse(row.original);
  const deleteMutation = api.rooms.deleteRoom.useMutation();

  console.log(task.room_id);

  const handleOnDeleteRoom = () => {
    toast.promise(deleteMutation.mutateAsync({ room_id: task.room_id }), {
      error: (error: unknown) => {
        return (error as Error).message;
      },
    });
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
        <DropdownMenuItem className="flex justify-between">
          <span>Edit</span>
          <Pencil />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex justify-between"
          onClick={handleOnDeleteRoom}
        >
          <span>Delete</span>
          <Delete />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
