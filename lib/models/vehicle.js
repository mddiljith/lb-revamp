import supabase from "@/supabase";

export async function getTruckId(name) {
  const { data, error } = await supabase
    .from('types')
    .select()
    .eq('name', name )
    .maybeSingle()

  return data.id;
}