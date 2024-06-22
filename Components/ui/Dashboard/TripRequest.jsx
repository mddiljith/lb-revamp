import { Typography, Button, Chip } from '@material-tailwind/react';
import React from 'react';
const TripRequest = ({trip}) => {
  console.log(trip)
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
              <Button color="green" size="sm">Approve</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TripRequest;