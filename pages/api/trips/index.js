import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

module.exports = async (req, res) => {
  const supabaseServerClient = createPagesServerClient({
    req,
    res,
  });
  //as per the previous setup

  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

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
