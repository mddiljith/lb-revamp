import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { FaCamera } from "react-icons/fa6";

function DeliveryUpload() {
  return (
    <Card>
      <CardBody>
        <label
          htmlFor="deliveryimage1"
          className="w-12 bg-blue-200 p-4 rounded-sm shadow-sm flex gap-3 justify-center items-center"
        >
          <Typography>Upload image</Typography>
          <div>
            <FaCamera />
          </div>
        </label>

        <Input type="file" id="deliveryimage1" hidden />
      </CardBody>
      <CardFooter>
        <Button>Request OTP</Button>
      </CardFooter>
    </Card>
  );
}

export default DeliveryUpload;
