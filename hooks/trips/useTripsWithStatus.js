import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useTripsWithStatus(statusId) {
  const {
    isLoading,
    data: trips,
    error,
  } = useQuery({
    queryKey: ["trips", statusId],
    queryFn: getTripsWithStatus(statusId),

    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Error in fetching trips details");
    },
  });

  return { isLoading, error, trips };
}

const getTripsWithStatus = async (status_id) => {
  const _url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/trips?status_id=${status_id}`;
  const res = await fetch(_url);
  return res.json();
};
