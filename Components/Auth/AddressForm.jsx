import { Card, CardBody, CardFooter, Input } from "@material-tailwind/react";
import React from "react";

function AddressForm() {
  return (
    <Card>
      <CardBody>
        <div className="flex flex-col gap-5">
          <Input label="Address" />
          <div className="flex gap-2">
            <Input label="Pincode" />
            <Input label="Locality/Town" />
          </div>
          <div className="flex gap-2">
            <Input label="City" />
            <Input label="State" />
          </div>
          <Input type="tel" label="Phone number"></Input>
        </div>
      </CardBody>
    </Card>
  );
}

export default AddressForm;
