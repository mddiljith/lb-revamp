import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Switch,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";

function UpdateVehicleStatus({ open, handleOpen, cacheKey }) {
  const [check, setcheck] = useState(false);

  useEffect(() => {
  }, []);

  const handleChange = () => {
    setcheck(!check);
  };

  const handleSubmit = async () => {
  };

  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader> Change vehicle status</DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col gap-4 h-auto">
            <div className="w-full">
              <span className="text-semibold">Vehicle Status : </span>{" "}
              <Switch
                id="status"
                checked={check}
                onChange={handleChange}
                label={check ? "Active" : "Inactive"}
                ripple={false}
              />
            </div>
            {!check && (
              <div className="h-20 flex justify-items-center items-center">
                <Select
                  variant="static"
                  label="Reason for the deactivating the Vehcle"
                  className="w-full"
                  lockScroll
                >
                  <Option value={1}>Periodic Service</Option>
                  <Option value={2}>Tyre Change</Option>
                  <Option value={3}>Break down</Option>
                  <Option value={4}>other</Option>
                </Select>
              </div>
            )}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default UpdateVehicleStatus;