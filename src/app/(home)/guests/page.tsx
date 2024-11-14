import React from 'react'
import { DataTable } from './_components/table/data-table'
import { columns } from './_components/table/columns'

const Page = () => {
  return (
    <div><DataTable columns={columns} data={[]}/></div>
  )
}

export default Page