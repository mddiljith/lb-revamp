import { Avatar, Button, Card, Input, Radio } from "@material-tailwind/react";
import React, { useState } from "react";

import { FiUpload, FiPlus } from "react-icons/fi";
// import {
//   createVehicleState,
//   showVehicleAddState,
// } from "../../context/VehicleAtom";
import { useSetRecoilState, useRecoilState, useResetRecoilState } from "recoil";
import { useSWRConfig } from "swr";
import Loading from "../ui/Loader";
import { toast } from "react-toastify";

function Addvehicle() {
  //mutate the create vehicle

  // const [vehicleData, setVehicleData] = useRecoilState(createVehicleState);
  // const [vehicleData, setVehicleData] = useState({
  //   model: "",
  //   model_year: "",
  //   plate_number: "",
  //   truck_type: "",
  //   status_id: "",
  //   rc_photo: "",
  //   vehicle_photo: "",
  //   owner_id: "",
  // });
  // const setShowForm = useSetRecoilState(showVehicleAddState);

  // const { mutate } = useSWRConfig();
  // console.log(cacheKey);

  // async function createVehicle() {
  //   const requestParams = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ data: vehicleData }),
  //   };
  //   await fetch("../api/vehicles", requestParams)
  //     .then((data) => {
  //       return data;
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       toast("Oops! vehcile is not created  ");
  //     });

  //   mutate(cacheKey);
  // }

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    await createVehicle();
    setIsloading(false);
    setVehicleData({
      model: "",
      model_year: "",
      plate_number: "",
      truck_type: "",
      status_id: "",
      rc_photo: "",
      vehicle_photo: "",
      owner_id: "",
    });
    setShowForm(false);
    // toast("Succesfully created your truck ");
  };

  const handleChange = (e) => {
    setVehicleData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <>
      <Card className="px-3 my-2 pb-2">
        <form className="flex flex-col gap-1 p-2 mt-5 " onSubmit={onSubmit}>
          <div className="grid grid-cols-3 gap-2">
            {isLoading ? (
              <Loading />
            ) : (
              <div className="flex flex-col gap-4 col-span-2">
                <div className="mb-6">
                  <label>Truck Type</label>
                  <Radio
                    id="truck-open"
                    name="truck_type"
                    label="Open"
                    value="Open"
                    checked={vehicleData.truck_type === "Open"}
                    onChange={handleChange}
                  />
                  <Radio
                    id="truck-mini"
                    name="truck_type"
                    label="Small Truck"
                    value="Small Truck"
                    checked={vehicleData.truck_type === "Small Truck"}
                    onChange={handleChange}
                  />
                  <Radio
                    id="truck-container"
                    name="truck_type"
                    label="Container"
                    value="Container"
                    checked={vehicleData.truck_type === "Container"}
                    onChange={handleChange}
                  />
                </div>
                <Input
                  variant="static"
                  label="Vehicle model"
                  defaultValue={vehicleData.model}
                  name="model"
                  onChange={handleChange}
                />
                <Input
                  variant="static"
                  label="Model year"
                  defaultValue={vehicleData.model_year}
                  name="model_year"
                  onChange={handleChange}
                />
                <Input
                  variant="static"
                  label="Registration Number"
                  placeholder="e.g. TN75AA7106"
                  defaultValue={vehicleData.plate_number}
                  name="plate_number"
                  onChange={handleChange}
                />
              </div>
            )}

            <div>
              <input
                id="vehicleImage"
                type="file"
                hidden
                name="vehicle_photo"
                defaultValue={vehicleData.vehicle_photo}
                onChange={handleChange}
              />

              <label htmlFor="vehicleImage" className="text-sm ">
                <div className="flex flex-col gap-2 p-2">
                  <Avatar src="/img.png" alt="avatar" size="xxl" />
                  <span className="text-sm">
                    Upload vehicle photo with RC number
                  </span>
                </div>
              </label>
            </div>
          </div>

          <label htmlFor="doc" className="w-4/12">
            <div className="flex gap-4  border p-5 bg-blue-50 rounded-md">
              <FiUpload size={28} />
              <span>Upload RC book</span>
            </div>
          </label>

          <input id="doc" type="file" hidden />

          <div className="flex gap-5 mt-5">
            <Button type="submit" color="blue-gray" disabled={isLoading}>
              {isLoading ? "Loading.." : "Submit"}
            </Button>
            <Button
              type="reset"
              variant="outlined"
              color="blue-gray"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
}

export default Addvehicle;
