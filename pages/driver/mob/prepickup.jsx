import React from "react";
import FooterMob from "@/Components/Driver/mob/FooterMob";
import NavbarMob from "@/Components/Driver/mob/NavbarMob";
import Mapmob from "@/Components/Map/Mapmob";
import AcceptedCard from "@/Components/Driver/mob/AcceptedCard";
import { useRouter } from "next/router";
import { useTrip } from "@/hooks/trips/useTrip";
import { useRecoilValue, useRecoilState} from "recoil";
import { tripState } from "@/context/TripAtom";
import Map from "@/Components/Map/Map";

function Prepickup() {
  const router = useRouter();
  const {tripId} = router.query;
  const { isLoading, error, trip, tripStatus } = useTrip();
  const { route_path, distance, duration } = useRecoilValue(tripState);

  return (
    <div className="flex flex-col h-screen ">
      <NavbarMob />
      {trip && <div className=" flex-1 flex flex-col">
        <div className=" bg-blue-300 flex-1 overflow-hidden">
          {/* <Mapmob path={route_path} /> */}
          {route_path && <Map path={route_path} />}
        </div>
        <div className="bottom-2 w-full fixed p-2 z-50 mb-12">
          <AcceptedCard 
            trip={trip[0]}
            shipper={trip[0]?.search_requests?.users?.name}
            tracking_id={trip[0]?.tracking_id}
            source_eloc={trip[0]?.search_requests?.source_eloc}
          />
        </div>
      </div>}
      <FooterMob />
    </div>
  );
}

export default Prepickup;
