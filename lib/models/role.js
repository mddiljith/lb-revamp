import supabase from "@/supabase";

export async function getUserRole(user_id) {
  console.log({user_id})
  let { data: role, error } = await supabase
  .from('users')
  .select('role_meta_data')
  .eq('id', user_id)
  console.log({role})
  return role
}

export function getRoleUserField(role) {
  if (role == "3") {
    return "driver_id"
  } else if(role == "2") {
    return "owner_id";
  } else {
    return "shipper_id" 
  }
}