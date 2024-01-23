import { 
  Avatar, 
  Button, 
  Card, 
  Input, 
  Radio, 
  Label,
  UploadIcon,
  AvatarImage,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import { useSetRecoilState } from "recoil";
import {Spinner, Typography} from "@material-tailwind/react";
import { useAddVehicle } from "@/hooks/vehicles/useAddVehicle";
import { showAddvehicleState } from "@/context/VehicleAtom";

function AddvehicleForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();

  const { isCreating, createTruck } = useAddVehicle();
  const setShowAddVehicle = useSetRecoilState(showAddvehicleState);
  const { errors } = formState;
  const onSubmit = async (newTruck) => {
    createTruck(newTruck, {
      onSuccess: () => {
        toast.success("New Truck successfully created");
      },
      onError: () => {
        toast.error("Something went wrong! Truck not created");
      },
    });
    setShowAddVehicle(false);
    reset();
  };

  return (
    <>
      <Card className="w-600 mx-4 my-3 bg-white rounded-lg shadow text-sm p-6">
        <div className="flex justify-between items-center">
          <Typography variant="h6" className="p-3">Create a new Vehicle</Typography>
        </div>
        <form
          className="flex flex-col gap-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-3 gap-2">
            {isCreating ? (
              <Spinner />
            ) : (
              <div className="flex flex-col gap-4 col-span-2">
                <div className="mb-2 flex items-center">
                  <Typography variant="small" className="p-3 font-semibold">Truck Type</Typography>  
                  <Radio
                    className="ml-1 text-small"
                    id="truck-open"
                    name="truck_type"
                    label="Open"
                    value="Open"
                    checked={getValues().truck_type === "Open"}
                    {...register("truck_type", {
                      required: "This field is required",
                    })}
                  />
                  <Radio
                    className="ml-1 text-small"
                    id="truck-mini"
                    name="truck_type"
                    label="Small Truck"
                    value="Small Truck"
                    checked={getValues().truck_type === "Small Truck"}
                    {...register("truck_type", {
                      required: "This field is required",
                    })}
                  />
                  <Radio
                    className="ml-1 text-small"
                    id="truck-container"
                    name="truck_type"
                    label="Container"
                    value="Container"
                    checked={getValues().truck_type === "Container"}
                    {...register("truck_type", {
                      required: "This field is required",
                    })}
                  />
                </div>
                <div className="ml-3 mb-2 flex items-center">
                  <Input
                    variant="static"
                    label="Vehicle model"
                    placeholder="e.g. IZUZU DMAX"
                    // defaultValue={getValues().model}
                    name="model"
                    error={errors?.model?.message}
                    {...register("model", {
                      required: "This field is required",
                    })}
                    className="ml-1 text-small"
                  />
                  <Input
                    variant="static"
                    label="Model year"
                    placeholder="e.g. 2001"
                    // defaultValue={getValues().model_year}
                    name="model_year"
                    error={errors?.model_year?.message}
                    {...register("model_year", {
                      required: "This field is required",
                    })}
                    className="ml-1 text-small font-semibold"
                    
                  />
                  <Input
                    variant="static"
                    label="Registration Number"
                    placeholder="e.g. TN75AA7106"
                    // defaultValue={getValues().plate_number}
                    name="plate_number"
                    error={errors?.plate_number?.message}
                    {...register("registration_number", {
                      required: "This field is required",
                      // pattern: {
                      //   value:
                      //     /^[A-Z]{2}[0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)?[0-9]{4}$/,
                      //   message: "Please provide a valid Registration number",
                      // },
                    })}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center">
            <label htmlFor="doc" className="">
              <div className="flex gap-2 border p-5 rounded-md">
                <FiUpload size={20} />
                <span className="text-sm">Upload RC book</span>
              </div>
            <input id="doc" type="file" hidden {...register("rc_photo")} />
            </label>
            {/* <Input
              id="vehicleImage"
              type="file"
              hidden
              name="vehicle_photo"
              // defaultValue={vehicleData.vehicle_photo}
              {...register("vehicle_photo")}
            /> */}
            <label htmlFor="vehicleImage" className="text-sm">
              <div className="flex justify-between items-center gap-2 p-2">
                <Avatar src="/img.png" alt="avatar" size="sm" />
                <span className="text-sm">
                  Upload vehicle photo with RC number
                </span>
              </div>
            </label>
          </div>
          
          <div className="flex gap-5 mt-5 justify-end">
            <Button type="submit" disabled={isCreating} className="text-xs p-2">
              {isCreating ? "Loading.." : "Submit"}
            </Button>
            <Button
              className="text-xs p-2"
              type="reset"
              variant="outlined"
              onClick={() => {
                setShowAddVehicle(false);
                reset();
              }}
            >Cancel</Button>
          </div>
        </form>
      </Card>
    </>
  );
}

export default AddvehicleForm;
