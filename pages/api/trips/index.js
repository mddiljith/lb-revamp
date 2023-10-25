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

  let tripResponse = []
  const data = await getUserRole(session.user.id)
  const role = data[0]?.role_meta_data?.role_id
  const userId = session.user.id

  let userField = "";
  switch(role) {
    case '3':
      userField = 'driver_id'
      break;
    case '2':
      userField = 'owner_id'
      break;
    default:
      res.status(404).json({"message": "No Role found"}) 
  }

  if(req.method == "GET") {
    tripResponse = await ownerTrips(userId);
  }

  async function ownerTrips(userId) {
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
          driver_id
        ),
        search_requests(
          id,
          source,
          destination
        ),
        payment_status(
          id,
          status_id
        )   
      `)
      .eq(`vehicles.${userField}`, userId);

    if(error) {
      return error
    }
    
    return trips;
  }

  // Get role
  async function getUserRole(user_id) {
    let { data: role, error } = await supabaseServerClient
    .from('users')
    .select('role_meta_data')
    .eq('id', user_id)
  
    return role
  }

  //   else if(driverId) {
  //     console.info('driverId', driverId);
  //     let { data, error } = await supabase
  //       .from('trips')
  //       .select(`
  //       tracking_id, 
  //       status_id, 
  //       payment_status(
  //         id,
  //         statuses(
  //           id,
  //           name
  //         )
  //       ), 
  //       vehicles(
  //         id, 
  //         driver_id
  //       ),   
  //       search_requests(
  //         id,
  //         source,destination,
  //         users(
  //           id,
  //           email,
  //           name
  //         ))`
  //       ).eq('vehicles.driver_id', driverId)
  //       .eq('status_id', parseInt(statusId));
  //     console.log("ERROR", error);
  //     console.log('Trips', data);
  //     //if(error != null) {
  //     res.status(200).json(data);
  //     //}
  //   } else {
  //     res.status(500).json({"error": "error"});
  //     res.end();
  //   }
  // } else if(req.method == 'POST') {
  //   console.log('POST API');
  // } else if(req.method == 'PUT') {
  //   const trackingId = req.body.trackingId;
  //   const statusId = req.body.statusId;
  //   let { data, error } = await supabase
  //     .from('trips')
  //     .update({ status_id: statusId })
  //     .eq('tracking_id', trackingId)
  //     .select(); 

  

  //or
  // const {
  //   data: { session },
  // } = await supabaseServerClient.auth.getSession();

  // get trips based on the below conditions
  // rpc calls was there, just join some of the linked tables to get full info.
  //1. check user role
  //2. if user role is shipper -> give the trips associated with the shipper
  //3. if user role is owner -->  return the trips associated with the vehicle owned by him
  //4.if user role is driver --> shows only the assigned trips
  //5.trips output have the staus like ongoing, upcoming or cancelled etc to put it in ui
  // console.log('Trip Response', tripResponse)
  if(tripResponse) {
    res.status(200).json(tripResponse);
  } else {
    res.status(404).json([]);
  }

};
