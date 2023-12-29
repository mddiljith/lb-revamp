import supabase from "@/supabase";

export async function getTruckId(name) {
  const { data, error } = await supabase
    .from('types')
    .select()
    .eq('name', name )
    .maybeSingle()

  return data.id;
}

// Create a new vehicle
export async function createVehicle(vehicle, user_id) {
  const truckId = await getTruckId(vehicle.truck_type)
  const { data, error } = await supabase
  .from('vehicles')
  .insert({
    model: vehicle.model,
    model_year: vehicle.model_year,
    plate_number: vehicle.registration_number,
    type_id: truckId,
    status_id: 1,
    owner_id: user_id 
  }).select()
    
  if(error) {
    console.log({error})
    return error
  }

  return {data};
}

// Get all vehicles based on user role
export async function getVehicleData(user_field, id) {
  let { data: vehicleData, error } = await supabase
  .from("vehicles")
  .select(`*, types(name), statuses(name)`)
  .eq(`${user_field}`, id);
  console.log("ERROR",{error});
  return vehicleData;
}