import Schedule from "@/Components/Shipper/Schedule";
import SearchForm from "@/Components/Shipper/SearchForm";
import TruckSelection from "@/Components/Shipper/TruckSelection";
import Navbar from "@/Components/ui/NavbarMain";
import {
  mapState,
  showSearchState,
  showTruckSearchState,
  mapTokenState
} from "@/context/SearchAtom";
import React from "react";
import { useRecoilValue, useRecoilState} from "recoil";
import Map from "@/Components/Map/Map";
import { useQuery } from "@tanstack/react-query";

import { callApi } from "@/lib/utils/api";

function Shipper() {
  const showSearch = useRecoilValue(showSearchState);
  const showTruckSearch = useRecoilValue(showTruckSearchState);
  const { route_path, distance } = useRecoilValue(mapState);
  const [token, setToken] = useRecoilState(mapTokenState);
  console.log('Route path for Shipper');
  console.log(route_path);
  console.log(distance);

  const getMapToken = async () => {
    const tokenData = await callApi('/api/map/map_token')
    return tokenData
  }

  const {
    isLoading,
    data: mapToken,
    error,
  } = useQuery({
    queryKey: ["mapToken"],
    queryFn: getMapToken,
    onSuccess: (data) => {
      setToken(data);
    },
    onError: (err) => {
      console.log("ERROR", err);
    },
  });
  return (
    <>
      <Navbar />
      <main
        // style={homeImg}
        className="flex flex-row justify-between  bg-fixed bg-bottom bg-cover  h-screen"
      >
        <div className=" top-10 bg-white w-96 ml-5 rounded-lg p-4 shadow-md">
          {showSearch && <SearchForm />}

          {!showSearch && showTruckSearch && <TruckSelection />}

          {!showSearch && !showTruckSearch && <Schedule />}
          
          {/* <Schedule /> */}
        </div>
        <div className="h-full w-full">
          {!showSearch && route_path && <Map path={route_path} />}
        </div>
      </main>
    </>
  );
}

export default Shipper;
