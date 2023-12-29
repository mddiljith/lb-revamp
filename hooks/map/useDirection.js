import { getDirection } from "@/services/map/getDirection";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useDirection(eloc1, eloc2) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["direction"],
    queryFn: () => getDirection(eloc1, eloc2),
    enabled: !!eloc1,
    onError: (err) => {
      console.log("ERROR", err);
      toast.error(err.message);
    },
  });

  return { isLoading, error, price, data };
}
