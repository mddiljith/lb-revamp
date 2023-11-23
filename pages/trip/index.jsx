import React from 'react';
import DriverLayout from '@/Components/Driver/DriverLayout';

const TripHome = () => {
  return (
    <>
    Trip details to be shown here.
    </>
  );
}

export default TripHome;

TripHome.getLayout = function getLayout(page) {
  return <DriverLayout>{page}</DriverLayout>;
};