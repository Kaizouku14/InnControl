import React, { PropsWithChildren } from "react";
import SideBarMenu from "./_components/sidebar-menu";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getSession } from "@/lib/auth/lucia";
import { redirect } from "next/navigation";
import { PageRoutes } from "@/constants/page-routes";

const Layout = async (props: PropsWithChildren) => {
  const { user } = await getSession();

  if (!user) return redirect(PageRoutes.LOGIN);

  return (
    <SidebarProvider>
      <SideBarMenu />
      <main className="p-2 dark:bg-neutral-900 bg-neutral-100 w-full rounded-2xl m-3">
        <div className="flex gap-1">
          <SidebarTrigger className="h-8" />
          {props.children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
