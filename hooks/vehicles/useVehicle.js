import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useVehicle(vehicleId) {
  console.log('Vehicle ID', vehicleId)
  const {
    isLoading,
    data: vehicle,
    error,
  } = useQuery({
    queryKey: ["vehicle", vehicleId],
    queryFn: () => getVehicle(vehicleId),
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Error in fetching Vehicle data");
    },
  });

  return { isLoading, error, vehicle };
}

const getVehicle = async (vehicleId) => {
  if(vehicleId != undefined) {
    const _url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/vehicles/${vehicleId}`;
    const res = await fetch(_url);
    return res.json();
  }
};
