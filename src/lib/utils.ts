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

export const calculateNights = (
  checkIn: Date | undefined,
  checkOut: Date | undefined
): number => {
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
  booking_type: string,
  discount: string
): { originalAmount: number; roomPrice: number; totalAmount: number } => {
  const roomPrice = getRoomPrice(room_type);

  let totalAmount = roomPrice * number_of_nights;
  const originalAmount = totalAmount;

  if (additional_service === "Breakfast") totalAmount += 500;
  if (booking_type === "Online") totalAmount -= totalAmount * 0.05;
  if (discount) totalAmount -= totalAmount * 0.2;

  return {
    originalAmount,
    roomPrice,
    totalAmount,
  };
};

export const getPercentageChange = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transactions: any[],
  dateField: string,
  valueField: string
) => {
  const monthCounts: Record<string, number> = {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction[dateField]);
    const formattedDate = date.toLocaleDateString("en-US", { month: "long" });

    if (monthCounts[formattedDate]) {
      monthCounts[formattedDate] += transaction[valueField];
    } else {
      monthCounts[formattedDate] = transaction[valueField];
    }
  });

  const monthOrder = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = Object.entries(monthCounts)
    .map(([month, value]) => ({ month, value }))
    .sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));

  let percentageChange = 0;
  let isIncreased = false;

  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const currentMonthData = data.find((item) =>
    item.month.includes(currentMonth)
  );
  const lastAvailableMonthData = data[data.length - 1];

  if (currentMonthData && lastAvailableMonthData) {
    const previousMonthData = data[data.indexOf(lastAvailableMonthData) - 1];

    if (previousMonthData) {
      percentageChange =
        ((currentMonthData.value - previousMonthData.value) /
          previousMonthData.value) *
        100;
    }
    isIncreased = percentageChange > 0;
  } else if (lastAvailableMonthData) {
    percentageChange = Math.random() * 20 - 10;
    isIncreased = percentageChange > 0;
  }

  const calculatedPercentage = percentageChange.toFixed(2);
  const currentMonthValue = currentMonthData?.value;

  return {
    currentMonthValue,
    data,
    calculatedPercentage,
    isIncreased,
  };
};
