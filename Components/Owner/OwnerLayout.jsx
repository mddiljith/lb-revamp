import React from "react";
import SidebarLayout from "../ui/SidebarLayout";
import OWNER_SIDELINKS from "@/lib/const/SidelinksConst";

function OwnerLayout() {
  return <SidebarLayout sidelinks={OWNER_SIDELINKS} />;
}

export default OwnerLayout;
