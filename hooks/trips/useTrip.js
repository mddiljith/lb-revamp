import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export function useTrip() {
  const router = useRouter();
  const { tripId } = router.query;
  const {
    isLoading,
    data: trip,
    error,
  } = useQuery({
    queryKey: ["trip", tripId],
    queryFn: () => getTrip(tripId),

    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Error in fetching trips details");
    },
  });

  return { isLoading, error, trip };
}

const getTrip = async (id) => {
  const _url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/trips/${id}`;
  const res = await fetch(_url);
  return res.json();
};
