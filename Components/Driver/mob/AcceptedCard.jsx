import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { MdCall, MdCancel, MdClose, MdOutlineChat } from "react-icons/md";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useGeolocation } from "@/hooks/map/useGeolocation";
import { tripState } from "@/context/TripAtom";
import { getDirection } from "@/services/map/getDirection";
import Link from "next/link";
/* Action map should be loaded to show the driver location pickup loaction */

function AcceptedCard({trip, shipper, tracking_id, source_eloc}) {
  const { position, getPosition } = useGeolocation();
  const [pickupMap, setPickupMap] = useRecoilState(tripState);
  console.log(pickupMap.route_path)
  const loadMap = async () => {
    console.log('Loading Map')
    await getPosition()
    console.log(position, source_eloc)
    const lat_lng = `${position.lng},${position.lat}`
    if (position && source_eloc) {
      const mapResult = await getDirection(lat_lng, source_eloc);
      const { duration, distance, path } = mapResult;
      setPickupMap((prev) => {
        return {
          ...prev,
          route_path: path,
          duration,
          distance,
          position,
          source_eloc
        };
      });
    }
  };
  
  return (
    <Card>
      <CardBody>
        <div className="flex gap-3 items-center justify-center">
          <Avatar src="/user.png" />
          <Typography variant="h4"> {shipper} </Typography>
        </div>
        <Typography variant="h5">Tracking ID {tracking_id} </Typography>
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
        { pickupMap.route_path ? 
          <Link href={`/driver/mob/managePickup?tripId=${trip.id}`}>
            <Button fullWidth>Manage Pickup</Button>
          </Link>:
        <Button onClick={loadMap} fullWidth>
          Start
        </Button>}

        {/* Action map should be loaded to show the driver location pickup loaction */}
      </CardFooter>
    </Card>
  );
}

export default AcceptedCard;
