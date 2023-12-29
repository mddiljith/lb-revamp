import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { callApi } from "@/lib/utils/api";
import { PriceState } from "@/context/SearchAtom";
import { useRecoilState } from "recoil";

export function usePrice() {
  const router = useRouter();
  const { searchid } = router.query;
  const [price, setPrice] = useRecoilState(PriceState);
  const { isLoading, data, error } = useQuery({
    queryKey: [`${searchid}`, "price"],
    queryFn: () => getPrice(searchid),
    onSuccess: (data) => setPrice(data.estimate),
    onError: (err) => {
      console.log("ERROR", err);
      toast.error(err.message);
    },
  });

  return { isLoading, error, price, data };
}

const getPrice = async (searchRequestId) => {
  const requestParams = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };

  const data = await callApi(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/pricing/${searchRequestId}`,
    requestParams
  );
  return data;
};
