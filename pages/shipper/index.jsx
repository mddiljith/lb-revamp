import Schedule from "@/Components/Shipper/Schedule";
import SearchForm from "@/Components/Shipper/SearchForm";
import TruckSelection from "@/Components/Shipper/TruckSelection";
import Navbar from "@/Components/ui/NavbarMain";
import {
  mapState,
  showSearchState,
  showTruckSearchState,
} from "@/context/SearchAtom";
import React from "react";
import { useRecoilValue } from "recoil";
import Map from "@/Components/Map/Map";

function Shipper() {
  const showSearch = useRecoilValue(showSearchState);
  const showTruckSearch = useRecoilValue(showTruckSearchState);
  const { route_path, distance } = useRecoilValue(mapState);
  console.log('Route path for Shipper');
  console.log(route_path);
  console.log(distance);
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
