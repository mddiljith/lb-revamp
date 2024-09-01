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
  const statusId = req.query.status_id
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
    const search_request_id = req.body.search_request_id;
    const vehicle = await getVehicleId();
    const trackingId = generateTrackingId();

    let { payment_id, sr_error } = await supabaseServerClient
      .from('payments')
      .select("*")
      .eq('search_request_id', search_request_id);
    console.log("Error: ",sr_error)
    console.log(payment_id)

    let { data, error } = await supabaseServerClient
      .from('trips')
      .insert({
        search_request_id: search_request_id,
        vehicle_id: vehicle.id,
        distance: 100,
        tracking_id: trackingId,
        payment_status_id: 7,
        status_id: 4,
        payment_id: payment_id
      }).select();
      
      if(error) {
        console.log({error})
        return error
      } else {
        console.log({data})
      }
      

      return {data};
  }

  const getTrips = async (userId, statusId) => {
    let { data: trips, error } = await supabaseServerClient
      .from('trips')
      .select(`
        id, created_at, tracking_id,
        statuses(
          id,
          name
        ), 
        status_id,
        vehicles!inner(
          id,
          model,
          plate_number,
          driver_id,
          users!vehicles_driver_id_fkey(
            name,
            email
          ),
          owner_id
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
        payments(
          id,
          price,
          transaction_id
        ),
        payment_status(
          id,
          statuses(
            id,
            name
          )
        )   
      `)
      .eq(`vehicles.${userField}`, `${userId}`)
      .eq('status_id', statusId)

    if(error) {
      console.log(error);
      return error
    }
    return trips;
  }

  const getAllTrips = async (userId) => {
    let { data: trips, error } = await supabaseServerClient
      .from('trips')
      .select(`
        id, created_at, tracking_id,
        statuses(
          id,
          name
        ), 
        status_id,
        vehicles!inner(
          id,
          model,
          plate_number,
          driver_id,
          users!vehicles_driver_id_fkey(
            name,
            email
          ),
          owner_id
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
        payments(
          id,
          price,
          transaction_id
        ),
        payment_status(
          id,
          statuses(
            id,
            name
          )
        )   
      `)
      .eq(`vehicles.${userField}`, `${userId}`)

    if(error) {
      console.log(error);
      return error
    }
    return trips;
  }

  const getShipperTrips = async (userId) => {
    let { data: trips, error } = await supabaseServerClient
      .from('trips')
      .select(`
        id, created_at, tracking_id,
        statuses(
          id,
          name
        ), 
        status_id,
        vehicles!inner(
          id,
          model,
          plate_number,
          users!vehicles_driver_id_fkey(
            name,
            email
          ),
          owner_id
        ),
        search_requests(
          id,
          source,
          destination,
          users(
            email,
            name
          ),
          scheduled_at
        ),
        payments(
          id,
          price,
          transaction_id
        ),
        payment_status(
          id,
          statuses(
            id,
            name
          )
        )   
      `)
      .eq('search_requests.user_id', `${userId}`)

    if(error) {
      console.log('error',error);
      return error
    }
    return trips;
  }

  if(req.method == "GET") {
    if (role != 1) {
      if (statusId) {
        tripResponse = await getTrips(userId, statusId);
      } else {
        tripResponse = await getAllTrips(userId);
      }
    }
    else {
      tripResponse = await getShipperTrips(userId);
    }
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

  if(tripResponse) {
    res.status(200).json(tripResponse);
  } else {
    res.status(404).json([]);
  }
};
