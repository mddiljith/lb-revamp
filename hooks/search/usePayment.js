import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { callApi } from "@/lib/utils/api";
// import { createEditCabin } from "../../services/apiCabins";

export function usePayment() {
  const router = useRouter();
  const { searchid } = router.query;

  const { mutate: CreatePayment, isLoading: isCreating } = useMutation({
    mutationFn: ({ price }) => createPaymentForRequest(searchid, price),
    onSuccess: () => {
      router.push(`/shipper/checkout/${searchid}`);
    },

    onError: (err) => toast.error(err.message),
  });

  return { isCreating, CreatePayment };
}

const createPaymentForRequest = async (id, __price) => {
  const requestParams = {
    method: "POST",
    body: JSON.stringify({
      search_request_id: id,
      price: __price,
    }),
    headers: { "Content-Type": "application/json" },
  };

  const data = await callApi(`/api/payments`, requestParams);
  return data;
};
