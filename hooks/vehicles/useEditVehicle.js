import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

// import { createEditCabin } from "../../services/apiCabins";

export function useEditVehicle() {
  const queryClient = useQueryClient();

  const { mutate: updateTruck, isLoading: isCreating } = useMutation({
    mutationFn: ({ newTruckData, vehicleId }) =>
      editVehicle(newTruckData, vehicleId),
    onSuccess: () => {
      toast.success("New Truck successfully created");
      queryClient.invalidateQueries({ queryKey: ["Vehicles"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return {updateTruck };
}

const editVehicle = async (newTruckData, vehicleId) => {
  const requestParams = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newTruckData }),
  };
  await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/vehicles/${vehicleId}`,
    requestParams
  );
  return data;
};
