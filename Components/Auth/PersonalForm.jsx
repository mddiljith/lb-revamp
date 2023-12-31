import { Card, CardBody, CardFooter, Input } from "@material-tailwind/react";
import React from "react";

function PersonalForm() {
  return (
    <Card>
      <CardBody>
        <div className="flex flex-col gap-5">
          <div className="flex gap-2">
            <Input label="First Name" />
            <Input label="Last Name " />
          </div>
          <Input type="tel" label="Phone number" />
          <Input type="email" label="email" />
          <div className="flex gap-2">
            <Input type="date" label="date of Birth" />
            <Input label="Gender" />
          </div>
          <Input label="Organisation Name" />
          <Input label="GSTIN" />
        </div>
      </CardBody>
    </Card>
  );
}

export default PersonalForm;
