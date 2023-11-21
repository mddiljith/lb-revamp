import React from 'react';
import DriverLayout from '@/Components/Driver/DriverLayout';

const TripMain = () => {
  return <div>
    Trip data
  </div>;
}

export default TripMain;

TripMain.getLayout = function getLayout(page) {
  return <DriverLayout>{page}</DriverLayout>;
};