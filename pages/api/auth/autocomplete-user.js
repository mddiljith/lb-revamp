import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

module.exports = async (req, res) => {
  const supabaseServerClient = createPagesServerClient({
    req,
    res,
  });
  const queryString = req.query

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if (session) {
    let { data: users, error } = await supabaseServerClient
    .from('users')
    .select(`id, email`)
    .where('email', 'ilike', queryString)
    .where('role_id', 3)

    res.status(200).json(users); 
  } else {
    res.status(401).json(null); 
  }


}