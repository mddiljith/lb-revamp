import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import {getVehicleId, generateTrackingId} from "@/lib/utils/getVehicleId";

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
  const { status_id } = req.query

  let userField = "";
  switch(role) {
    case '3':
      userField = 'driver_id'
      break;
    case '2':
      userField = 'owner_id'
      break;
    default:
      userField = 'shipper_id'
      break;
  }

  const createTrips = async () => {
    const s_r_id = req.body.search_request_id;
    const vehicle = await getVehicleId();
    console.log(vehicle.id)
    const trackingId = generateTrackingId();

    let { sr, sr_error } = await supabaseServerClient
      .from('payments')
      .select("id")
      .eq('search_request_id', s_r_id);

    let { data, error } = await supabaseServerClient
      .from('trips')
      .insert({
        search_request_id: s_r_id,
        vehicle_id: vehicle.id,
        distance: 100,
        tracking_id: trackingId,
        payment_status_id: 7,
        status_id: 4,
        payment_id: sr[0].id
      }).select();
      console.log("Error in Trip create******");
      console.log(error);
      console.log("Data in Trip create******");
      console.log(data);
      
      if(error) {
        return error
      }

      return {data};
  }

  const selectPayment = async () => {
    
  }

  const userFieldCheck = () => {
    if (role != 1) {
      // for owner & driver
      return `eq(vehicles.${userField}, ${userId}).eq(status_id, ${status_id})`
    } else {
      // for shipper
      return `eq(search_requests.user_id, ${userId}).eq(status_id, ${status_id})`
    }
  }

  const getTrips = async (userId) => {
    let tripFilter = userFieldCheck();

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
          destination,
          users(
            email,
            name
          )
        ),
        payment_status(
          id,
          statuses(
            name
          )
        )   
      `).tripFilter

    if(error) {
      return error
    }
    
    return trips;
  }

  if(req.method == "GET") {
    tripResponse = await getTrips(userId);
  } else if (req.method == "POST") {
    tripResponse = await createTrips();
  }

  // Get role
  async function getUserRole(user_id) {
    let { data: role, error } = await supabaseServerClient
    .from('users')
    .select('role_meta_data')
    .eq('id', user_id)
  
    return role
  }

  

  
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
