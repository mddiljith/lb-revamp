import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

// import { createEditCabin } from "../../services/apiCabins";

export function useAddVehicle() {
  const queryClient = useQueryClient();

  const { mutate: createTruck, isLoading: isCreating } = useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Vehicles"] });
      toast.success("Successfully updated the vehicle list");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createTruck };
}

const createVehicle = async (newTruck) => {
  console.log(newTruck, "fromhook");
  const requestParams = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newTruck }),
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/vehicles`,
    requestParams
  );
  return res;
};
