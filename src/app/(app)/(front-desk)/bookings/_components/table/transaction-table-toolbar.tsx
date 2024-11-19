"use client";

import { Table } from "@tanstack/react-table";
import { DataTableViewOptions } from "../../../../_components/table/data-table-view-options"
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "@/app/(app)/_components/table/data-table-faceted-filter";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { bookingType, TransactionStatus } from "@/lib/helper/objects";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search guest..."
          value={(table.getColumn("guest_fullname")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("guest_fullname")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={TransactionStatus}
          />
        )}
        {table.getColumn("booking_type") && (
          <DataTableFacetedFilter
            column={table.getColumn("booking_type")}
            title="Booking Type"
            options={bookingType}
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
      <DataTableViewOptions table={table} />
    </div>
  );
}
