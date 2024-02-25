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
  Typography
} from "@material-tailwind/react";
import { fetchVehicleWithId, updateVehicle } from "@/lib/utils/apis/vehicles";
import { FaCaretRight } from "react-icons/fa";

function UpdateVehicleStatus({ open, handleOpen, cacheKey }) {
  const [check, setcheck] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');
  const getSelectedVehicle = async () => {
    const data = await fetchVehicleWithId(cacheKey);
    if(data) {
      if (data[0]?.statuses?.id == 2) {
        setcheck(false)
        const status_remarks = data[0]?.status_remarks
        setSelectedOption(status_remarks)
      }
    }
  }

  useEffect(() => {
    getSelectedVehicle()
  }, [])
  
  const handleChange = () => {
    setcheck(!check);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event);
  }
  
  const handleSubmit = async (event) => {
    const payload = {
      id: cacheKey,
      status_id: check ? 1 : 2,
      status_remarks: check ? '' : selectedOption
    }
    const data = await updateVehicle(payload)
    if(data){
      handleOpen()
    }
  };

  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <Typography variant="h5" color="#607d8b" className="p-3">Change status</Typography>
        </DialogHeader>
        <DialogBody divider>
          <div className="flex flex-row gap-4 items-center">
            <Typography variant="small" className="p-3 font-semibold">Truck Status : </Typography>  
            <div className="w-3/4">
              <Switch
                id="status"
                checked={check}
                onChange={handleChange}
                label={check ? "Active" : "Inactive"}
                ripple={false}
              />
            </div>
          </div>
          <div>
            {!check && (
              
              <div className="h-20 flex justify-items-center items-center">
                <Typography variant="small" className="px-3 font-semibold">Reason for inactivity : </Typography>  
                <Select
                  variant="static"
                  className="w-full font-semibold"
                  lockScroll
                  onChange={handleSelectChange}
                  value={selectedOption}
                >
                  <Option value="Periodic Service">Periodic Service</Option>
                  <Option value="Tyre Change">Tyre Change</Option>
                  <Option value="Break down">Break down</Option>
                  <Option value="Others">Others</Option>
                </Select>
              </div>
            )}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button type="submit" className="text-xs p-2" variant="outlined" color="teal" onClick={handleSubmit}>
            <div className="flex justify-center items-center p-0">
              <FaCaretRight size={15} />
              <span>Confirm</span>
            </div>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default UpdateVehicleStatus;