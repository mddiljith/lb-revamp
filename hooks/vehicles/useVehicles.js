import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useVehicles() {
  const {
    isLoading,
    data: vehicles,
    error,
  } = useQuery({
    queryKey: ["Vehicles"],
    queryFn: getVehicles,

    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Error in fetching Vehicle data");
    },
  });

  return { isLoading, error, vehicles };
}

const getVehicles = async () => {
  const _url = `${process.env.NEXT_PUBLIC_URL}/api/vehicles`;
  const res = await fetch(_url);
  return res.json();
};
