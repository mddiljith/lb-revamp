import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export function useLoginGoogle() {
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) throw new Error(error.message);

      return data;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      router.push("/");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Error in google loging");
    },
  });

  return { login, isLoading };
}
