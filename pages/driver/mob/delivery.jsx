import React from "react";
import FooterMob from "@/Components/Driver/mob/FooterMob";
import NavbarMob from "@/Components/Driver/mob/NavbarMob";
import Mapmob from "@/Components/Map/Mapmob";
import {
  Button,
  Card,
  CardBody,
  Input,
  Typography,
} from "@material-tailwind/react";
import { MdCall, MdCancel, MdOutlineChat } from "react-icons/md";
import PickupConfirmForm from "@/Components/Driver/PickupConfirmForm";
import DeliveryUpload from "@/Components/Driver/mob/DeliveryUpload";
import OtpConfirm from "@/Components/Driver/mob/otpConfirm";

function Delivery() {
  return (
    <>
      <div className="flex flex-col h-screen ">
        <NavbarMob />

        <div className=" flex-1 flex flex-col gap-3 bg-blue-gray-100 ">
          <div className=" flex-1 overflow-hidden m-2">
            <Card>
              <CardBody>
                <Typography>Delivery</Typography>
                <DeliveryUpload />
                {/* <OtpConfirm /> */}
              </CardBody>
            </Card>
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
                <Button variant="outlined">Cancel Trip</Button>
              </CardBody>
            </Card>
          </div>
        </div>
        <FooterMob />
      </div>
    </>
  );
}

export default Delivery;
