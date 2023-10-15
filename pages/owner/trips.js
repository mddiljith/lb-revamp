import React from "react";
import OwnerLayout from "@/Components/Owner/OwnerLayout";
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
import TripTableOwner from "@/Components/Owner/TripTableOwner";

import { useTrips } from "@/hooks/trips/useTrips";

function Trips() {
  const { data, error, isLoading } = useTrips();
  console.log(data);

  return (
    <div className="mt-8 mb-8 flex flex-col gap-12 p-3">
      <Card>
        <CardBody>
          <Tabs value={1}>
            <TabsHeader
              indicatorProps={{
                className: "bg-blue-500 text-blue-500",
              }}
            >
              <Tab value={1}>Completed</Tab>
              <Tab value={2}>Upcoming</Tab>
              <Tab value={3}>Cancelled</Tab>
            </TabsHeader>
            <TabsBody>
              <TabPanel value={1}>
                {isLoading ? (
                  <Spinner color="blue" />
                ) : (
                  <TripTableOwner trips={data} />
                )}
              </TabPanel>
              <TabPanel value={2}>
                <p>tripupcoming to be pasted here</p>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}

export default Trips;

Trips.getLayout = function getLayout(page) {
  return <OwnerLayout>{page}</OwnerLayout>;
};

//<TripCompleted data={data} />
