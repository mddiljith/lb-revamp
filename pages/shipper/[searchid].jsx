import { useRouter } from "next/router";

import { useSearch } from "@/hooks/search/useSearch";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect } from "react";

import { callApi } from "@/lib/utils/api";
import NavbarMain from "@/Components/ui/NavbarMain";

import PriceCard from "@/Components/Shipper/PriceCard";
import { usePrice } from "@/hooks/search/usePrice";
import { usePayment } from "@/hooks/search/usePayment";
import JourneyStrip from "@/Components/Shipper/JourneyStrip";

function SearchConfirmation() {
  const router = useRouter();
  const { searchid } = router.query;
  const { price, isLoading: isPrice } = usePrice(); // price calculation and storing to recoil state
  const { SearchData, isLoading } = useSearch();
  const { isCreating, CreatePayment } = usePayment();
  
  async function handleSubmit(__price) {
    CreatePayment({price: parseFloat(__price?.toFixed(2))});
  }

  return (
    <>
      {isLoading && <Spinner />}
      {isPrice && (
        <span>
          <Spinner /> Calculating Price
        </span>
      )}
      <NavbarMain />
      <JourneyStrip/>
      {SearchData && (
        <div className="flex flex-row justify-center bg-white w-full">
          <div className="w-1/2">
            {/* <Typography variant="h4" className="mt-5 mb-2">
              Confirm Rates
            </Typography>
            <Typography variant="small" className="mb-5">
              All rates inclusive of toll & tax
            </Typography>
            <div className="flex flex-row justify-center">

            </div> */}
            <div className="flex gap-3 p-2 mt-4 mx-auto w-full">
              
              <Card color="">
                <CardBody className="p-5">
                  <div className="flex justify-between gap-4">
                    <Typography variant="h4">{SearchData[0]?.source}</Typography>
                    &rarr;
                    <Typography variant="h4">
                      {SearchData[0]?.destination}
                    </Typography>
                  </div>
                  <hr />
                  <div className="mt-5">
                    <Typography variant="h6">
                      Distance : {(SearchData[0]?.distance / 1000).toFixed(2)} KM
                    </Typography>
                    <Typography variant="h6" className="py-2">
                      Estimated duration :
                      {(SearchData[0]?.duration / 3600).toFixed(2)} Hrs
                    </Typography>
                  </div>
                </CardBody>
              </Card>
              {price && <PriceCard
                price={price}
                onSubmit={() => handleSubmit(price)}
                isLoading={isCreating}
              />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SearchConfirmation;
