import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useUserRole() {
  const id_ = user.id;
  const {
    isLoading,
    data: userRole,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserRole,

    onError: (err) => {
      console.log("ERROR", err);
      toast.error(err.message);
    },
  });

  return { isLoading, user, userRole };
}

const getUserRole = async () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  let { data: role, error } = await supabase
    .from("users")
    .select("role_meta_data")
    .eq("id", user.id);

  return { user, role };
};
