import React, { useState } from "react";
import { useRouter } from "next/router";

import Map from "@/Components/Map/Map";
import DriverLayout from "@/Components/Driver/DriverLayout";

import { getDirection } from "@/services/map/getDirection";
import { useTrip } from "@/hooks/trips/useTrip";
import { useQuery } from "@tanstack/react-query";

const TripMain = () => {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, error, trip } = useTrip();

  let [mapPath, setMapPath] = useState([]);

  const mapCordinates = async (eloc1, eloc2) => {
    const data = await getDirection(eloc1, eloc2);
    console.log({ data });
    setMapPath(data);
  };

  console.log("Trip found", trip);

  if (trip != undefined) {
    let eloc1 = trip[0].search_requests.source_eloc;
    let eloc2 = trip[0].search_requests.destination_eloc;
    console.log(eloc1, eloc2);

    mapCordinates(eloc1, eloc2);
    console.log("Path", mapPath);
  }

  return (
    <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-3 ...">
      <div className="col-span-2">
        Map area for trip
        {/* <Map path={mapPath} /> */}
      </div>
      <div className="col-span-2">Some other section</div>
      <div>Trip timeline</div>
      <div>Yer another section</div>
    </div>
  );
};

export default TripMain;

TripMain.getLayout = function getLayout(page) {
  return <DriverLayout>{page}</DriverLayout>;
};
