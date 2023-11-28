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

  try {
    if(req.method == "GET") {
      let { data, error } = await supabaseServerClient
          .from('context')
          .select('*')
      const token = data[0];
      res.status(200).json(token);
    } else if (req.method == "PUT") {
      let token = req.body
      let { data, error } = await supabaseServerClient
          .from('context')
          .update(token)
          .eq('id', 1)
      res.status(200).json(data);
    }
  } catch (err) {
    console.log("catchErr", err);
    res.status(403).json({ status: '403', message: "Something went wrong"});
  }
}