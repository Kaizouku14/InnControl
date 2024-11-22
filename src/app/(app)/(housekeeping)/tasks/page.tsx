"use client"

import { ChevronRight } from 'lucide-react'
import React from 'react'
import { columns } from './_components/table/columns'
import { DataTable } from './_components/table/data-table'
import { api } from '@/app/_trpc/client'
import TableSkeleton from '../../_components/skeleton/skeleton'

const Page = () => {
  const { data, isLoading } = api.task.getAllDirtyRooms.useQuery();

   if(isLoading) return <TableSkeleton />
  
  return (
    <div className='flex p-1 w-full flex-col'>
       <div className="flex items-center gap-x-1">
        <span className="font-medium">InnControl</span>
        <ChevronRight size={19} />
        <span className="font-medium">Task</span>
      </div>

      <div className="flex-1 flex flex-col py-3 md:mr-8 mr-12 mt-6">
        <h1 className="text-2xl font-bold">Task</h1>
        {data && <DataTable columns={columns} data={data} />}
      </div>
    </div>
  )
}

export default Page