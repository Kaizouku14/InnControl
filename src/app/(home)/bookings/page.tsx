import { ChevronRight } from 'lucide-react'
import React from 'react'
import BookingForm from './_components/forms/booking-form'

const Page = () => {
  return (
    <div className="flex flex-col p-1 w-full">
       <div className='flex items-center gap-x-1'>
          <span className='font-medium'>Project Name</span>
          <ChevronRight size={19}/>
          <span className='font-medium'>Bookings</span>
       </div>

       <div className='flex-1 py-3 md:mr-8 mr-6 '>
          <BookingForm/>
       </div>
    </div>
  )
}

export default Page