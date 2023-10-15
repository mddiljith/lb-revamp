import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useTrips() {
  const {
    isLoading,
    data: trips,
    error,
  } = useQuery({
    queryKey: ["trips"],
    queryFn: getTrips,

    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Error in fetching trips details");
    },
  });

  return { isLoading, error, trips };
}

const getTrips = async () => {
  const _url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/trips`;
  const res = await fetch(_url);
  return res.json();
};
