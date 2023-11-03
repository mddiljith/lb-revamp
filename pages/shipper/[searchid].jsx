import React from "react";
import { useRouter } from "next/router";
import { usePrice } from "@/hooks/search/usePrice";
import { useSearch } from "@/hooks/search/useSearch";

function SearchConfirmation() {
  const { price } = usePrice();
  const { searchData } = useSearch();

  // 1.create a hook for featching the search request data from router query
  // 2.create the trip based on the confirmation of page, may be a trip generator hook can be used with mutation
  // 3. Push to the trip details page - where price is shown to the customer with map or price confirmation page

  return (
    <>
      <p>Search details & Price</p>
      <button>Confirm to Pay</button>
    </>
  );
}

export default SearchConfirmation;
