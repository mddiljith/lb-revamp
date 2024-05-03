import { callApi } from "../api";

export async function updateVehicle(vehicleData) {
  const requestParams = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vehicleData) 
  };

  const data = await callApi(`/api/vehicles/${vehicleData.id}`, requestParams);
  return data;
}

export async function fetchVehicleWithId(id) {
  const requestParams = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  const data = await callApi(`/api/vehicles/${id}`, requestParams);
  return data;
}