import React from "react";
import { SHIPPER_SIDELINKS } from "@/lib/const/SidelinksConst";
import SidebarLayout from "../ui/SidebarLayout";

function ShipperLayout({ children }) {
  return (
    <SidebarLayout sidelinks={SHIPPER_SIDELINKS}>{children}</SidebarLayout>
  );
}

export default ShipperLayout;
