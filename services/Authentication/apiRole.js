export async function updateUserRole(user, role) {
  const { data, error } = await supabase
    .from("users")
    .update({ role_id: parseInt(role[1]), role: role[0] })
    .eq("id", user.id)
    .select();

  console.log("Response", data);
  console.log("ERROR in role update", error);
}
