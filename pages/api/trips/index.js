import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

module.exports = async (req, res) => {
  const supabaseServerClient = createPagesServerClient({
    req,
    res,
  });
  //as per the previous setup

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  console.log(req.query);
  if(req.method == "GET") {
    const ownerId = req.query.ownerId
    const driverId = req.query.driverId
    const statusId = req.query.status_id
    if(ownerId) {
      console.info('ownerId', ownerId);
      let { data, error } = await supabase
      .rpc('get_trips_data')
      .eq('f_vehicle_owner_id', ownerId);
      res.status(200).json(data);
    } else if(driverId) {
      console.info('driverId', driverId);
      let { data, error } = await supabase
        .from('trips')
        .select(`
        tracking_id, 
        status_id, 
        payment_status(
          id,
          statuses(
            id,
            name
          )
        ), 
        vehicles(
          id, 
          driver_id
        ),   
        search_requests(
          id,
          source,destination,
          users(
            id,
            email,
            name
          ))`
        ).eq('vehicles.driver_id', driverId)
        .eq('status_id', parseInt(statusId));
      console.log("ERROR", error);
      console.log('Trips', data);
      //if(error != null) {
      res.status(200).json(data);
      //}
    } else {
      res.status(500).json({"error": "error"});
      res.end();
    }
  } else if(req.method == 'POST') {
    console.log('POST API');
  } else if(req.method == 'PUT') {
    const trackingId = req.body.trackingId;
    const statusId = req.body.statusId;
    let { data, error } = await supabase
      .from('trips')
      .update({ status_id: statusId })
      .eq('tracking_id', trackingId)
      .select(); 
  }

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
};
