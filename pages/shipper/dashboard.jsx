import ShipperLayout from "@/Components/Shipper/ShipperLayout";
import React from "react";

function ShipperDashboard() {
  return <div>ShipperDashboard</div>;
}

export default ShipperDashboard;

ShipperDashboard.getLayout = function getLayout(page) {
  return <ShipperLayout>{page}</ShipperLayout>;
};
