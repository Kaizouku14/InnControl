
import { hashPassword } from "@/lib/utils";
import { db } from "@/server/db";
import { users } from "@/server/db/schema/user";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";

export const createUser = async ({
    ...props
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    contact_no: string;
    department : "housekeeping" | "frontdesk" | "IT-support";
  }) => {
  
    const [userFound] = await db
      .select()
      .from(users)
      .where(eq(users.email, props.email));
  
    if (userFound) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "User already exists",
      });
    }
  
    const hashedPassword = await hashPassword(props.password);
    const userId = generateIdFromEntropySize(16);
  
    await db
      .insert(users)
      .values({
        id : userId,
        ...props,
        password: hashedPassword
      })
      .execute();
  };
  