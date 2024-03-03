import ApprovalCard from "@/Components/Driver/ApprovalCard";
import FooterMob from "@/Components/Driver/mob/FooterMob";
import NavbarMob from "@/Components/Driver/mob/NavbarMob";
import Mapmob from "@/Components/Map/Mapmob";
import React from "react";
import { useTrips } from "@/hooks/trips/useTrips";

function DriverHomeMob() {
  let {isLoading, trips, error} = useTrips()
  console.log({trips})
  if(trips){
    trips = trips.filter(trip => trip.status_id === 4);
  }
  return (
    <>
      <div className="flex flex-col h-screen ">
        <NavbarMob />

        <div className=" flex-1 flex flex-col">
          <div className=" bg-blue-300 flex-1 overflow-hidden">
            <Mapmob />
          </div>
          <div className="bottom-2 w-full fixed p-2 z-50 mb-12">
          {trips && trips.map((trip) => (
            <div className="flex-1/4 mt-10" key={trip.id}>
              <ApprovalCard
                source={trip.search_requests.source}
                destination={trip.search_requests.destination}
                scheduled_at={trip.scheduled_at}
                trackingId={trip.tracking_id}
                tripId={trip.id}
              />
            </div>
          ))}
          </div>
        </div>
        <FooterMob />
      </div>
    </>
  );
}

export default DriverHomeMob;
