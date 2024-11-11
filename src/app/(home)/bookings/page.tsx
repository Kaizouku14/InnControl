import { ChevronRight } from 'lucide-react'
import React from 'react'

const Page = () => {
  return (
    <div className="flex flex-col h-screen  p-1">
       <div className='flex items-center gap-x-1'>
          <span className='font-medium'>Project Name</span>
          <ChevronRight size={19}/>
          <span className='font-medium'>Bookings</span>
       </div>

       <div className='flex-1 py-3'>
          dfdfd
       </div>
    </div>
  )
}

export default Page