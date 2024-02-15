import React, { useState } from "react";
import { useRouter } from "next/router";
import OwnerLayout from "@/Components/Owner/OwnerLayout";
import { Input, Typography, Switch, Button, Card, CardBody } from "@material-tailwind/react";
import { useEditVehicle } from "@/hooks/vehicles/useEditVehicle";
import VehicleCard from "@/Components/Vehicle/VehicleCard";
import { callApi } from "@/lib/utils/api";

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

  const userAutocomplete = (str) => {
    console.log("String", str)
    const result = callApi(`api/auth/autocomplete-user.js?queryString=${str}`)
    console.log('RESULT===>')
    console.log(result)
  } 
  //api for default driver

  return (
    <div> 
      <div className="flex flex-col justify-center bg-gray-100">
        <VehicleCard vechicleId={truckId}/>
      </div>
      <div className="flex flex-col justify-center bg-gray-100">
        <Card className="w-4/6 mt-4 m-4">
          <CardBody>
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
                onChange={(e) => userAutocomplete(e.target.value)}
              />
              <Button onClick={updateDriver}>Update Driver</Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default TruckDetail;

TruckDetail.getLayout = function getLayout(page) {
  return <OwnerLayout>{page}</OwnerLayout>;

  // <SidebarLayout sidelinks={OWNER_SIDELINKS}>{page}</SidebarLayout>;
};
