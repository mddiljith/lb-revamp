import React from "react";
import VehicleRow from "./VehicleRow";
import Table from "../ui/Table";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
  Card
} from "@material-tailwind/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { showAddvehicleState } from "@/context/VehicleAtom";
import { useSetRecoilState } from "recoil";
import { FaPlusCircle } from "react-icons/fa";

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
  const setShowAddVehicle = useSetRecoilState(showAddvehicleState);
  const toggleForm = () => {
    setShowAddVehicle((prev) => !prev);
  };

  return (
    <>
    <Card className="w-600 mx-4 my-3 bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center">
          <Typography variant="h6" className="p-3">Manage your Trucks</Typography>
          <Button ripple={false} className="text-xs p-2" onClick={toggleForm}>
            <div className="flex gap-1 justify-center items-center p-0">
              <FaPlusCircle size={14} />
              <span className="text-xs">Add Truck</span>
            </div>
          </Button>
        </div>
        <div className="overflow-x-auto text-xs">
          <Table className="bg-white">
            <Table.Header header={VEHICLE_HEAD} className="font-semibold"/>
            <Table.Body
              data={vehicleData}
              render={(vehicle, i) => (
                <VehicleRow row={vehicle} key={vehicle.id} index={i} />
              )}
            />
          </Table>
        </div>
      </div>
    </Card>
    </>
  );
}

export default VehicleTable;
