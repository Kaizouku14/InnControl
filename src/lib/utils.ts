import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";
import { format, parseISO } from "date-fns";
import { TransactionData } from "@/interface/transaction";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Hash a plain password with bcrypt
 *
 * @param {string} plainPassword - The plain password to hash
 * @returns {Promise<string>} - The hashed password
 *
 * @throws {Error} - If there is an error hashing the password
 */

export const hashPassword = async (plainPassword: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(
      Number.parseInt(process.env.SALT_ROUNDS || "10", 10)
    );
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
  } catch (error: unknown) {
    console.log((error as Error).message);
    throw new Error("Error hashing password");
  }
};

/**
 * Verify a plain password against a stored hashed password
 *
 * @param {string} storedHashedPassword - The hashed password to verify against
 * @param {string} plainPassword - The plain password to verify
 * @returns {Promise<boolean>} - Whether or not the passwords match
 */
export const verifyPassword = async (
  storedHashedPassword: string,
  plainPassword: string
): Promise<boolean> => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, storedHashedPassword);
    return isMatch;
  } catch (error: unknown) {
    console.log((error as Error).message);
    throw new Error("Error verifying password");
  }
};

/**
 * Processes transactions to calculate visitor data per month.
 *
 * @param {TransactionData} param0 - An object containing an array of transactions.
 * @returns {Record<string, { months: string; visitors: number; fill: string }>}
 * - An object where each key is a month name, and the value is an object containing the month's name,
 *   the number of visitors for that month, and a fill color corresponding to the month.
 */
export const visitorsData = ({
  transactions,
}: TransactionData): Record<
  string,
  { months: string; visitors: number; fill: string }
> => {
  const visitor = transactions.reduce(
    (
      acc: {
        [key: string]: { months: string; visitors: number; fill: string };
      },
      curr
    ) => {
      const month = format(parseISO(curr.check_in), "MMMM").toLowerCase();

      if (["january", "february", "march", "april", "may", "june"].includes(month)) {
        if (!acc[month]) {
          acc[month] = {
            months: month,
            visitors: 0,
            fill: `var(--color-${month})`, 
          };
        }
        acc[month].visitors += 1;
      } else {
  
        if (!acc[month]) {
          acc[month] = {
            months: "other",
            visitors: 0,
            fill: "var(--color-other)", 
          };
        }
        acc[month].visitors += 1;
      }

      return acc;
    },
    {}
  );

  return visitor;
};
