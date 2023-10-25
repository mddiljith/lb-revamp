import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

module.exports = async (req, res) => {
  const supabaseServerClient = createPagesServerClient({
    req,
    res,
  });
  res.setHeader('Cache-Control', 'public', 's-maxage=10', 'stale-while-revalidate=59')
  
  const roleData = await getUserRole(req.query.userId);

  // Get role
  async function getUserRole(user_id) {
    let { data: role, error } = await supabaseServerClient
    .from('users')
    .select('role_meta_data')
    .eq('id', user_id)
  
    return role
  }

  res.status(200).json(roleData)
}