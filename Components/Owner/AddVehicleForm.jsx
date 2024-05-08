import { Avatar, Button, Input, Radio } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import { FaCaretRight } from "react-icons/fa";
import { useSetRecoilState } from "recoil";
import { Spinner, Typography } from "@material-tailwind/react";
import { useAddVehicle } from "@/hooks/vehicles/useAddVehicle";
import { showAddvehicleState } from "@/context/VehicleAtom";

function AddvehicleForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();

  const { isCreating, createTruck } = useAddVehicle();
  const setShowAddVehicle = useSetRecoilState(showAddvehicleState);
  const { errors } = formState;
  const onSubmit = async (newTruck) => {
    console.log(newTruck.rc_photo[0]);
    createTruck(
      { ...newTruck, rc_photo: newTruck.rc_photo[0] },
      {
        onSuccess: () => {
          toast.success("New Truck successfully created");
        },
        onError: () => {
          toast.error("Something went wrong! Truck not created");
        },
      }
    );
    setShowAddVehicle(false);
    reset();
  };

  return (
    <>
      <form className="flex flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-2">
          {isCreating ? (
            <Spinner />
          ) : (
            <div className="flex flex-col gap-4 col-span-2">
              <div className="mb-2 flex items-center">
                <Typography variant="small" className="p-3 font-semibold">
                  Truck Type
                </Typography>
                <Radio
                  className="ml-1"
                  id="truck-open"
                  name="truck_type"
                  label={<span className="text-xs">Open</span>}
                  value="Open"
                  // checked={getValues().truck_type === "Open"}
                  {...register("truck_type", {
                    required: "This field is required",
                  })}
                />
                <Radio
                  className="ml-1"
                  id="truck-mini"
                  name="truck_type"
                  label={<span className="text-xs">Small Truck</span>}
                  value="Small Truck"
                  // checked={getValues().truck_type === "Small Truck"}
                  {...register("truck_type", {
                    required: "This field is required",
                  })}
                />
                <Radio
                  className="ml-1"
                  id="truck-container"
                  name="truck_type"
                  label={<span className="text-xs">Container</span>}
                  value="Container"
                  // checked={getValues().truck_type === "Container"}
                  {...register("truck_type", {
                    required: "This field is required",
                  })}
                />
              </div>
              <div className="flex ml-3 mb-4 gap-4">
                <Input
                  variant="outlined"
                  label="Vehicle model"
                  // defaultValue={getValues().model}
                  name="model"
                  error={errors?.model?.message}
                  {...register("model", {
                    required: "This field is required",
                  })}
                  className="block w-full text-xs"
                />
                <br />
                <Input
                  variant="outlined"
                  label="Model year"
                  // defaultValue={getValues().model_year}
                  name="model_year"
                  error={errors?.model_year?.message}
                  {...register("model_year", {
                    required: "This field is required",
                  })}
                  className="block w-full text-xs"
                />
                <Input
                  variant="outlined"
                  label="Registration Number"
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
                  className="block w-full text-xs"
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="doc" className="">
            <div className="flex gap-2 border p-5 rounded-md">
              <FiUpload size={20} />
              <span className="text-xs">Upload RC book</span>
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
          <label htmlFor="vehicleImage" className="text-xs">
            <div className="flex justify-between items-center gap-2 p-2">
              <Avatar src="/img.png" alt="avatar" size="xs" />
              <span className="text-xs">
                Upload vehicle photo with RC number
              </span>
            </div>
          </label>
        </div>

        <div className="flex gap-5 mt-5 justify-end">
          <Button
            className="text-xs p-2"
            type="reset"
            variant="text"
            onClick={() => {
              setShowAddVehicle(false);
              reset();
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isCreating}
            className="text-xs p-2"
            variant="outlined"
            color="teal"
          >
            <div className="flex justify-center items-center p-0">
              <FaCaretRight size={15} />
              <span>{isCreating ? "Loading.." : "Submit"}</span>
            </div>
          </Button>
        </div>
      </form>
    </>
  );
}

export default AddvehicleForm;
