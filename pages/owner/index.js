import React from "react";

function OwnerHome() {
  return <div>OwnerHome/dashboard</div>;
}

export default OwnerHome;

OwnerHome.getLayout = function getLayout(page) {
  return <SidebarLayout>{page}</SidebarLayout>;
};
