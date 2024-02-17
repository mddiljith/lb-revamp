import ApprovalCard from "@/Components/Driver/ApprovalCard";
import FooterMob from "@/Components/Driver/mob/FooterMob";
import NavbarMob from "@/Components/Driver/mob/NavbarMob";
import Mapmob from "@/Components/Map/Mapmob";
import { Card, CardBody } from "@material-tailwind/react";
import React from "react";

function DriverHomeMob() {
  return (
    <>
      <div className="flex flex-col h-screen ">
        <NavbarMob />

        <div className=" flex-1 flex flex-col">
          <div className=" bg-blue-300 flex-1 overflow-hidden">
            <Mapmob />
          </div>
          <div className="bottom-2 w-full fixed p-2 z-50 mb-12">
            <ApprovalCard />
          </div>
        </div>
        <FooterMob />
      </div>
    </>
  );
}

export default DriverHomeMob;
