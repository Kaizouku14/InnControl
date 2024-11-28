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
  if (!checkIn || !checkOut) return 1;
  const timeDiff = checkOut.getTime() - checkIn.getTime();
  const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return nights > 0 ? nights : 1;
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
  additional_service: string | undefined,
  booking_type: string,
  discount: string | undefined
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
 * Calculates the percentage change in revenue and visitor counts between the
 * current and previous months based on transaction data.
 *
 * @param {any[]} transactions - Array of transaction objects.
 * @param {string} transaction_date - Key in the transaction object representing the transaction date.
 * @param {string} valueField - Key in the transaction object representing the value to be summed
 *                              (e.g., revenue or visitor count).
 * @returns {object} An object containing:
 *  - `currentMonthRevenue`: Current month's revenue data.
 *  - `currentMonthVisitor`: Current month's visitor data.
 *  - `revenue`: Sorted array of monthly revenue data.
 *  - `visitor`: Sorted array of monthly visitor data.
 *  - `revenuePercentage`: Absolute percentage change in revenue from the previous month.
 *  - `visitorPercentage`: Absolute percentage change in visitor count from the previous month.
 *  - `isRevenueIncreased`: Boolean indicating if revenue increased compared to the previous month.
 *  - `isVisitorIncreased`: Boolean indicating if visitor count increased compared to the previous month.
 */
export const getPercentageChange = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transactions: any[],
  transaction_date: string,
  valueField: string
) => {
  const monthCounts: Record<string, number> = {};
  const monthRevenue: Record<string, number> = {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction[transaction_date]);
    const formattedDate = date.toLocaleDateString("en-US", { month: "long" });

    if (monthRevenue[formattedDate]) {
      monthRevenue[formattedDate] += transaction[valueField];
      monthCounts[formattedDate] += 1;
    } else {
      monthRevenue[formattedDate] = transaction[valueField];
      monthCounts[formattedDate] = 1;
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

  const revenue = Object.entries(monthRevenue)
    .map(([month, value]) => ({ month, value }))
    .sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));

  const visitor = Object.entries(monthCounts)
    .map(([month, value]) => ({ month, value }))
    .sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));

  const currentMonth = new Date().toLocaleDateString("en-US", { month: "long" });

  const currentMonthRevenue = revenue.find(
    (item) => item.month.toLowerCase() === currentMonth.toLowerCase()
  );
  const currentMonthVisitor = visitor.find(
    (item) => item.month.toLowerCase() === currentMonth.toLowerCase()
  );

  const lastAvailableRevenue = revenue[revenue.length - 1];
  const lastAvailableVisitor = visitor[visitor.length - 1];

  let revenuePercentageChange = 0;
  let isRevenueIncreased = false;

  let visitorPercentageChange = 0;
  let isVisitorIncreased = false;

  if (currentMonthRevenue && lastAvailableRevenue) {
    const previousMonthRevenue = revenue[revenue.indexOf(lastAvailableRevenue) - 1];

    if (previousMonthRevenue) {
      revenuePercentageChange =
        ((currentMonthRevenue.value - previousMonthRevenue.value) /
          previousMonthRevenue.value) *
        100;
    }

    isRevenueIncreased = revenuePercentageChange > 0;
  }

  if (currentMonthVisitor && lastAvailableVisitor) {
    const previousMonthVisitor = visitor[visitor.indexOf(lastAvailableVisitor) - 1];

    if (previousMonthVisitor) {
      visitorPercentageChange =
        ((currentMonthVisitor.value - previousMonthVisitor.value) /
          previousMonthVisitor.value) *
        100;
    }

    isVisitorIncreased = visitorPercentageChange > 0;
  }

  return {
    currentMonthRevenue,
    currentMonthVisitor,
    revenue,
    visitor,
    revenuePercentage: Math.abs(revenuePercentageChange).toFixed(1),
    visitorPercentage: Math.abs(visitorPercentageChange).toFixed(1),
    isRevenueIncreased,
    isVisitorIncreased,
  };
};

