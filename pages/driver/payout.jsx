import DriverLayout from "@/Components/Driver/DriverLayout";
import React from "react";

function PayoutDriver() {
  return <div>Payout</div>;
}

export default PayoutDriver;

PayoutDriver.getLayout = function getLayout(page) {
  return <DriverLayout>{page}</DriverLayout>;
};
