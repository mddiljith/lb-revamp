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
      let { data, error } = await supabase
          .from('search_requests')
          .eq('id', searchRequestId)
          .select();

      const distance = data.distance
      //const duration = data.distance

      res.status(200).json({ estimate: distance * 50 });
    }
  } catch (err) {
    console.log("catchErr", err);
    res.status(403).json({ status: '403', message: "Something went wrong"});
  }
}