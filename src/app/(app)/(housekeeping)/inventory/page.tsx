"use client";

import { ChevronRight } from "lucide-react";
import React from "react";
import { DataTable } from "./_components/table/data-table";
import { columns } from "./_components/table/columns";
import InventoryForm from "./_components/form/inventory-form";
import { api } from "@/app/_trpc/client";
import TableSkeleton from "../../_components/skeleton/skeleton";

const Page = () => {
  const { data, isLoading } = api.inventory.getAllItems.useQuery();

  if(isLoading) return <TableSkeleton />

  return (
    <div className="flex p-1 w-full flex-col gap-2">
      <div className="flex items-center gap-x-1">
        <span className="font-medium">InnControl</span>
        <ChevronRight size={19} />
        <span className="font-medium">Inventory</span>
      </div>
      <div>
        <InventoryForm />
       {data && <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
};

export default Page;
