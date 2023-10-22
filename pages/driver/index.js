import DriverLayout from "@/Components/Driver/DriverLayout";
import React from "react";

function DriverHome() {
  return <div>OwnerHome/dashboard</div>;
}

export default DriverHome;

DriverHome.getLayout = function getLayout(page) {
  return <DriverLayout>{page}</DriverLayout>;
};
