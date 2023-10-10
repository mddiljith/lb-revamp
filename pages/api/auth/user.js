import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

module.exports = async (req, res) => {
  const supabaseServerClient = createPagesServerClient({
    req,
    res,
  });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  let { data: role_meta_data, error } = await supabaseServerClient
  .from('users')
  .select(`role_meta_data`)
  .eq('id', session.user.id)

  res.status(200).json({...session.user, role_meta_data}); 

}