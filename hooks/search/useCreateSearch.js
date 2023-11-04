import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

// import { createEditCabin } from "../../services/apiCabins";

export function useCreateSearch() {
  const queryClient = useQueryClient();

  const { mutate: CreateSearch, isLoading: isCreating } = useMutation({
    mutationFn: ({ search, distance, duration }) =>
      createSearchReq(search, distance, duration),
    onSuccess: () => {
      //queryClient.invalidateQueries({ queryKey: ["SearchReq"] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isCreating, CreateSearch };
}

const createSearchReq = async (search, distance, duration) => {
  const requestParams = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...search, distance, duration }),
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/search_requests`,
    requestParams
  );
  console.log('Response in Hook1', res);
  return res;
};
