import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

export function useTrip() {
  const [tripStatus, setTripStatus] = useState("");
  const router = useRouter();
  const { tripId } = router.query;
  // const tripId = id;
  console.log("initial", tripId, typeof tripId);
  const {
    isLoading,
    data: trip,
    error,
  } = useQuery({
    queryKey: ["trip", tripId],
    queryFn: () => getTrip(tripId),
    onSuccess: (data) => {
      setTripStatus(data[0].statuses.name);
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Error in fetching trips details");
    },
  });

  return { isLoading, error, trip, tripStatus };
}

const getTrip = async (id) => {
  console.log(id);
  const _url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/trips/${id}`;
  const res = await fetch(_url);
  return res.json();
};
