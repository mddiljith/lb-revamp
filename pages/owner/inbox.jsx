import OwnerLayout from "@/Components/Owner/OwnerLayout";
import React from "react";

function InboxOwner() {
  return <div>Inbox</div>;
}

export default InboxOwner;

InboxOwner.getLayout = function getLayout(page) {
  return <OwnerLayout>{page}</OwnerLayout>;
};
