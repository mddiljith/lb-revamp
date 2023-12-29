import { callApi } from "./api";

export async function getVehicleId() {
  const requestParams = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const data = await callApi(`${process.env.NEXT_PUBLIC_SITE_URL}/api/vehicles/vehicleIds`, requestParams);
  let selected_vehicle = data[Math.floor(Math.random() * data.length)]
  return selected_vehicle;
}

export const generateTrackingId = () => {
  return Math.floor(Math.random() * 999999);
}
