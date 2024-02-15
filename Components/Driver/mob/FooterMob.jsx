import { Navbar } from "@material-tailwind/react";
import React from "react";
import { MdHome } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";
import { HiTruck } from "react-icons/hi2";
import { IconButton } from "@material-tailwind/react";

function FooterMob() {
  return (
    <>
      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t-2 border-gray-200 shadow-sm">
        <div className="h-full mx-auto flex justify-between p-3 ml-2 mr-2">
          <IconButton variant="outlined">
            <MdHome size={28} />
          </IconButton>

          <IconButton variant="outlined">
            <HiTruck size={28} />
          </IconButton>

          <IconButton variant="outlined">
            <FaArrowTrendUp size={28} />
          </IconButton>
        </div>
      </div>
    </>
  );
}

export default FooterMob;
