import React from "react";
import VehicleRow from "./VehicleRow";
import Table from "../ui/Table";
import { Typography } from "@material-tailwind/react";

const VEHICLE_HEAD = [
  "Vehicle id",
  "Type",
  "Model",
  "Year",
  "Vehicle Number",
  "Status",
  " ",
];

function VehicleTable({ vehicleData }) {
  return (
    <Table
      topCard={
        <Table.Top>
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Manage your Trucks
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about the Trucks
              </Typography>
            </div>
          </div>
        </Table.Top>
      }
    >
      <Table.Header header={VEHICLE_HEAD} />
      <Table.Body
        data={vehicleData}
        render={(vehicle, i) => (
          <VehicleRow row={vehicle} key={vehicle.id} index={i} />
        )}
      />
    </Table>
  );
}

export default VehicleTable;
