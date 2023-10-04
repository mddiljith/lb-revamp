import { useQuery } from "@tanstack/react-query";

export function useTrips() {
  const {
    isLoading,
    data: Trips,
    error,
  } = useQuery({
    queryKey: ["tripsbyshipper"],
    queryFn: getTrips,

    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Error in fetching trips details");
    },
  });

  return { isLoading, error, cabins };
}

const getTrips = async () => {
  const _url = `${process.env.NEXT_PUBLIC_URL}/api/trips`;
  const res = await fetch(_url);
  return res.json();
};
