import React from "react";
import SidebarLayout from "../ui/SidebarLayout";
import { DRIVER_SIDELINKS } from "@/lib/const/SidelinksConst";

function DriverLayout({ children }) {
  return <SidebarLayout sidelinks={DRIVER_SIDELINKS}>{children}</SidebarLayout>;
}

export default DriverLayout;
