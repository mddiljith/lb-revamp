import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";

function ApprovalCard({ source, destination, schedule, trackingId }) {
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
          <Button color="gray">Reject</Button>
          <Button color="green">Approve</Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default ApprovalCard;