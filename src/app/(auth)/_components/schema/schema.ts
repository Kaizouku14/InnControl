import { z } from 'zod'


export const loginSchema = z.object({
    email: z.string().email().min(1, { message : "Email is required"}),
    password: z.string().min(8, { message : "Password must at least 8 characters"}),
})

export type Login = typeof loginSchema;

