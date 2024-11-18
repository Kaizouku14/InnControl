import React, { PropsWithChildren } from "react";

import { getSession } from "@/lib/auth/lucia";
import { redirect } from "next/navigation";
import { PageRoutes } from "@/constants/page-routes";

const Layout = async (props: PropsWithChildren) => {
  const { user } = await getSession();

  if (user?.department !== "IT-support") 
  return redirect(PageRoutes.DASHBOARD);

  return <>{props.children}</>;
};

export default Layout;
