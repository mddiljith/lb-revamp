import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import DriverLayout from '@/Components/Driver/DriverLayout';

import { getDirection } from "@/services/map/getDirection";
import { useTrip } from '@/hooks/trips/useTrip';
import Map from "@/Components/Map/Map";

const TripMain = () => {
  const { isLoading, error, trip }  = useTrip()
  let [mapPath, setMapPath] = useState([])

  const mapCordinates = async (eloc1, eloc2) => {
    const data = await getDirection(eloc1, eloc2);
    console.log({data})
    setMapPath(data?.path);
  }

  useEffect(() => {
    if(trip) {
      console.log('Trip found', trip)
      let eloc1 = trip[0].search_requests.source_eloc
      let eloc2 = trip[0].search_requests.destination_eloc
      console.log(eloc1, eloc2)
      console.log('Path', mapPath)
      mapCordinates(eloc1, eloc2)
    }
  }, [trip])

  return (
    <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-3 ...">
      <div className="col-span-2">
        Map area for trip
        {/* {!isLoading && <Map path={mapPath} />} */}
      </div>
      <div className="col-span-2">
        Some other section
      </div>
      <div>Trip timeline</div>
      <div>Yer another section</div>
    </div>
  );
}

export default TripMain;

TripMain.getLayout = function getLayout(page) {
  return <DriverLayout>{page}</DriverLayout>;
};