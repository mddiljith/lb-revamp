import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import React from "react";

function OtpConfirm() {
  return (
    <Card>
      <CardBody className="flex flex-col gap-6">
        <div>
          <Typography variant="h4">OTP Verification</Typography>
          <Typography variant="small">
            We have sent a code to Reciever&apos;s registered mobile
          </Typography>
        </div>
        <div class="flex flex-col space-y-16">
          <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
            <div class="w-16 h-16 ">
              <input
                class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                type="text"
                name=""
                id=""
              />
            </div>
            <div class="w-16 h-16 ">
              <input
                class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                type="text"
                name=""
                id=""
              />
            </div>
            <div class="w-16 h-16 ">
              <input
                class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                type="text"
                name=""
                id=""
              />
            </div>
            <div class="w-16 h-16 ">
              <input
                class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                type="text"
                name=""
                id=""
              />
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <Button>Verify the delivery</Button>
      </CardFooter>
    </Card>
  );
}

export default OtpConfirm;
