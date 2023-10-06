import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useDeleteVehicle() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteTruck } = useMutation({
    mutationFn: deleteVehicle,
    onSuccess: () => {
      toast.success("Truck successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["Vehicles"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteTruck };
}

const deleteVehicle = async () => {
  const _uri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/vehicles/${vehicleId}`;

  await fetch(_uri, { method: "DELETE" });
};
