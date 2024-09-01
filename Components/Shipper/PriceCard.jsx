import {
  CardFooter,
  CardBody,
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";
import React from "react";

function PriceCard({ price, onSubmit, isLoading }) {
  let basePrice = parseFloat(price?.toFixed(2))
  let gst = parseFloat((basePrice * 0.1).toFixed(2))
  let total = parseFloat((basePrice + gst).toFixed(2))
  return (
    <>
      <Card>
        <CardBody className="p-5 flex flex-col gap-3">
          <Typography variant="h5" className="mb-4">
            Price Details
          </Typography>
          <Typography variant="h6">
            Base Price : {basePrice} INR
          </Typography>
          <Typography variant="h6">GST (10%) : {gst} INR</Typography>
          <hr />
        </CardBody>
        <CardFooter className="px-5 py-2">
          <Typography variant="h6">Total : {total} INR</Typography>
          {onSubmit && (
            <Button disabled={isLoading} onClick={onSubmit} className="mt-5">
              Confirm to Pay
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
}

export default PriceCard;
