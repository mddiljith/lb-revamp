import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const supabase = useSupabaseClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.removeQueries();
      router.push("/auth/login");
    },
  });

  return { logout, isLoading };
}
