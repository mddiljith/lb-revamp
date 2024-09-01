import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

module.exports = async (req, res) => {
  const supabaseServerClient = createPagesServerClient({
    req,
    res,
  });
  res.setHeader('Cache-Control', 'public', 's-maxage=10', 'stale-while-revalidate=59')
  
  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  const userId = session.user.id

  if(req.method == "GET") {
    const search_request_id = req.query.searchid;
    try {
      const { data, error } = await supabaseServerClient
        .from('payments')
        .select("*")
        .eq('search_request_id', search_request_id);
      
      if (error) {
        console.log({error})
      }
      res.status(200).json({payments: data});
    } catch (error) {
      console.log({error});
    }
  } 
}