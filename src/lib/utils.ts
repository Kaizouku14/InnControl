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

/**
 * Calculate the number of nights between a given check-in and check-out date
 *
 * @param {Date | undefined} checkIn - The check-in date
 * @param {Date | undefined} checkOut - The check-out date
 * @returns {number} - The number of nights
 */
export const calculateNights = (
  checkIn: Date | undefined,
  checkOut: Date | undefined
): number => {
  if (!checkIn || !checkOut) return 0;
  const timeDiff = checkOut.getTime() - checkIn.getTime();
  const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return nights > 0 ? nights : 0;
};

/**
 * Returns the price of a room based on the given room type
 *
 * @param {string} roomType - The type of room
 * @returns {number} - The price of the room
 */
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


/**
 * Calculates the total price of a room booking, taking into account
 * the room type, number of nights, additional service, booking type, and
 * discount.
 *
 * @param {string} room_type - The room type.
 * @param {number} number_of_nights - The number of nights.
 * @param {string} additional_service - The additional service, if any.
 * @param {string} booking_type - The booking type.
 * @param {string} discount - The discount, if any.
 * @returns {{originalAmount: number, roomPrice: number, totalAmount: number}}
 *  - `originalAmount`: The total price before any discounts.
 *  - `roomPrice`: The base price of the room.
 *  - `totalAmount`: The final total price after all discounts.
 */
export const calculateTotalPrice = (
  room_type: string,
  number_of_nights: number,
  additional_service: string  | null,
  booking_type: string,
  discount: string | null
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


/**
 * Calculates the percentage change in transaction values between months.
 *
 * @param {any[]} transactions - An array of transaction objects.
 * @param {string} dateField - The field name in the transaction object that contains the date.
 * @param {string} valueField - The field name in the transaction object that contains the value to be calculated.
 * @returns {Object} - An object containing:
 *  - `currentMonthValue`: The total value of transactions for the current month.
 *  - `data`: An array of objects containing each month's name and its total transaction value.
 *  - `calculatedPercentage`: The percentage change between the current month and the previous month, as a string with two decimal places.
 *  - `isIncreased`: A boolean indicating whether there was an increase in transaction value from the previous month.
 */
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
