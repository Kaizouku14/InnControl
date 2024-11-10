"use client"

import {
  LayoutDashboard,
  Building,
  NotebookPen,
  FileUser,
  FolderKanban,
  ChevronUp,
  CircleUserRound,
  LogOut,
  Settings,
  UserRoundCog,
  ClipboardList,
  StretchHorizontal,
  CircleParking,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { PageRoutes } from "@/constants/page-routes";
import { api } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const items = [
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

const housekeeping = [
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



const SideBarMenu = () => {
  const router = useRouter();
  const logoutMutation = api.auth.logout.useMutation();

  const handleLogout = async () => {
    toast.promise(logoutMutation.mutateAsync(), {
      loading: "logging out...",
      success: () => {
        router.push(PageRoutes.LOGIN);
        return "logged out successfully.";
      },
      error: (error: unknown) => {
        return (error as Error).message;
      },
    });
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-x-2 p-2">
          <FolderKanban size={20} />
          <h1 className="text-lg font-bold">Project Name</h1>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>House keeping</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {housekeeping.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <div className="flex items-center gap-x-2 ">
                    <CircleUserRound />
                    <span className="text-base font-medium ">{"username"}</span>
                  </div>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <UserRoundCog />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideBarMenu;
