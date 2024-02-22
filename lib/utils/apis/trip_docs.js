import { callApi } from "../api";

export async function createTripDoc(trip) {
  const requestParams = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(trip) 
  };

  const data = await callApi(`/api/trip_docs`, requestParams);
  return data;
}