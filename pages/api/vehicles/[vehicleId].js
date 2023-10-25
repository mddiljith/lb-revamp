import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

export default async function handler(req, res) {
  const supabase = createPagesServerClient({
    req,
    res,
  });
  res.setHeader('Cache-Control', 'public', 's-maxage=10', 'stale-while-revalidate=59')
  
  const { vehicleId } = req.query;
  try {
    // if(!session) {
    //   res.status(401).json({ response: "Unauthorized Request" })
    //   return;
    // }
    if (req.method == "GET") {
      let { data, error } = await supabase
        .from("vehicles")
        .select(`
          id,
          model,
          model_year,
          plate_number,
          types(name),
          statuses(name),
          driver_id,
          owner_id
        `)
        .eq("id", vehicleId);
      res.status(200).json(data);
    } else if (req.method == "PUT") {
      let vehicle = req.body;
      console.log("VEHICLE", req);
      let { data, error } = await supabase
        .from("vehicles")
        .update(vehicle)
        .eq("id", vehicleId)
        .select();
      console.log("PUT REQUEST RESP => ", data);
      console.log("PUT REQUEST ERROR => ", error);
      res.status(200).json(vehicle);
    } else if (req.method == "DELETE") {
      const { error } = await supabase
        .from("vehicles")
        .delete()
        .eq("id", vehicleId);
      res.status(200).json(error);
    }
  } catch (err) {
    console.log("catchErr", err);
    res.status(403).json({ status: "403", message: "Something went wrong" });
  }
}
