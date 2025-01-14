import React from "react";
import DriverLayout from "@/Components/Driver/DriverLayout";
import DriverTripManager from "@/Components/Driver/DriverTripManager";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Card,
  CardBody,
  Spinner,
} from "@material-tailwind/react";

// import TripTable from "../../components/User/TripTable";
// import TripTableOwner from "@/Components/Owner/TripTableOwner";
function Trips() {
	return (
    <div>
      <DriverTripManager/>
    </div>
  )
}

export default Trips;

Trips.getLayout = function getLayout(page) {
  return <DriverLayout>{page}</DriverLayout>;
};