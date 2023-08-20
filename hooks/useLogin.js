import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const supabase = useSupabaseClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: async ({ email, password }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
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
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}
