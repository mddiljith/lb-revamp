import { callApi } from "@/lib/utils/api";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";

function ApprovalCard({ source, destination, schedule, trackingId, tripId }) {

  const acceptTrip = async () => {
    console.log('Driver is accepting the trip', tripId)
    const requestParams = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: tripId, status_id: 5 }), // Change status to inprogress
    };
    await callApi(`/api/trips/${tripId}`, requestParams)

    //Need an alert message here after trip is accepted.
  }

  const rejectTrip = async () => {
    console.log('Driver is rejecting the trip', tripId)
  }


  return (
    <Card className="p-1">
      <CardHeader className="p-2 px-2" color="orange" shadow={false}>
        Trip Request
      </CardHeader>
      <CardBody>
        <div>
          <Typography varient="h4">Pickup : {source}</Typography>
          <Typography varient="h4">Drop : {destination}</Typography>
          <Typography varient="h4">Time : {schedule}</Typography>
          <Typography varient="h4">Tracking ID : {trackingId}</Typography>
        </div>
        <div className="flex gap-3 place-content-end ">
          <Button color="gray" onClick={rejectTrip}>Reject</Button>
          <Button color="green" onClick={acceptTrip}>Approve</Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default ApprovalCard;