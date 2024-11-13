"use client"

import { ChevronRight } from "lucide-react";
import React from "react";
import { DataTable } from "./_components/table/data-table";
import { columns } from "./_components/table/columns";
import { api } from "@/app/_trpc/client";
import RoomsSkeleton from "./_components/skeleton/skeleton";

const Page = () => {
  const { data, isLoading } = api.rooms.getAllRooms.useQuery();
    
   if(isLoading) return <RoomsSkeleton/>

  return (
    <div className="flex flex-col p-1 w-full">
      <div className="flex items-center gap-x-1">
        <span className="font-medium">Project Name</span>
        <ChevronRight size={19} />
        <span className="font-medium">Rooms</span>
      </div>

      <div className="flex-1 flex-col py-3 md:mr-8 mr-12">
         <div>

         </div>

        {data && <DataTable columns={columns} data={data}/>}
      </div>
    </div>
  );
};

export default Page;
