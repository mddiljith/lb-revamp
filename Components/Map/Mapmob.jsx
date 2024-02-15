import React from "react";

import { useGeolocation } from "@/hooks/map/useGeolocation";
import { IconButton } from "@material-tailwind/react";
import { MdGpsFixed } from "react-icons/md";
import MapHome from "./Maphome";
function Mapmob() {
  const { isLoading, position, error, getPosition } = useGeolocation();
  return (
    <div className="relative h-vh w-full bg-blue-gray-500">
      {!isLoading && position && <MapHome position={position} />}

      <IconButton
        className="absolute bottom-0 right-0 z-10"
        onClick={getPosition}
      >
        <MdGpsFixed />
      </IconButton>
    </div>
  );
}

export default Mapmob;
