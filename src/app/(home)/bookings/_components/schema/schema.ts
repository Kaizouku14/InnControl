import { z } from "zod";

export const bookingSchema = z.object({
  //room validation
  room_no: z.string().min(1, { message: "room no is required" }),
  room_type: z.string().min(1, { message: "room type is required" }),

  //guest validation
  last_name: z.string().min(1, { message: "last name is required" }),
  first_name: z.string().min(1, { message: "first name is required" }),
  email: z.string().min(1, { message: "email is required" }),
  contact_no: z.string().min(1, { message: "contact no is required" }),
  address: z.string().min(1, { message: "address is required" }),

  //transaction validation
  checkin_date: z.date(),
  checkout_date: z.date(),
  number_of_nights: z.string().min(1, { message: "number of nights is required" }),
  additional_service: z
    .string()
    .min(1, { message: "additional service is required" }),
  booking_type: z.string().min(1, { message: "booking type is required" }),
  payment_type : z.string().min(1, { message : "payment type is required"})
});

export type Register = typeof bookingSchema;
