import { CardBody, CardFooter, Typography } from "@material-tailwind/react";
import React from "react";

function CheckoutConfirmation() {
  //verify the shipper satatus and update the billing address accordingly
  //SPLIT THE PAYMENT CONFIRMATION
  return (
    <div className="flex flex-row justify-start ml-3">
      <div className="w-3/5 flex flex-col p-2">
        delivery address & billing address and payment options/gateway
        <Card>
          <CardBody>
            <Typography varient="h4">Delivery info</Typography>
            <Typography varient="h4">Billing Address</Typography>
          </CardBody>
          <CardFooter>
            <Input label="GSTIN(optional)" />
          </CardFooter>
        </Card>
        <AddressForm />
      </div>
      <div className="w-2/6 m-2">price breakup and confirm</div>
    </div>
  );
}

export default CheckoutConfirmation;
