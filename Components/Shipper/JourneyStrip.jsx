import {
  Typography,
} from "@material-tailwind/react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  mapState,
  showSearchState,
  showTruckSearchState,
} from "@/context/SearchAtom";
import React from "react";

function JourneyStrip() {
  const [mapData, setMapData] = useRecoilState(mapState);
  return (
    <>
      { 
        mapData && 
        <div className="flex flex-col w-full bg-gray-900 p-5 text-center">
          <Typography variant="lead" color="white">{mapData.source.placeName} &#8594; {mapData.destination.placeName}</Typography>
        </div>
      }
    </>
  );
}

export default JourneyStrip;
