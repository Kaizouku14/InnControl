import React, { PropsWithChildren } from "react";
import SideBarMenu from "./_components/sidebar-menu";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getSession } from "@/lib/auth/lucia";
import { redirect } from "next/navigation";
import { PageRoutes } from "@/constants/page-routes";

const Layout = async (props: PropsWithChildren) => {
  const { user, session } = await getSession();

  if (!user || !session) return redirect(PageRoutes.LOGIN);

  console.log(user)
  return (
    <SidebarProvider>
      <SideBarMenu />
      <main className="p-4">
        <div>
          <SidebarTrigger />
          {props.children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
