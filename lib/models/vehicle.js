import supabase from "@/supabase";

export async function getTruckId(name) {
  const { data, error } = await supabase
    .from("types")
    .select()
    .eq("name", name)
    .maybeSingle();

  return data.id;
}

// Create a new vehicle

export async function createVehicle(vehicle, user_id) {
  const rcFile = `${Math.random()}-${vehicle.rc_photo.name}`.replaceAll(
    "/",
    ""
  );

  const rcPath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/vehicle/rc-book/${rcFile}`;

  //add this path to insert data
  //https://czeuhxbwlhmtszaczaoa.supabase.co/storage/v1/object/public/vehicle/rc-book/test.png
  //1.create vehicle
  const truckId = await getTruckId(vehicle.truck_type);
  const { data, error } = await supabase
    .from("vehicles")
    .insert({
      model: vehicle.model,
      model_year: vehicle.model_year,
      plate_number: vehicle.registration_number,
      type_id: truckId,
      status_id: 1,
      owner_id: user_id,
      rcBook: rcPath,
    })
    .select();

  if (error) {
    console.log({ error });
    return error;
  }

  //2. Upload files
  const { error: storageError } = await supabase.storage
    .from("vehicle")
    .upload(`rc-book/${user_id}/${rcFile}`, vehicle.rc_photo);

  //3.delete the cabin if there was an error while uploading
  if (storageError) {
    await supabase.from("vehicles").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Rc book upload got failed Truck is not created");
  }

  return { data };
}

// Get all vehicles based on user role
export async function getVehicleData(user_field, id) {
  let { data: vehicleData, error } = await supabase
    .from("vehicles")
    .select(`*, types(name), statuses(name)`)
    .eq(`${user_field}`, id);
  console.log("ERROR", { error });
  return vehicleData;
}
