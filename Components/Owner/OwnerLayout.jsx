import React from "react";
import SidebarLayout from "../ui/SidebarLayout";
import { OWNER_SIDELINKS } from "@/lib/const/SidelinksConst";

function OwnerLayout({ children }) {
  return <SidebarLayout sidelinks={OWNER_SIDELINKS}>{children}</SidebarLayout>;
}

export default OwnerLayout;
