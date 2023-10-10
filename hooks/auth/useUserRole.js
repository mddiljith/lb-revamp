import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useUserRole() {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,

    onError: (err) => {
      console.log("ERROR", err);
      toast.error(err.message);
    },
  });

  return { isLoading, user };
}

const getUser = async () => {
  const _url = `${process.env.NEXT_PUBLIC_URL}/api/auth/user`;
  const res = await fetch(_url);
  return res.json(); 
};
