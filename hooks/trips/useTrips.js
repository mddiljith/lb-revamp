import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useTrips() {
  const {
    isLoading,
    data: trips,
    error,
  } = useQuery({
    queryKey: ["Trips"],
    queryFn: getTrips,

    onError: (err) => {
      console.log("ERROR", err);
      toast.error(err.message);
    },
  });

  return { isLoading, error, trips };
}

const getTrips = async () => {
  const _url = `${process.env.NEXT_PUBLIC_URL}/api/trips`;
  const response = await fetch(_url);
  return response.json();
};
