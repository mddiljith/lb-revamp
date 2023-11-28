import TripTableOwner from "@/Components/Owner/TripTableOwner";
import { useTrips } from "@/hooks/trips/useTrips";
import { Alert, Spinner } from "@material-tailwind/react";
import React from "react";

function ShipperTrips() {
  const { isLoading, error, trips } = useTrips();

  return (
    <>
      {isLoading && <Spinner />}
      {error && <Alert color="red">An error alert for showing message.</Alert>}
      {trips && <TripTableOwner trips={trips} />}
      {/* tripTableShipper to be created based on the trip details */}
    </>
  );
}

export default ShipperTrips;
