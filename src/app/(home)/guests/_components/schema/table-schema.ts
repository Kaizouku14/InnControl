import { z } from "zod";

export const guestSchema = z.object({
  guest_id: z.number(),
  first_name: z.string(),
  last_name : z.string(),
  email : z.string(),
  address : z.string(),
  contact_no : z.string(),
});

export type Guest = z.infer<typeof guestSchema>;
