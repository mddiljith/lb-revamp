import React, { useState } from "react";
import { useRouter } from "next/router";
import OwnerLayout from "@/Components/Owner/OwnerLayout";
import { Input, Typography, Switch, Button } from "@material-tailwind/react";
import { useEditVehicle } from "@/hooks/vehicles/useEditVehicle";
import VehicleCard from "@/Components/Vehicle/VehicleCard";

function TruckDetail() {
  const router = useRouter();
  const { truckId } = router.query;
  const { updateTruck } = useEditVehicle();
  const [driverId, setDriverId] = useState(null);

  const updateDriver = () => {
    if (!driverId) return;
    const newtruckData = {
      driver_id: driverId,
    };
    updateTruck(
      { newtruckData, truckId },
      {
        onSuccess: () => {
          setDriverId("");
        },
      }
    );
  };
  //api for default driver

  return (
    <div>
      <VehicleCard vechicleId={truckId}/>
      <p>TruckDetail {truckId}</p>
      <p>display details of the truck format yet to decide</p>
      <div className="mb-1 flex flex-col gap-6">
        <Switch label="Default driver" defaultChecked />
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Default Driver
        </Typography>
        <Input
          size="lg"
          placeholder="Enter driver id"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          onChange={(e) => setDriverId(e.target.value)}
        />
        <Button onClick={updateDriver}>Update Driver</Button>
      </div>
    </div>
  );
}

export default TruckDetail;

TruckDetail.getLayout = function getLayout(page) {
  return <OwnerLayout>{page}</OwnerLayout>;

  // <SidebarLayout sidelinks={OWNER_SIDELINKS}>{page}</SidebarLayout>;
};
