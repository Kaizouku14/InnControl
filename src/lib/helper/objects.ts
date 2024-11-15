import { ChartConfig } from "@/components/ui/chart";
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

export const items = [
  {
    title: "Dashboard",
    url: PageRoutes.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    title: "Bookings",
    url: PageRoutes.BOOKINGS,
    icon: NotebookPen,
  },
  {
    title: "Rooms",
    url: PageRoutes.ROOMS,
    icon: Building,
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

export const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  january: {
    label: "January",
    color: "hsl(var(--chart-1))",
  },
  february: {
    label: "February",
    color: "hsl(var(--chart-2))",
  },
  march: {
    label: "March",
    color: "hsl(var(--chart-3))",
  },
  april: {  
    label: "April",
    color: "hsl(var(--chart-4))",
  },
  may: {  
    label: "May",
    color: "hsl(var(--chart-5))",
  },
  june: {  
    label: "June",
    color: "hsl(var(--chart-6))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-7))",
  },
} satisfies ChartConfig;

export const status = [
  {
    label: "Available",
    value: "available",
  },
  {
    label: "Occupied",
    value: "occupied",
  },
  {
    label: "Dirty",
    value: "dirty",
  },
];

export const roomType = [
  {
    label: "SR Deluxe",
    value: "SR Deluxe",
  },
  {
    label: "SR Prime",
    value: "SR Prime",
  },
  {
    label: "SR Premier",
    value: "SR Premier",
  },
  {
    label: "ER 1 Bed Room",
    value: "ER 1 Bed Room",
  },
  {
    label: "ER 2 Bed Room",
    value: "ER 2 Bed Room",
  },
];
