import React from "react";
import { useRouter } from "next/router";
import { Input, Typography } from "@material-tailwind/react";

function TruckDetail() {
  const router = useRouter();
  const { truckId } = router.query;

  //api for default driver

  return (
    <div>
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
        />
      </div>
    </div>
  );
}

export default TruckDetail;
