import TripTableOwner from "@/Components/Owner/TripTableOwner";
import TripTableShipper from "@/Components/Shipper/TripTableShipper";
import NavbarMain from "@/Components/ui/NavbarMain";
import { useTrips } from "@/hooks/trips/useTrips";
import { Alert, Spinner } from "@material-tailwind/react";
import React from "react";

function ShipperTrips() {
  const { isLoading, error, trips } = useTrips();

  return (
    <>
      {isLoading && <Spinner />}

      {/* {trips && <TripTableOwner trips={trips} />} */}
      {/* tripTableShipper to be created based on the trip details */}
      <NavbarMain />
      {error && <Alert color="red">An error alert for showing message.</Alert>}
      {trips && <TripTableShipper trips={trips} />}
    </>
  );
}

export default ShipperTrips;
