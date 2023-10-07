import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

// import { createEditCabin } from "../../services/apiCabins";

export function useAddVehicle() {
  const queryClient = useQueryClient();

  const { mutate: createTruck, isLoading: isCreating } = useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      toast.success("New Truck successfully created");
      queryClient.invalidateQueries({ queryKey: ["Vehicles"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createTruck };
}

const createVehicle = async (newTruck) => {
  const requestParams = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newTruck }),
  };
  await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/vehicles`,
    requestParams
  );
  return data;
};
