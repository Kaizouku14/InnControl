"use client";

import { Table } from "@tanstack/react-table";
import { DataTableViewOptions } from "../../../../_components/table/data-table-view-options"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  refetch : () => Promise<unknown>
}

export function DataTableToolbar<TData>({
  table,
  refetch
}: DataTableToolbarProps<TData>) {

  return (
    <div className="flex items-center justify-between gap-x-2">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search last name..."
          value={(table.getColumn("room_no")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("room_no")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <Button variant={"outline"} size="sm" onClick={() => refetch()}>
        <RefreshCcw />
        <span>Refresh</span>
      </Button>
      <DataTableViewOptions table={table} />
    </div>
  );
}
