import React, { useState, useEffect } from "react";
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
  const [activeTab, setActiveTab] = useState("5");
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    async function fetchTripsForDriver() {
      const requestParams = {
        headers: { "Content-Type": "application/json" }
      }
      const trips_data = await callApi(`/api/trips?status_id=${activeTab}`, requestParams);
      setTrips(trips_data);
    }
    fetchTripsForDriver(activeTab);
    console.log(activeTab)
  }, [activeTab]);

  return (
    <div className="flex flex-col mt-8 mb-8 py-6 border">
      
      <Tabs value={activeTab} className="tab-main">
        <TabsHeader
          className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
          indicatorProps={{
            className: "bg-transparent border-b-2 border-gray-50 shadow-none rounded-none",
          }}
        >
            {DRIVER_TRIP_TABS.map(({label, key}) => (
            <Tab 
              value={key} 
              key={key} 
              onClick={() => setActiveTab(key)}
              className={`${activeTab === key ? "font-semibold text-blue-900 driver-tab-active" : ""}`} >
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
                    <Typography variant="h5" color="blue-gray">
                      {secondary_label} Trips
                    </Typography>
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
        </TabsBody>
      </Tabs>
        
    </div>
  );
};

export default DriverTripManager;
