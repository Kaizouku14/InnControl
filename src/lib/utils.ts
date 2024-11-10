import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";
import { PageRoutes } from "@/constants/page-routes";
import {
  Building,
  CircleParking,
  ClipboardList,
  FileUser,
  LayoutDashboard,
  NotebookPen,
  StretchHorizontal,
} from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export const items = [
  {
    title: "Dashboard",
    url: PageRoutes.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    title: "Rooms",
    url: PageRoutes.ROOMS,
    icon: Building,
  },
  {
    title: "Bookings",
    url: PageRoutes.BOOKINGS,
    icon: NotebookPen,
  },
  {
    title: "Guests",
    url: PageRoutes.GUEST,
    icon: FileUser,
  },
  {
    title: "Parkings",
    url: PageRoutes.PARKINGS,
    icon: CircleParking,
  },
];

export const housekeeping = [
  {
    title: "Tasks",
    url: PageRoutes.TASKS,
    icon: ClipboardList,
  },
  {
    title: "Inventory",
    url: PageRoutes.INVENTORY,
    icon: StretchHorizontal,
  },
];
