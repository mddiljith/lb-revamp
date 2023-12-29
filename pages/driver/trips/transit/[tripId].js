import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DriverLayout from '@/Components/Driver/DriverLayout';
import { useTrip } from '@/hooks/trips/useTrip';
import {
  Spinner,
} from "@material-tailwind/react";
import PickupConfirmForm from '@/Components/Driver/PickupConfirmForm';

const TripMain = () => {
  const { isLoading, error, trip, tripStatus }  = useTrip()

  return (
    <>
      {isLoading && <div className="flex items-center justify-center h-screen bg-gray-100" >
        <Spinner />
      </div>}
      {trip && (
        <PickupConfirmForm/>
      )}
    </>
  );
}

export default TripMain;

TripMain.getLayout = function getLayout(page) {
  return <DriverLayout>{page}</DriverLayout>;
};