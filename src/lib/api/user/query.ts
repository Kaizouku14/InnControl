import { db, eq } from "@/server/db";
import { users } from "@/server/db/schema/user";
import { TRPCError } from "@trpc/server";

export const userData = async (id: string | undefined) => {
  if (!id) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "User ID is required",
    });
  }

  const [userFound] = await db.select().from(users).where(eq(users.id, id));

  if (!userFound) {
    throw new TRPCError({
      message: "User not found",
      code: "NOT_FOUND",
    });
  }

  return userFound;
};
