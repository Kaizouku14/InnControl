"use client";

import React from "react";
import { DataTable } from "./_components/table/data-table";
import { columns } from "./_components/table/columns";
import { ChevronRight } from "lucide-react";
import { api } from "@/app/_trpc/client";
import TableSkeleton from "../../_components/skeleton/skeleton";

const Page = () => {
  const { data, isLoading, refetch } = api.guest.getAllGuest.useQuery();

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="flex flex-col p-1 w-full">
      <div className="flex items-center gap-x-1">
        <span className="font-medium">InnControl</span>
        <ChevronRight size={19} />
        <span className="font-medium">Guest</span>
      </div>
      <div className="flex-1 py-3 md:mr-8 mr-12 mt-6">
        {data && <DataTable columns={columns} data={data} refetch={refetch} />}
      </div>
    </div>
  );
};

export default Page;
