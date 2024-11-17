import { z } from 'zod'

export const userTableSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    address : z.string(),
    contact_no : z.string(),
    department : z.enum(["housekeeping", "frontdesk", "IT-support"])
})

export type User = z.infer<typeof userTableSchema>;

