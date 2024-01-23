import {
  Card,
  CardBody,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import AddressForm from "../Auth/AddressForm";

function ShipperInfoForm() {
  return (
    <>
      <Card>
        <CardBody>
          <div className="flex flex-col gap-5">
            <Select label="Are you an Organisation">
              <Option>Yes</Option>
              <Option>No</Option>
            </Select>
            <Input label="Organisation Name" />
            <Input label="GSTIN" />
            <Select label="DO you have MSME registration">
              <Option>Yes</Option>
              <Option>No</Option>
            </Select>
            <Typography>Address </Typography>
            <AddressForm />
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default ShipperInfoForm;
