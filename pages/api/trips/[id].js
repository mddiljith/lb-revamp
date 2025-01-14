import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

module.exports = async (req, res) => {
  const supabaseServerClient = createPagesServerClient({
    req,
    res,
  });

  // res.setHeader('Cache-Control', 'public', 's-maxage=10', 'stale-while-revalidate=59')

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  let tripResponse = []
  const data = await getUserRole(session.user.id)
  const role = data[0]?.role_meta_data?.role_id
  const userId = session.user.id
  const id = req.query.id

  const getTrips = async (id) => {
    let { data: trips, error } = await supabaseServerClient
      .from('trips')
      .select(`
        id,
        created_at,
        tracking_id,
        statuses(
          id,
          name
        ),
        vehicles!inner(
          id,
          model,
          plate_number,
          driver_id,
          users!vehicles_driver_id_fkey(
            name,
            email
          )
        ),
        search_requests(
          id,
          source,
          destination,
          source_eloc,
          destination_eloc,
          distance,
          duration,
          users(
            email,
            name
          ),
          payments(
            id,
            price
          )  
        ),
        payment_status(
          id,
          statuses(
            name
          )
        ) 
      `).eq('id', id)

    if(error) {
      return error
    }
    
    return trips;
  }

  const updateTrip = async () => {
    const trip = req.body
    let { data, error } = await supabaseServerClient
        .from('trips')
        .update(trip)
        .eq('id', trip.id)
        .select();

    if(error) {
      return error
    }
    return data;
  }

  if(req.method == "GET") {
    tripResponse = await getTrips(id);
  } else if(req.method == "PUT") {
    tripResponse = await updateTrip(id)
  }

  // Get role
  async function getUserRole(user_id) {
    let { data: role, error } = await supabaseServerClient
    .from('users')
    .select('role_meta_data')
    .eq('id', user_id)
  
    return role
  }
  if(tripResponse) {
    res.status(200).json(tripResponse);
  } else {
    res.status(404).json([]);
  }
};
