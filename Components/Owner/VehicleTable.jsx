import React from "react";
import VehicleRow from "./VehicleRow";
import Table from "../ui/Table";
import {
  Button,
  Typography,
  Card,
  Dialog,
  DialogBody,
  DialogHeader
} from "@material-tailwind/react";
import { showAddvehicleState } from "@/context/VehicleAtom";
import { useRecoilState } from "recoil";
import { FaPlusCircle } from "react-icons/fa";
import { DRIVER_TRIP_HEADERS } from "@/lib/const/DashboardLinksConst";
import AddvehicleForm from "./AddVehicleForm";

const VEHICLE_HEAD = [
  "Vehicle id",
  "Type",
  "Model",
  "Year",
  "Vehicle Number",
  "Status",
  " ",
];

function VehicleTable({ vehicleData }) {
  const [showAddvehicle, setShowAddVehicle] = useRecoilState(showAddvehicleState);
  const toggleForm = () => {
    setShowAddVehicle((prev) => !prev);
  };
  return (
    <>
      <Dialog open={showAddvehicle} size="lg" handler={toggleForm}>
        <div className="">
          <DialogHeader>
            <Typography variant="h5" color="#607d8b" className="p-3">Add New Truck</Typography>
          </DialogHeader>
          <DialogBody>
            <AddvehicleForm/> 
          </DialogBody>
        </div>
      </Dialog>
      <div className="flex"> 
        <div className="w-full h-80 mx-1 mb-2 bg-white overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center">
              <Typography variant="h6" className="p-3">Manage Trucks</Typography>
              <Button variant="text" ripple={false} color="teal" className="text-xs p-2" onClick={toggleForm}>
                <div className="flex gap-1 justify-center items-center p-0">
                  <FaPlusCircle size={14} />
                  <span className="text-xs">Add Truck</span>
                </div>
              </Button>
            </div>
            <div className="overflow-x-auto text-xs">
              <Table className="bg-white">
                <Table.Header header={VEHICLE_HEAD} className="font-semibold text-small"/>
                <Table.Body
                  data={vehicleData}
                  render={(vehicle, i) => (
                    <VehicleRow row={vehicle} key={vehicle.id} index={i} />
                  )}
                />
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VehicleTable;
