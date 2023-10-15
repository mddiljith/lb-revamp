import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

module.exports = async (req, res) => {
  const supabaseServerClient = createPagesServerClient({
    req,
    res,
  });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();
  //Get vehicles based on the roles
  let responseData = [];
  const data = await getUserRole(session.user.id)
  const role = data[0]?.role_meta_data?.role_id

  let user_field = "";
  if(role == "3") {
    user_field = "driver_id"
  } else if(role == "2") {
    user_field = "owner_id";
  } else {
    res.status(404).json({"message": "No Role found"}); 
  }

  if(req.method == "GET") {
    responseData = await getVehicleData(user_field, session.user.id);
  } else if(req.method == "POST") {
    if(req.body.data) {
      responseData = await createVehicle(req.body.data);
    }else {
      res.status(403).json({"message": "Cannot create vehicle, no data found"}); 
    }
  }
  
  // Get role
  async function getUserRole(user_id) {
    let { data: role, error } = await supabaseServerClient
    .from('users')
    .select('role_meta_data')
    .eq('id', user_id)
  
    return role
  }  

  // owner --> All vehicles owner
  async function getVehicleData(user_field, id) {
    console.log({user_field})
    let { data: vehicleData, error } = await supabaseServerClient
    .from("vehicles")
    .select(`*, types(name), statuses(name)`)
    .eq(`${user_field}`, id);
    console.log("ERROR",{error});
    return vehicleData;
  }
  
  res.status(200).json(responseData);  
};
