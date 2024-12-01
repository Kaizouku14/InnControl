import { z } from "zod";

export const accountFormSchema = z.object({
  firstName: z.string().min(1, { message: "username is required." }).max(30, {
    message: "Name must not be longer than 30 characters.",
  }),
  lastName: z.string().min(1, { message: "username is required." }).max(30, {
    message: "Name must not be longer than 30 characters.",
  }),
  address : z.string().min(1, { message: "Address is required." }),
  contact_no : z.string().min(1, { message : "Contact no. is required"}),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string(),
  newPassword: z.string(),
});

export type accountFormSchema = typeof accountFormSchema;
