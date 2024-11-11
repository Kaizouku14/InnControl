import { z } from 'zod'

export const bookingSchema = z.object({
    //room validation
   room_no : z.string().min(1, { message : "room no is required"}),  
   room_type : z.string().min(1, { message : "room type is required"}),
   
   //guest validation
   last_name : z.string().min(1, { message : "last name is required"}),
   first_name : z.string().min(1, { message : "first name is required"}),
   email : z.string().min(1, { message : "email is required"}),
   contact_no : z.string().min(1, { message : "contact no is required"}),
   address : z.string().min(1, { message : "address is required"}),   

   //transaction validation
   checkin_date : z.string().min(1, { message : "checkin date is required"}),
   checkout_date : z.string().min(1, { message : "checkout date is required"}),
   number_of_nights : z.number({
    required_error: "number of nights is required",
    invalid_type_error: "number of nights must be a number",
   }),
   additional_service : z.string().min(1, { message : "additional service is required"}),
   booking_type : z.string().min(1, { message : "booking type is required"}),
})

export type Register = typeof bookingSchema;
