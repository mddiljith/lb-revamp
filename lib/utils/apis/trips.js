import { callApi } from "../api";

export async function createTrip(trip) {
  const requestParams = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(trip) 
  };

  const data = await callApi(`/api/trips`, requestParams);
  return data;
}

export async function updateTrip(trip) {
  const requestParams = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(trip) 
  };

  const data = await callApi(`/api/trips/${trip.id}`, requestParams);
  return data;
}

export async function fetchTripWithId(id) {
  const requestParams = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  const data = await callApi(`/api/trips/${id}`, requestParams);
  return data;
}

export async function fetchTrips() {
  const requestParams = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  const data = await callApi(`/api/trips`, requestParams);
  return data;
}