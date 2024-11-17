import { z } from 'zod'

export const registerSchema = z.object({
    firstName: z.string().min(1, { message : "First name is required"}),
    lastName: z.string().min(1, { message : "Last name is required"}),
    email: z.string().email().min(1, { message : "Email is required"}),
    password: z.string().min(8, { message : "Password must at least 8 characters"}),
})


export type Register = typeof registerSchema
