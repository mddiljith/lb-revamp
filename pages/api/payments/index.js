import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

module.exports = async (req, res) => {
  const supabase = createPagesServerClient({
    req,
    res,
  });
  res.setHeader('Cache-Control', 'public', 's-maxage=10', 'stale-while-revalidate=59')
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userId = session.user.id

  if(req.method == "POST") {
    const cost = req.body.price;
    const search_request_id = req.body.search_request_id;
    try {
      const { data, error } = await supabase
        .from('payments')
        .insert({
          price: cost,
          transaction_id: 111,
          search_request_id: search_request_id 
        }).select();
      console.log(data)
      console.log(error)
      const payments = data[0];
        
      res.status(200).json({payments: payments});
    } catch (error) {
      console.log({error});
    }
  }
}