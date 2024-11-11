import { z } from "zod";

export const bookingSchema = z.object({
  //room validation
  room_no: z.string().min(1, { message: "Room no is required" }),
  room_type: z.string().min(1, { message: "Room type is required" }),

  //guest validation
  last_name: z.string().min(1, { message: "Last name is required" }),
  first_name: z.string().min(1, { message: "First name is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  contact_no: z.string().min(1, { message: "Contact no is required" }),
  address: z.string().min(1, { message: "Address is required" }),

  //transaction validation
  checkin_date: z.date(),
  checkout_date: z.date(),
  number_of_nights: z
    .string()
    .min(1, { message: "Number of nights is required" }),
  additional_service: z.string(),
  booking_type: z.string().min(1, { message: "Booking type is required" }),
  payment_type: z.string().min(1, { message: "Payment type is required" }),
});

export type Register = typeof bookingSchema;
