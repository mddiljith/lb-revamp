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

  const { searchRequestId } = req.query
  try {
    if(req.method == "PUT") {
      let search_request = req.body
      let { data, error } = await supabaseServerClient
          .from('search_requests')
          .update(search_request)
          .eq('id', search_request.id)
          .select();
      res.status(200).json(search_request);
    } else if(req.method == "GET") {
      let {searchRequestId} = req.query;
      let { data, error } = await supabaseServerClient
          .from('search_requests')
          .select("*")
          .eq('id', searchRequestId);
      res.status(200).json(data);
    }
  } catch (err) {
    console.log("catchErr", err);
    res.status(403).json({ status: '403', message: "Something went wrong"});
  }
}