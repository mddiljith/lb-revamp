import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { createVehicle, getVehicleData } from "@/lib/models/vehicle";
import { getUserRole, getRoleUserField } from "@/lib/models/role";

module.exports = async (req, res) => {
  let responseData = [];
  let user_field = "";
  
  const supabaseServerClient = createPagesServerClient({
    req,
    res,
  });
  
  const { data: { session }, } = await supabaseServerClient.auth.getSession();
  const data = await getUserRole(session.user.id)
  const role = data[0]?.role_meta_data?.role_id
  user_field = getRoleUserField(role)
  
  if(req.method == "GET") {
    responseData = await getVehicleData(user_field, session.user.id);
  } else if(req.method == "POST") {
    const { newTruck } = req.body
    
    if(newTruck) {
      responseData = await createVehicle(newTruck, session.user.id);
    }else {
      res.status(403).json({"message": "Cannot create vehicle, no data found"}); 
    }
  } 
  
  res.status(200).json(responseData);  
};
