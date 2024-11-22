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
  check_in: z.date(),
  check_out: z.date(),
  additional_services: z.enum(["Breakfast"]).nullable(),
  booking_type: z.enum(["Online", "Walk-in",]),
  payment_method: z.enum(["Cash", "Credit-card", "E-Cash",]),
  discount: z.enum(['pwd', 'senior']).nullable(),
});

export type Register = typeof bookingSchema;
