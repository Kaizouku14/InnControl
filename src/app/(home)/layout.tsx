import React, { PropsWithChildren } from "react";
import SideBarMenu from "./_components/sidebar-menu";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const Layout = (props: PropsWithChildren) => {
  return (
    <SidebarProvider>
        <SideBarMenu/>
        <main>
          <SidebarTrigger/>
          {props.children}
        </main>
    </SidebarProvider>
    );
};

export default Layout;
