import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export function useSearch() {
  const router = useRouter();
  const { searchId } = router.query;
  const {
    isLoading,
    data: SearchData,
    error,
  } = useQuery({
    queryKey: [`${searchId}`, "search"],
    queryFn: () => getSearchData(searchId),

    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Error in fetching price");
    },
  });

  return { isLoading, error, SearchData };
}

const getSearchData = async (searchRequestId) => {
  console.log("Search Request ID",searchRequestId)
  const _url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/search_requests/${searchRequestId}`;
  const res = await fetch(_url);
  return res.json();
};
