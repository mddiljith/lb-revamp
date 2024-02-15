import {
  Button,
  Card,
  CardBody,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";

import React, { useState } from "react";

function KycForm() {
  const [selectValue, setSelectValue] = useState();
  return (
    <>
      <Select label="verify Method" value={selectValue}>
        <Option value="otp"> OTP with GSTIN </Option>
        <Option value="doc">Upload Documents</Option>
      </Select>
      <Card>
        <CardBody>
          <Typography variant="h4" className="mb-3">
            Upload Documents
          </Typography>
          <div className="flex felx-col gap-2">
            <Input type="file" label="Company Identification Certificate" />
            <Input type="file" label="GSTIN Certificate"></Input>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="flex gap-2">
            <Input label="Re enter the GSTIN" />
            <Button size="sm"> Request OTP</Button>
          </div>
          <Input type="number" label="OTP" />
        </CardBody>
      </Card>
    </>
  );
}

export default KycForm;
