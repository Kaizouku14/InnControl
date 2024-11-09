import React, { PropsWithChildren } from "react";
import SideBarMenu from "./_components/sidebar-menu";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getSession } from "@/lib/auth/lucia";
import { redirect } from "next/navigation";

const Layout = async (props: PropsWithChildren) => {
  const { user, session } = await getSession();

  if (!user || !session) return redirect("/");

  return (
    <SidebarProvider>
      <SideBarMenu />
      <main className="p-4">
        <SidebarTrigger />
        {props.children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
