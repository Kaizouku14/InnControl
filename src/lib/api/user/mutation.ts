import { hashPassword, verifyPassword } from "@/lib/utils";
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
  department: "housekeeping" | "frontdesk" | "IT-support";
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
      id: userId,
      ...props,
      password: hashedPassword,
    })
    .execute();
};

export const udpateUserInfo = async ({
  ...data
}: {
  userId?: string;
  firstName: string;
  lastName: string;
  address: string;
  contact_no: string;
  email: string;
  password?: string;
  newPassword?: string;
}) => {
  const {
    userId,
    firstName,
    lastName,
    address,
    contact_no,
    email,
    password,
    newPassword,
  } = data;

  const [userFound] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId!))
    .limit(1)
    .execute();

  if (!userFound) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Account not found`,
    });
  }

  if ((password && !newPassword) || (!password && newPassword)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Both current password and new password must be provided, or neither.`,
    });
  }

  if (!password && !newPassword) {
    return await db
      .update(users)
      .set({ firstName, lastName, address, contact_no, email })
      .where(eq(users.id, userId!))
      .execute();
  }

  if (newPassword!.length < 6) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Password must at least 6 catcharacters long.`,
    });
  }

  const isPasswordValid = await verifyPassword(
    newPassword!,
    userFound.password
  );
  if (!isPasswordValid) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: `Invalid current password`,
    });
  }

  const newHashesPassword = await hashPassword(newPassword!);
  await db
    .update(users)
    .set({ password: newHashesPassword })
    .where(eq(users.id, userId!))
    .execute();
};
