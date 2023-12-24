import DriverLayout from "@/Components/Driver/DriverLayout";
import React from "react";
import { useState, useEffect } from "react";
import GenericCard from "@/Components/ui/GenericCard";
import Trips from "@/Components/ui/Dashboard/Trips"
import ApprovalCard from "@/Components/Driver/ApprovalCard";
import { callApi } from "@/lib/utils/api";

function DriverHome() {
  const [trips, setTrips] = useState([]);

  async function fetchTripsForDriver() {
    const requestParams = {
      headers: { "Content-Type": "application/json" }
    }
    const trips_data = await callApi(`/api/trips?status_id=4`, requestParams);
    setTrips(trips_data);
  }

  useEffect(() => {
    fetchTripsForDriver();
  }, []);
  console.log({trips})
  return (
    <>
      <div className="flex px-8">
        { trips.map ((trip) => 
          <div className="flex-1/4 mt-10" key={trip.id}>
            <ApprovalCard 
              source={trip.search_requests.source}
              destination={trip.search_requests.destination}
              scheduled_at={trip.scheduled_at}
              trackingId={trip.tracking_id} 
            />
          </div>
        )}
        
        <div className="flex-1/2">
          <GenericCard title="Today's Revenue" content="100" notice="50 less than yesterday" />
        </div>
        <div className="flex-1/2">
          <GenericCard title="Current Month Revenue" content="1200" notice="120 less than last month"/>
        </div>
        <div className="flex-1/4">
          <Trips/>
        </div>

      </div>
    </>
    )
}

export default DriverHome;

DriverHome.getLayout = function getLayout(page) {
  return <DriverLayout>{page}</DriverLayout>;
};

