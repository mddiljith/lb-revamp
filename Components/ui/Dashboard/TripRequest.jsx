import { Typography, Button, Chip } from '@material-tailwind/react';
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { callApi } from "@/lib/utils/api";

const TripRequest = ({trip}) => {
  console.log(trip)
  const [status, setStatus] = useState(4)
  const router = useRouter()

  const tripId = trip.id
  const acceptTrip = async () => {
    const requestParams = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: tripId, status_id: 5 }), // Change status to inprogress
    };
    const result = await callApi(`/api/trips/${tripId}`, requestParams)
    toast.success(
      "Trip accepted successfully."
      );
      
    setStatus(5)
    // setStatus(result[0]?.status_id)
    //Need an alert message here after trip is accepted.
    router.push(`/driver/mob/prepickup?tripId=${tripId}`)
  }

  return(
    <>
      <div className='border p-2 w-full'>
        <div className='flex px-4 mt-4'>
          <Chip color="amber" className='px-4' value="Pending Trip"/>
        </div>
        <div className='mt-5 px-4 w-full'>
          <div className='flex gap-6'>
            <Typography variant="h4" color="blue" className='w-1/4 mb-3'>#{trip.tracking_id}</Typography>
            <Typography variant="h5">{trip?.search_requests?.source}</Typography>
            &rarr;
            <Typography variant="h5" className='w-1/4'>{trip?.search_requests?.destination}</Typography>
            <Typography variant="h5" color="red">Price: {trip?.payments?.price} INR</Typography>
          </div>
          <div className='flex gap-12 place-content-end'>
            <div className="flex gap-4 p-2">
              <Button size="sm">View in Map</Button>
              <Button color="gray" size="sm" variant='outlined'>Reject</Button>
              <Button color="green" size="sm" onClick={acceptTrip}>Approve</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TripRequest;