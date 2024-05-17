import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

const generateTrackingId = () => {
  return Math.floor(Math.random() * 999999);
}

module.exports = async (req, res) => {
  const supabaseServerClient = createPagesServerClient({
    req,
    res,
  });
  
  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  const searchRequestId= req.body.searchRequestId
  const price= req.body.price

  try {
    if(req.method == "POST") {
      
      // Creates trip
      const trip = createTripForUser(searchRequestId)

      // Creates payment record and add trip id to it
      const paymentResult = createPaymentForTrip(trip, price);

      res.status(200).json({ trip, paymentResult });
    }
  } catch (err) {
    console.log("catchErr", err);
    res.status(403).json({ status: '403', message: "Something went wrong"});
  }

  // Method to call Trip API /api/trips
  const createPaymentForTrip = async (trip, price) => {
    let paymentResponse = null;

    let { data: role, error } = await supabaseServerClient
    .from('payments')
    .insert({
      price: price,
      transaction_id: generateTrackingId(),
      trip_id: trip.id
    })
    .select();
    return data;
  }

  // Method to insert payment data 
  const createTripForUser = async (searchRequestId) => {
    let tripResponse = null; 
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/trips`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        search_request_id: searchRequestId,
        vehicle_id: 1,
        distance: 100,
        tracking_id: generateTrackingId()
      })
    }).then((response) => {
      tripResponse = response;
    })
    return tripResponse;
  }
}