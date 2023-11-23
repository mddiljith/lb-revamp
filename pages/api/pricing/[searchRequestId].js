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
    if(req.method == "POST") {
      let { data, error } = await supabaseServerClient
          .from('search_requests')
          .select('*')
          .eq('id', searchRequestId)
      const searchRequest = data[0];
      const distance = searchRequest.distance
      if (distance == "") {
        res.status(403).json({ result: "Distance is not defined "})
      }

      res.status(200).json({ estimate: (distance/1000) * 50 });
    }
  } catch (err) {
    console.log("catchErr", err);
    res.status(403).json({ status: '403', message: "Something went wrong"});
  }
}