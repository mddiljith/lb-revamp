import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export function usePrice() {
  const router = useRouter();
  const { searchId } = router.query;
  const {
    isLoading,
    data: Price,
    error,
  } = useQuery({
    queryKey: [`${searchId}`, "price"],
    queryFn: () => getPrice(searchId),

    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Error in fetching price");
    },
  });

  return { isLoading, error, Price };
}

const getPrice = async () => {
  const _url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/pricing/${searchId}`;
  const res = await fetch(_url);
  return res.json();
};
