import DriverLayout from "@/Components/Driver/DriverLayout";
import React from "react";
import GenericCard from "@/Components/ui/GenericCard";
import Trips from "@/Components/ui/Dashboard/Trips"
function DriverHome() {
  return (
    <>
      <div className="flex px-8">
        <div className="flex-1/2">
          <GenericCard title="Today's Revenue" content="100" notice="50 less than yesterday" />
        </div>
        <div className="flex-1/2">
          <GenericCard title="Current Month Revenue" content="1200" notice="120 less than last month"/>
        </div>
        <div className="flex-2">
          <Trips/>
        </div>
      </div>
    </>
    )
}

export default DriverHome;

DriverHome.getLayout = function getLayout(page) {
  return <DriverLayout>{page}</DriverLayout>;
};

