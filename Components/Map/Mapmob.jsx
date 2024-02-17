import React from "react";

import { useGeolocation } from "@/hooks/map/useGeolocation";
import { IconButton } from "@material-tailwind/react";
import { MdGpsFixed } from "react-icons/md";
import MapHome from "./Maphome";
function Mapmob() {
  const { isLoading, position, error, getPosition } = useGeolocation();
  return (
    // <div className="relative  w-full bg-blue-gray-500">
    <>
      <IconButton className="z-10" onClick={getPosition}>
        <MdGpsFixed />
      </IconButton>
      {!isLoading && position && <MapHome position={position} />}
    </>
  );
}

export default Mapmob;
