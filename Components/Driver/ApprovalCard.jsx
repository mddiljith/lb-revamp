import { callApi } from "@/lib/utils/api";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

function ApprovalCard({ source, destination, schedule, trackingId, tripId }) {
  const [status, setStatus] = useState(4)
  const acceptTrip = async () => {
    const requestParams = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: tripId, status_id: 5 }), // Change status to inprogress
    };
    const result = await callApi(`/api/trips/${tripId}`, requestParams)
    toast.success(
      "Trip accepted successfully."
      );
      
    setStatus(5)
    // setStatus(result[0]?.status_id)
    //Need an alert message here after trip is accepted.
  }

  const rejectTrip = async () => {
    console.log('Driver is rejecting the trip', tripId)
  }


  return (
    <>
    {status == 4 && <Card className="p-1">
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
    </Card>}
    </>
  );
}

export default ApprovalCard;