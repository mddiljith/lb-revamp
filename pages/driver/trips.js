import React from "react";
import DriverLayout from "@/Components/Driver/DriverLayout";
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

// import { useTrips } from "@/hooks/trips/useTrips";

function Trips() {
	return(<div>Trips table</div>)
}

export default Trips;

Trips.getLayout = function getLayout(page) {
  return <DriverLayout>{page}</DriverLayout>;
};