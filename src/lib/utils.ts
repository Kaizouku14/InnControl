import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";

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

export const calculateNights = (checkIn: Date | undefined, checkOut: Date | undefined): number => {
  if (!checkIn || !checkOut) return 0;
  const timeDiff = checkOut.getTime() - checkIn.getTime();
  const nights = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
  return nights > 0 ? nights : 0;
};


export const getRoomPrice = (roomType: string) => {
  switch (roomType) {
    case "SR Deluxe":
    case "SR Prime":
      return 3500;
    case "SR Premier":
      return 3700;
    case "ER 1 Bed Room":
      return 4300;
    case "ER 2 Bed Room":
      return 8000;
    default:
      return 0;
  }
};

export const calculateTotalPrice = (
  room_type: string,
  number_of_nights: number,
  additional_service: string,
  booking_type: string
): { originalAmount: number; roomPrice: number; totalAmount: number } => {

  const roomPrice = getRoomPrice(room_type);

  let totalAmount = roomPrice * number_of_nights;
  const originalAmount = totalAmount;

  if (additional_service === "Breakfast") totalAmount += 500;
  if (booking_type === "Online") totalAmount -= totalAmount * 0.05;

  return {
    originalAmount,
    roomPrice,
    totalAmount,
  };
};

