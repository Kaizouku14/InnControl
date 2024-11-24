"use client";

import { ChevronRight } from "lucide-react";
import BlobProviderComponent from "./_components/blob-provider";
import { DataTable } from "./_components/table/data-table";
import { columns } from "./_components/table/columns";
import { api } from "@/app/_trpc/client";
import TableSkeleton from "../_components/skeleton/skeleton";

const Page = () => {
  const { data, isLoading } = api.transaction.getAllTransaction.useQuery();

  if (isLoading) return <TableSkeleton/>;

  const processedData = data?.filter(({ status }) => {
    return status === "processed";
  });

  return (
    <div className="flex p-1 w-full flex-col gap-4">
      <div className="flex items-center gap-x-1">
        <span className="font-medium">InnControl</span>
        <ChevronRight size={19} />
        <span className="font-medium">Reports</span>
      </div>

      <div className="flex-1 flex flex-col gap-y-4 py-3  mr-12">
        <div className="flex flex-col gap-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Transaction Reports</h1>
            <BlobProviderComponent transactions={processedData} />
          </div>
          {processedData && (
            <DataTable columns={columns} data={processedData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
