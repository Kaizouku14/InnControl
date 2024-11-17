import { z } from 'zod'

export const createUserSchema = z.object({
    firstName: z.string().min(1, { message : "First name is required"}),
    lastName: z.string().min(1, { message : "Last name is required"}),
    email: z.string().email().min(1, { message : "Email is required"}),
    password: z.string().min(8, { message : "Password must at least 8 characters"}),
    address : z.string().min(1, { message : "Address is required"}),
    contact_no : z.string().min(1, { message : "Contact no is required"}),
    department : z.enum(["housekeeping", "frontdesk", "IT-support"])
})

export type User = z.infer<typeof createUserSchema>;



