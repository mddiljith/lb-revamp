import {
  CardFooter,
  CardBody,
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";
import React from "react";

function PriceCard({ price, onSubmit, isLoading }) {
  return (
    <>
      <Card>
        <CardBody className="p-5 flex flex-col gap-3">
          <Typography variant="h5" className="mb-4">
            Price Details
          </Typography>
          <Typography variant="h6">
            Base Price : {price?.toFixed(2)} INR
          </Typography>
          <Typography variant="h6">Tax</Typography>
          <hr />
        </CardBody>
        <CardFooter>
          <Typography variant="h6">Total : {price?.toFixed(2)} INR</Typography>
          {onSubmit && (
            <Button disabled={isLoading} onClick={onSubmit}>
              Confirm to Pay
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
}

export default PriceCard;
