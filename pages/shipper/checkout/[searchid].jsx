import React from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  CardHeader,
} from "@material-tailwind/react";
import AddressForm from "@/Components/Auth/AddressForm";
import { callApi } from "@/lib/utils/api";
import { useSearch } from "@/hooks/search/useSearch";
import { useRecoilValue } from "recoil";
import PriceCard from "@/Components/Shipper/PriceCard";
import { PriceState } from "@/context/SearchAtom";
import NavbarMain from "@/Components/ui/NavbarMain";
import JourneyStrip from "@/Components/Shipper/JourneyStrip";

function CheckoutConfirmation() {
  //verify the shipper satatus and update the billing address accordingly
  const router = useRouter();
  const { searchid } = router.query;
  const price = useRecoilValue(PriceState);

  const createTripForRequest = async (searchid) => {
    const requestParams = {
      method: "POST",
      body: JSON.stringify({
        search_request_id: searchid,
      }),
      headers: { "Content-Type": "application/json" },
    };

    const {data} = await callApi(`/api/trips`, requestParams);
    // setTrip(data);
    let tripId = data[0].id;

    router.push(`/shipper/trips/${tripId}`);
  };

  async function handleSubmit(id) {
    createTripForRequest(id);
  }

  return (
    <>
      <NavbarMain />
      <JourneyStrip/>
      <div className="flex flex-row justify-start ml-3 mt-5">
        <div className="w-3/5 flex flex-col p-2">
          <Card>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                Billing Address
              </Typography>
              <AddressForm />
            </CardBody>
            <CardFooter>
              <div className="flex flex-col gap-3">
                <Input label="GSTIN(optional)" />
                <Button onClick={() => handleSubmit(searchid)} fullWidth>
                  Confirm & Proceed
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="w-2/6 m-2">{price && <PriceCard price={price} />}</div>
      </div>
    </>
  );
}

export default CheckoutConfirmation;
