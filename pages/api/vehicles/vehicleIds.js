import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

export default async function handler(req, res) {
  const supabase = createPagesServerClient({
    req,
    res,
  });
  res.setHeader('Cache-Control', 'public', 's-maxage=10', 'stale-while-revalidate=59')
  
  try {
    if (req.method == "GET") {
      let { data, error } = await supabase
        .from("vehicles")
        .select(`
          id
        `)
      res.status(200).json(data);
    } 
  } catch (err) {
    console.log("catchErr", err);
    res.status(403).json({ status: "403", message: "Something went wrong" });
  }
}
