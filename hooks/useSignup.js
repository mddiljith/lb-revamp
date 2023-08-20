import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export function useSignup() {
  const supabase = useSupabaseClient();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: async ({ full_name, email, password }) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name,
            avatar: "",
          },
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) throw new Error(error.message);

      return data;
    },
    onSuccess: (user) => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address."
      );
    },
  });

  return { signup, isLoading };
}
