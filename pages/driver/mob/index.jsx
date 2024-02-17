import ApprovalCard from "@/Components/Driver/ApprovalCard";
import FooterMob from "@/Components/Driver/mob/FooterMob";
import NavbarMob from "@/Components/Driver/mob/NavbarMob";
import Mapmob from "@/Components/Map/Mapmob";
import { useState, useEffect } from "react";
import { callApi } from "@/lib/utils/api";
import React from "react";

function DriverHomeMob() {
  const [trips, setTrips] = useState([]);
  const status_id = 4; // FOr pending trips
  async function fetchTripsForDriver(status_id) {
    const requestParams = {
      headers: { "Content-Type": "application/json" },
    };
    const trips_data = await callApi(`/api/trips?status_id={status_id}`, requestParams);
    setTrips(trips_data);
  }
  useEffect(() => {
    fetchTripsForDriver();
    console.log({trips})
  }, []);
  return (
    <>
      <div className="flex flex-col h-screen ">
        <NavbarMob />

        <div className=" flex-1 flex flex-col">
          <div className=" bg-blue-300 flex-1 overflow-hidden">
            <Mapmob />
          </div>
          <div className="bottom-2 w-full fixed p-2 z-50 mb-12">
          {trips.map((trip) => (
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
