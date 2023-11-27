import { useRouter } from "next/router";
// import { usePrice } from "@/hooks/search/usePrice";
import { useSearch } from "@/hooks/search/useSearch";
import { CardBody, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
// import { usePrice } from "@/hooks/search/usePrice";
// import { useSearch } from "@/hooks/search/useSearch";
import { callApi } from "@/lib/utils/api";
import { useRecoilState } from "recoil";
import { PriceState } from "@/context/SearchAtom";

function SearchConfirmation() {
  // const { price } = usePrice();
  const { searchData } = useSearch();
  console.log("price in view", price, searchData);
  const router = useRouter();
  const { searchid } = router.query;
  // const { searchData } = useSearch();
  const [price, setPrice] = useRecoilState(PriceState);
  const [trip, setTrip] = useState([]);
  useEffect(() => {
    const getPrice = async () => {
      const requestParams = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };

      const data = await callApi(`/api/pricing/${searchid}`, requestParams);
      setPrice(data.estimate);
    };
    getPrice();
  }, [searchid]);

  async function handleSubmit() {
    console.log("Submitting request");
    createTripForRequest();
  }

  const createTripForRequest = async () => {
    const requestParams = {
      method: "POST",
      body: JSON.stringify({
        search_request_id: searchid,
      }),
      headers: { "Content-Type": "application/json" },
    };

    const data = await callApi(`/api/trips`, requestParams);
    console.log(data);

    setTrip(data);
    console.log(trip[0].id);
    router.push(`/shipper/trips/${trip[0].id}`);
  };

  // const { price } = usePrice();
  console.log("price in view", price);
  // 1.create a hook for featching the search request data from router query
  // 2.create the trip based on the confirmation of page, may be a trip generator hook can be used with mutation
  // 3. Push to the trip details page - where price is shown to the customer with map or price confirmation page

  return (
    <>
      <p>Search details & Price</p>
      <Card>
        <CardBody>
          <Typography>kochi</Typography>
          <Typography>to</Typography>
          <Typography>Varkala</Typography>

          <Typography>Distance : 100 Km</Typography>
          <Typography> Estimated durationi : 4 hrs</Typography>
        </CardBody>
      </Card>
      <p>Price : {price}</p>

      <p>{price}</p>
      <button onClick={handleSubmit}>Confirm to Pay</button>
    </>
  );
}

export default SearchConfirmation;
