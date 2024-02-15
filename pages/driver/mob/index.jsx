import ApprovalCard from "@/Components/Driver/ApprovalCard";
import FooterMob from "@/Components/Driver/mob/FooterMob";
import NavbarMob from "@/Components/Driver/mob/NavbarMob";
import Mapmob from "@/Components/Map/Mapmob";
import { Card, CardBody } from "@material-tailwind/react";
import React from "react";

function DriverHomeMob() {
  return (
    <>
      <div className="flex flex-col flex-none">
        <NavbarMob />
        <ApprovalCard />
        <div className="h-screen bg-red-100">
          <Mapmob />
        </div>

        <FooterMob />
      </div>
    </>
  );
}

export default DriverHomeMob;
