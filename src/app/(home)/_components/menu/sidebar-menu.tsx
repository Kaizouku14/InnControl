"use client";

import {
  FolderKanban,
  ChevronUp,
  CircleUserRound,
  LogOut,
  Settings,
  UserRoundCog,
  Files,
  UserRoundPen,
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
import { items, housekeeping } from "@/lib/helper/objects";
import { UserRoles } from "@/constants/roles";
import Link from "next/link";

const SideBarMenu = () => {
  const router = useRouter();
  const logoutMutation = api.auth.logout.useMutation();
  const { data, isLoading } = api.user.getUser.useQuery(undefined, {
    refetchOnMount: "always",
  });

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

  if (isLoading) return null;

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-x-2 p-2">
          <FolderKanban size={20} />
          <h1 className="text-lg font-bold">InnControl</h1>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {data?.role === UserRoles.ADMIN && (
          <SidebarGroup>
            <SidebarGroupLabel>Manage Accounts</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuButton asChild>
                  <Link href={PageRoutes.ACCOUNT}>
                    <UserRoundPen />
                    <span>Accounts</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {(data?.role === UserRoles.ADMIN ||
          data?.role === UserRoles.FRONTDESK) && (
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>
            {data?.role === UserRoles.ADMIN ||
            data?.role === UserRoles.FRONTDESK
              ? "House keeping"
              : "Menu"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {housekeeping.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {(data?.role === UserRoles.ADMIN ||
          data?.role === UserRoles.FRONTDESK) && (
          <SidebarGroup>
            <SidebarGroupLabel>Documents</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={PageRoutes.REPORTS}>
                      <Files />
                      <span>Reports</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <div className="flex items-center gap-x-2 ">
                    <CircleUserRound />
                    <span className="text-base font-medium ">
                      {data
                        ? data?.firstName + " " + data?.lastName
                        : "Username"}
                    </span>
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
