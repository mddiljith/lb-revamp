import OwnerLayout from "@/Components/Owner/OwnerLayout";
import React from "react";

function Payout() {
  //paout to manage payment for the owner
  //Amount eligible to withdraw

  return <div>payout</div>;
}

export default Payout;

Payout.getLayout = function getLayout(page) {
  return <OwnerLayout>{page}</OwnerLayout>;
};
