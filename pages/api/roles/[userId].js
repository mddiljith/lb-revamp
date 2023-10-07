import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

module.exports = async (req, res) => {
  const supabaseServerClient = createPagesServerClient({
    req,
    res,
  });

  console.log('Role js', req.params)

  // Get role
  // async function getUserRole(user_id) {
  //   let { data: role, error } = await supabaseServerClient
  //   .from('users')
  //   .select('role_meta_data')
  //   .eq('id', user_id)
  
  //   return role
  // }
}