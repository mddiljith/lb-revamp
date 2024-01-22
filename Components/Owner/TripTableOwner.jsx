import React from "react";
import Table from "@/Components/ui/Table";
import { Typography, Card, Button } from "@material-tailwind/react";
import TripRowOwner from "./TripRowOwner";
import { FaEye } from "react-icons/fa";

const TRIP_HEAD = [
  "Date",
  "Tracking ID",
  "Route",
  "Vehicle",
  "Driver",
  "Payment Status",
  " ",
];

function TripTableOwner({ trips }) {
  return (
    <div className="flex"> 
      <div className="w-full h-80 mx-2 mb-2 bg-white">
        <div className="p-6">
          <div className="flex items-center">
            <Typography variant="h6" className="p-3">Trips Overview</Typography>
            <Button variant="text" color="teal" ripple={false} className="text-xs p-2">
              <div className="flex gap-1 justify-center items-center p-0">
                <FaEye size={14} />
                <span className="text-xs">Show Trips</span>
              </div>
            </Button>
          </div>
          <div className="overflow-x-auto text-xs">
            {trips.length > 0 ? (
              <Table>
                <Table.Header header={TRIP_HEAD} />
                <Table.Body
                  data={trips}
                  render={(trip, i) => (
                    <TripRowOwner row={trip} key={trip.id} index={i} />
                  )}
                />
              </Table>
            ) : (<div className="text-sm justify-center items-center p-3">No trips found</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripTableOwner;
