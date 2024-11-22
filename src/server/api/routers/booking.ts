import { registerBooking } from "@/lib/api/app/booking/mutation";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { transaction } from "@/server/db/schema/transaction";
import { db } from "@/server/db";

export const bookingRouter = createTRPCRouter({
  getAllBooking: protectedProcedure.query(async () => {
    return await await db.select().from(transaction);
  }),

  createBooking: protectedProcedure
    .input(
      z.object({
        room_no: z.string().min(1),
        room_type: z.string().min(1),
        check_in: z.date({
          invalid_type_error: "That's not a date!",
        }),
        check_out: z.date({
          invalid_type_error: "That's not a date!",
        }),
        no_of_nights: z.number({
          invalid_type_error: "No.of nights must be a number",
        }),
        additional_services: z.enum(["Breakfast"]).optional().nullable(),
        booking_type: z.enum(["Online", "Walk-in"]),
        payment_method: z.enum(["Cash", "Credit-card", "E-Cash"]),
        payment_amount: z.number({
          invalid_type_error: "Payment amount must be a number",
        }),
        last_name: z.string().min(1),
        first_name: z.string().min(1),
        email: z.string().min(1),
        contact_no: z.string().min(1),
        address: z.string().min(1),
        discount: z.enum(["pwd", "senior"]).optional().nullable(),
      })
    )
    .mutation(async ({ input, ctx }) => {

      const updatedInput = {
        ...input,
        additional_services: input.additional_services || null,
        discount : input.discount || null
      };

      await registerBooking(updatedInput, ctx.user!.id);
    }),
});

export type BookingRouter = typeof bookingRouter;
