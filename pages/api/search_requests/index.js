import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { getTruckId } from "@/lib/models/vehicle";

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
    try {
      const truckId = await getTruckId(req.body.truck_type)
      const { data, error } = await supabase
        .from('search_requests')
        .insert({
          source: req.body.source,
          destination: req.body.destination,
          weight: req.body.weight,
          height: req.body.height,
          length: req.body.length,
          type_id: truckId,
          scheduled_at: req.body.scheduled_at,
          duration: req.body.duration,
          distance: req.body.distance,
          user_id: userId,
          source_eloc: req.body.eloc1,
          destination_eloc: req.body.eloc2
        }).select();
      
      console.log({error});
      console.log(data[0]);
      const searchRequestData = data[0];
      
      res.status(200).json({search_request: searchRequestData});
    } catch (error) {
      console.log(error);
    }
  }
}