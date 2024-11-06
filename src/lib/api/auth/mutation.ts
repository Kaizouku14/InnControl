import { lucia } from "@/lib/auth/lucia";
import { hashPassword, verifyPassword } from "@/lib/utils";
import { db, eq } from "@/server/db";
import { users } from "@/server/db/schema/user";
import { TRPCError } from "@trpc/server";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";

export const login = async ({
  ...props
}: {
  email: string;
  password: string;
}) => {
  const { email, password } = props;

  const [userFound] = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (!userFound) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "User not found",
    });
  }

  const isPasswordMatch = await verifyPassword(
    userFound.password,
    password
  );

  if (!isPasswordMatch) {
    throw new TRPCError({
       code: 'CONFLICT',
       message: "Invalid password!",       
    });
  } 


  const session = await lucia.createSession(userFound.id, {});
  const sessionCookies = lucia.createSessionCookie(session.id);

  (await cookies()).set(lucia.sessionCookieName, sessionCookies.value, {
    ...sessionCookies.attributes,
  });
};

export const register = async ({
  ...props
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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
      ...props,
      id : userId,
      password: hashedPassword,
      role: "user",
      address: "",
      contact_no: "",
      department: "",
      shift: "day",
    })
    .execute();
};