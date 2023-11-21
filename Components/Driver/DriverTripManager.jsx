import React, { useState, useEffect } from "react";
import TripTableDriver from "./TripTableDriver";
import TripRowOwner from "../Owner/TripRowOwner";
import { callApi } from "@/lib/utils/api";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Card,
  CardBody,
  Typography
} from "@material-tailwind/react";
import Table from "@/Components/ui/Table";
import { DRIVER_TRIP_TABS, DRIVER_TRIP_HEADERS } from "@/lib/const/DashboardLinksConst";
import DriverTripListing from "./DriverTripListing";



const DriverTripManager = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [trips, setTrips] = useState([]);

  async function fetchTripsForDriver() {
    const requestParams = {
      headers: { "Content-Type": "application/json" }
    }
    const trips_data = await callApi(`/api/trips`, requestParams);
    setTrips(trips_data);
    console.log({trips_data})
  }

  const handleTabChange = (tabId) => {
    console.log(tabId);
  }

  useEffect(() => {
    fetchTripsForDriver(activeTab);
  }, [activeTab]);

  return (
    <div className="mt-8 mb-8 flex flex-col gap-12 p-3">
      <Card>
        <CardBody>
          <Tabs value={activeTab}>
            <TabsHeader
              indicatorProps={{
                className: "bg-blue-500 text-blue-500",
              }}
            >
               {DRIVER_TRIP_TABS.map(({label, key}) => (
                <Tab 
                  value={key} 
                  key={key} 
                  onClick={() => setActiveTab(key)}
                  className="hover:font-semibold active:font-semibold hover:bg-light-blue-100 active:bg-light-blue-100 focus:bg-light-blue-100 {activeTab == key ? 'text-gray-900':''}" >
                    {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
                {DRIVER_TRIP_TABS.map(({label, secondary_label, key}) => (
                  <TabPanel value={key} key={key}>
                    <Table topCard={
                      <Table.Top>
                        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                          <div>
                            <Typography variant="h5" color="blue-gray">
                              {secondary_label} Trips
                            </Typography>
                          </div>
                        </div>
                      </Table.Top>
                    }>
                    
                    <Table.Header header={DRIVER_TRIP_HEADERS} />
                    <Table.Body
                      data={trips}
                      render={(trip, i) => (
                        <DriverTripListing 
                          row={trip} 
                          key={trip.id} 
                          index={i} 
                        />
                      )}
                    />
                    </Table>
                  </TabPanel>
                ))}

              <TabPanel value={1}>
                <TripTableDriver trips={[]} />
              </TabPanel>
              <TabPanel value={2}>
                <p>Upcoming trips</p>
              </TabPanel>
              <TabPanel value={3}>
                <p>Cancelled trips</p>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default DriverTripManager;
