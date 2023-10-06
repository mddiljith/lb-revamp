import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import {getUserRole} from "../../../services/Authentication/apiRole";

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
  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();
  //Get vehicles based on the roles

  console.log('Vehicles API', session.user.id);

  // Get role
  async function getUserRole(user_id) {
    let { data: role, error } = await supabaseServerClient
    .from('users')
    .select('role_meta_data')
    .eq('id', user_id)
  
    return role
  }

  const data = await getUserRole(session.user.id)
  const role = data[0]?.role_meta_data?.role_id
  console.log('User ROle', {role})
  // owner --> All vehicles owner
  async function getVehicleData(owner_id) {
    
    let { data: vehicleData, error } = await supabaseServerClient
    .from("vehicles")
    .select("*")
    .eq("owner_id", owner_id);
    console.log("ERROR",{error});
    return vehicleData;
  }
  const vehicle_data = await getVehicleData(session.user.id)

  //Driver--> assigned vehicles
  // specific vehicle may be seperately get by id - need to create anotehr hook/api
  console.log({vehicle_data});
  res.status(200).json(vehicle_data);
  
};
