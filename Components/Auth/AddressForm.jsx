import {Card, CardBody, CardFooter, Input } from "@material-tailwind/react";
import React from "react";

function AddressForm() {
  return (
    <Card>
      <CardBody>
        <div className="flex flex-row">
          <Input label="Address" />
          <div className="flex">
            <Input label="Pincode" />
            <Input label="Locality/Town" />
          </div>
          <div className="flex">
            <Input label="City" />
            <Input label="State" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default AddressForm;
