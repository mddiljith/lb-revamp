// import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export async function getUserRole(user_id) {
  const supabase = useSupabaseClient();
  let { data: role, error } = await supabase
  .from('users')
  .select('role_meta_data')
  .eq('id', user_id)

  return role
}

