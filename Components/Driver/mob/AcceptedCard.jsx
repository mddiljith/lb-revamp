import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { MdCall, MdCancel, MdClose, MdOutlineChat } from "react-icons/md";

/* Action map should be loaded to show the driver location pickup loaction */
const loadMap = () => {};

function AcceptedCard() {
  return (
    <Card>
      <CardBody>
        <div className="flex gap-3 items-center justify-center">
          <Avatar src="/user.png" />
          <Typography variant="h4"> COCOCOLA PVT LTD </Typography>
        </div>
        <Typography variant="h5">Tracking ID xxxx </Typography>
        <div className="flex gap-3 justify-between  items-center text-blue-400 p-4 mt-5 ">
          <div className="flex gap-1 items-center">
            <MdCall size={28} /> <Typography variant="h6">call</Typography>
          </div>
          <div className="flex gap-1 items-center">
            <MdOutlineChat size={28} />
            <Typography variant="h6">chat</Typography>
          </div>
          <div className="flex gap-1 items-center">
            <MdCancel size={28} />
            <Typography variant="h6">cancel</Typography>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <Button onClick={loadMap} fullWidth>
          Start
        </Button>

        {/* Action map should be loaded to show the driver location pickup loaction */}
      </CardFooter>
    </Card>
  );
}

export default AcceptedCard;
