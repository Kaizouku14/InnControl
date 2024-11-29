"use client";

import { Table } from "@tanstack/react-table";
import { RefreshCcw, X } from "lucide-react";

import { DataTableViewOptions } from "../../../../_components/table/data-table-view-options"

import { DataTableFacetedFilter } from "../../../../_components/table/data-table-faceted-filter";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { department } from "@/lib/helper/objects";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  refetch: () => Promise<unknown>;
}

export function DataTableToolbar<TData>({
  table,
  refetch
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between gap-x-2">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search last name..."
          value={(table.getColumn("lastName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("lastName")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("department") && (
          <DataTableFacetedFilter
            column={table.getColumn("department")}
            title="Department"
            options={department}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <Button variant={"outline"} size="sm" onClick={() => refetch()}>
        <RefreshCcw />
        <span>Refresh</span>
      </Button>
      <DataTableViewOptions table={table} />
    </div>
  );
}
