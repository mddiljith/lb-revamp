import Schedule from "@/Components/Shipper/Schedule";
import SearchForm from "@/Components/Shipper/SearchForm";
import Navbar from "@/Components/ui/NavbarMain";
import {
  mapState,
  showSearchState,
  showTruckSearchState,
} from "@/context/SearchAtom";
import React from "react";
import { useRecoilValue } from "recoil";

function Shipper() {
  const showSearch = useRecoilValue(showSearchState);
  const showTruckSearch = useRecoilValue(showTruckSearchState);
  const { route_path } = useRecoilValue(mapState);
  return (
    <>
      <Navbar />
      <main
        // style={homeImg}
        className="flex flex-row justify-between  bg-fixed bg-bottom bg-cover  h-screen"
      >
        <div className=" top-10 bg-white w-96 ml-5 rounded-lg p-4 shadow-md">
          {showSearch && <SearchForm />}
          {!showSearch && showTruckSearch && <TruckSearch />}
          {!showSearch && !showTruckSearch && <Schedule />}
        </div>
        <div className="h-1/2 w-1/2">
          {!showSearch && route_path && <Map path={route_path} />}
        </div>
      </main>
    </>
  );
}

export default Shipper;
