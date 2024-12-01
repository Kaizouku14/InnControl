"use client"

import { ChevronRight } from "lucide-react";
import { DataTable } from "./_components/table/data-table";
import { columns } from "./_components/table/columns";
import { api } from "@/app/_trpc/client";
import TableSkeleton from "../../_components/skeleton/skeleton";

const Page = () => {
  const { data , isLoading , refetch } = api.lostAndFound.getAllLostItems.useQuery();

  if(isLoading) return <TableSkeleton/>

  const transformedData = data && data.map((item) => ({
    ...item,
    item_img: item.item_img ?? undefined,
  }));

  return (
    <div className="flex flex-col p-1 w-full">
      <div className="flex items-center gap-x-1">
        <span className="font-medium">InnControl</span>
        <ChevronRight size={19} />
        <span className="font-medium">Lost & Found Management</span>
      </div>
      <div className="flex-1 flex flex-col gap-y-4 py-3 md:mr-8 mr-12">
        {transformedData && <DataTable columns={columns} data={transformedData} refetch={refetch}/>}
      </div>
    </div>
  );
};

export default Page;
