import React from "react";
import { useRouter } from "next/router";

import { Card, CardBody, CardFooter, Typography, Input, Button } from "@material-tailwind/react";
import AddressForm from "@/Components/Auth/AddressForm";
import { callApi } from "@/lib/utils/api";
function CheckoutConfirmation() {
  //verify the shipper satatus and update the billing address accordingly
  const router = useRouter();
  const { searchid } = router.query;

  const createTripForRequest = async (searchid) => {
    console.log('Creating Trip')
    const requestParams = {
      method: "POST",
      body: JSON.stringify({
        search_request_id: searchid,
      }),
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await callApi(`/api/trips`, requestParams);
    console.log("TripData", data);
    console.log(data[0])
    // setTrip(data);
    let tripId = data[0].id
    console.log(tripId)

    router.push(`/shipper/trips/${tripId}`);
  };

  async function handleSubmit(id) {
    createTripForRequest(id);
  }

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
        <Button onClick={() => handleSubmit(searchid)}>Confirm & Proceed</Button>
      </div>
      <div className="w-2/6 m-2">price breakup and confirm</div>
    </div>
  );
}

export default CheckoutConfirmation;
