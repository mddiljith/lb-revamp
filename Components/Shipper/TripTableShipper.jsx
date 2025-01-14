import React from "react";
import Table from "@/Components/ui/Table";
import TripRowUser from "./TripRowUser";
import { Typography } from "@material-tailwind/react";

const TRIP_HEAD = [
  "Date",
  "Tracking ID",
  "Route",
  "Vehicle",
  "Driver",
  "Payment Status",
  " ",
];

function TripTableShipper({ trips }) {
  return (
    <Table
      topCard={
        <Table.Top>
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Trip List
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about the trips
              </Typography>
            </div>
          </div>
        </Table.Top>
      }
    >
      <Table.Header header={TRIP_HEAD} />
      <Table.Body
        data={trips}
        render={(trip, i) => <TripRowUser row={trip} key={trip.id} index={i} />}
      />
    </Table>
  );
}

export default TripTableShipper;
