import TripTableOwner from "@/Components/Owner/TripTableOwner";
import TripTableShipper from "@/Components/Shipper/TripTableShipper";
import NavbarMain from "@/Components/ui/NavbarMain";
import { useTrips } from "@/hooks/trips/useTrips";
import { Alert, Card, Spinner } from "@material-tailwind/react";
import React from "react";

function ShipperTrips() {
  const { isLoading, error, trips } = useTrips();

  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <Spinner />
        </div>
      )}

      {/* {trips && <TripTableOwner trips={trips} />} */}
      {/* tripTableShipper to be created based on the trip details */}
      <NavbarMain />
      {error && <Alert color="red">An error alert for showing message.</Alert>}
      {trips && (
        <div className="p-3">
          <TripTableShipper trips={trips} />
        </div>
      )}
    </>
  );
}

export default ShipperTrips;
