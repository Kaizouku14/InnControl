"use client";

import { Row } from "@tanstack/react-table";
import { CircleCheckBig, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { taskSchema } from "../schema/table-schema";
import { api } from "@/app/_trpc/client";
import { toast } from "sonner";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original);
  const markAsDoneMutation = api.task.markAsDone.useMutation();

  const handleMarkAsDone = () => {
    toast.promise(markAsDoneMutation.mutateAsync({ room_id: task.room_id }), {
       error: (error: unknown) => {
          return (error as Error).message;
       }
    })
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
        <DropdownMenuItem className="flex gap-x-2.5" onClick={handleMarkAsDone}>
         <CircleCheckBig />
          <span>Mark us done</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
