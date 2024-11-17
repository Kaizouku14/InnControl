import { lucia } from "@/lib/auth/lucia";
import { verifyPassword } from "@/lib/utils";
import { db, eq } from "@/server/db";
import { users } from "@/server/db/schema/user";
import { TRPCError } from "@trpc/server";
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

