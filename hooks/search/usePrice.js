import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { callApi } from "@/lib/utils/api"

export function usePrice() {
  const router = useRouter();
  const { searchid } = router.query;  
  const {
    isLoading,
    data: Price,
    error,
  } = useQuery({
    queryKey: [`${searchid}`, "price"],
    queryFn: () => getPrice(searchid),

    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Error in fetching price");
    },
  });

  return { isLoading, error, Price };
}

const getPrice = async (searchRequestId) => {
  const requestParams = {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  }
  
  const data = await callApi(`/api/pricing/${searchRequestId}`, requestParams);
  return data;
};
