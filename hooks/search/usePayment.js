import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { callApi } from "@/lib/utils/api";
// import { createEditCabin } from "../../services/apiCabins";

export function usePayment() {
  const router = useRouter();
  const { searchid } = router.query;

  const { mutate: CreatePayment, isLoading: isCreating } = useMutation({
    mutationFn: async ({ price }) => await createPaymentForRequest(searchid, price),
    onSuccess: () => {
      router.push(`/shipper/checkout/${searchid}`);
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: FetchPaymentById, isLoading: isFetching } = useMutation({
    mutationFn: async (searchid) => await getPaymentById(searchid),
    onError: (err) => {
      console.log('Error in FetchPaymentById mutation function')
      toast.error(err.message)
    },
  })

  return { isCreating, CreatePayment, FetchPaymentById, isFetching};
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

const getPaymentById = async (searchid) => {
  console.log('Getting payment ID details: ', searchid)
  const requestParams = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const data = await callApi(`/api/payments/${searchid}`, requestParams);
  return data;
}
