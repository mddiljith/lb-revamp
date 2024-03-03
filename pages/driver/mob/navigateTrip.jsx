import React from "react";
import FooterMob from "@/Components/Driver/mob/FooterMob";
import NavbarMob from "@/Components/Driver/mob/NavbarMob";
import Mapmob from "@/Components/Map/Mapmob";
import { useRouter } from "next/router";

import {
  Button,
  Card,
  CardBody,
  Input,
  Typography,
} from "@material-tailwind/react";
import { MdCall, MdCancel, MdOutlineChat } from "react-icons/md";
import PickupConfirmForm from "@/Components/Driver/PickupConfirmForm";
import { updateTrip } from "@/lib/utils/apis/trips";

function NavigateTrip() {
  const router = useRouter();
  const { tripId } = router.query;
  const handleSubmit = async () => {
    const payload = {
      id: tripId,
      status_id: 3
    }

    const result = await updateTrip(payload)
    if(result) {
      console.log({result})
      router.push(`/driver/mob/delivery?tripId=${tripId}`);
    } else {
      console.log('Something went wrong')
    }
  }

  return (
    <>
      <div className="flex flex-col h-screen ">
        <NavbarMob />

        <div className=" flex-1 flex flex-col gap-3 bg-blue-gray-100 ">
          <div className=" flex-1 overflow-hidden m-2">
            <Mapmob />
          </div>
          <div className="bottom-2 w-full fixed p-2 z-50 mb-12">
            <Card>
              <CardBody>
                <Typography variant="h5">Tracking ID : xxxxx </Typography>
                <div className="flex gap-3 justify-between  items-center text-blue-400 p-4 mt-5 ">
                  <div className="flex gap-1 items-center">
                    <MdCall size={28} />{" "}
                    <Typography variant="h6">call</Typography>
                  </div>
                  <div className="flex gap-1 items-center">
                    <MdOutlineChat size={28} />
                    <Typography variant="h6">chat</Typography>
                  </div>
                </div>
                <Button variant="outlined">Support</Button>
                <Button variant="outlined" className="ml-3" onClick={handleSubmit}>
                  Delivery
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
        <FooterMob />
      </div>
    </>
  );
}

export default NavigateTrip;
