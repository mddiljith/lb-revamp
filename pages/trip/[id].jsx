import React from 'react';
import DriverLayout from '@/Components/Driver/DriverLayout';

const TripMain = () => {
  return (
    <div class="grid grid-flow-row-dense grid-cols-3 grid-rows-3 ...">
      <div class="col-span-2">
        Map area
      </div>
      <div class="col-span-2">
        Some other section
      </div>
      <div>Trip timeline</div>
      <div>Yer another section</div>
    </div>
  );
}

export default TripMain;

TripMain.getLayout = function getLayout(page) {
  return <DriverLayout>{page}</DriverLayout>;
};