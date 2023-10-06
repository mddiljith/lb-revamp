// import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";


// export async function updateUserRole(user, role) {
//   const { data, error } = await supabase
//     .from("users")
//     .update({ role_id: parseInt(role[1]), role: role[0] })
//     .eq("id", user.id)
//     .select();

//   console.log("Response", data);
//   console.log("ERROR in role update", error);
// }

export async function getUserRole(user_id) {
  const supabase = useSupabaseClient();
  let { data: role, error } = await supabase
  .from('users')
  .select('role_meta_data')
  .eq('id', user_id)

  return role
}

