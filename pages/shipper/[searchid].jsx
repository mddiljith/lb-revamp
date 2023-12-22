import { useRouter } from "next/router";
// import { usePrice } from "@/hooks/search/usePrice";
import { useSearch } from "@/hooks/search/useSearch";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
// import { usePrice } from "@/hooks/search/usePrice";
// import { useSearch } from "@/hooks/search/useSearch";
import { callApi } from "@/lib/utils/api";
import NavbarMain from "@/Components/ui/NavbarMain";
import { useRecoilState } from "recoil";
import { PriceState } from "@/context/SearchAtom";
import PriceCard from "@/Components/Shipper/PriceCard";

function SearchConfirmation() {
  // const { price } = usePrice();

  // console.log(searchData);
  const router = useRouter();
  const { searchid } = router.query;
  const [price, setPrice] = useRecoilState(PriceState);
  // const [trip, setTrip] = useState([]);
  const { SearchData, isLoading } = useSearch();
  //insert price into the price table with search id

  useEffect(() => {
    const getPrice = async () => {
      const requestParams = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };

      const data = await callApi(`/api/pricing/${searchid}`, requestParams);
      setPrice(data.estimate);
      const tripParams = {
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price: data.estimate,
          search_request_id: searchid,
        }),
      };
    };
    getPrice();
  }, [searchid]);
  console.log(price);

  async function handleSubmit(__price) {
    createPaymentForRequest(__price);
  }

  const createPaymentForRequest = async (__price) => {
    const requestParams = {
      method: "POST",
      body: JSON.stringify({
        search_request_id: searchid,
        price: __price,
      }),
      headers: { "Content-Type": "application/json" },
    };

    const data = await callApi(`/api/payments`, requestParams);
    console.log("Payments data", data);
    console.log(price);
    router.push(`/shipper/checkout/${searchid}`);
  };

  console.log(SearchData);

  // const { price } = usePrice();
  // 1.create a hook for featching the search request data from router query
  // 2.create the trip based on the confirmation of page, may be a trip generator hook can be used with mutation
  // 3. Push to the trip details page - where price is shown to the customer with map or price confirmation page

  return (
    <>
      {isLoading && <Spinner />}
      <NavbarMain />
      {SearchData && (
        <div className="flex gap-5 p-4 mt-4 mx-auto w-4/6">
          <Card color="blue-gray">
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
                <Typography variant="h6">
                  Estimated duration :
                  {(SearchData[0]?.duration / 3600).toFixed(2)} Hrs
                </Typography>
              </div>
            </CardBody>
          </Card>
          <PriceCard price={price} onSubmit={() => handleSubmit(price)} />
        </div>
      )}
    </>
  );
}

export default SearchConfirmation;
