import React, { useState, useEffect } from 'react';
import DriverLayout from '@/Components/Driver/DriverLayout';
import Map from "@/Components/Map/Map";
import { getDirection } from "@/services/map/getDirection";
import { callApi } from '@/lib/utils/api';

const TripMain = () => {
  let [mapPath, setMapPath] = useState([])
  const mapCordinates = async () => {
    return await getDirection(eloc1, eloc2);
  }

  useEffect(() => {
    // const { path } = mapCordinates()
    // setMapPath(path)
    // console.log(path)

    // get the eloc values from the search request
    // pass eloc to direction api and get directions
    callApi('/api/search_request')

  }, []);

  return (
    <div class="grid grid-flow-row-dense grid-cols-3 grid-rows-3 ...">
      <div class="col-span-2">
        Map area for trip
        {/* <Map path={mapPath} /> */}
      </div>
      <div class="col-span-2">
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