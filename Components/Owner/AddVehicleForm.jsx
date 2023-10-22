import { Avatar, Button, Card, Input, Radio } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import { useSetRecoilState } from "recoil";
import Spinner from "@material-tailwind/react";
import { useAddVehicle } from "@/hooks/vehicles/useAddVehicle";
import { showAddvehicleState } from "@/context/VehicleAtom";

function AddvehicleForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();

  const { isCreating, createTruck } = useAddVehicle();
  const setShowAddVehicle = useSetRecoilState(showAddvehicleState);
  const { errors } = formState;
  const onSubmit = async (newTruck) => {
    createTruck(newTruck);

    // setVehicleData({
    //   model: "",
    //   model_year: "",
    //   plate_number: "",
    //   truck_type: "",
    //   status_id: "",
    //   rc_photo: "",
    //   vehicle_photo: "",
    //   owner_id: "",
    // });
    setShowAddVehicle(false);
    reset();
  };

  return (
    <>
      <Card className="px-3 my-2 pb-2">
        <form
          className="flex flex-col gap-1 p-2 mt-5 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-3 gap-2">
            {isCreating ? (
              <Spinner />
            ) : (
              <div className="flex flex-col gap-4 col-span-2">
                <div className="mb-6">
                  <label>Truck Type</label>
                  <Radio
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
                <Input
                  variant="static"
                  label="Vehicle model"
                  // defaultValue={getValues().model}
                  name="model"
                  error={errors?.model?.message}
                  {...register("model", {
                    required: "This field is required",
                  })}
                />
                <Input
                  variant="static"
                  label="Model year"
                  // defaultValue={getValues().model_year}
                  name="model_year"
                  error={errors?.model_year?.message}
                  {...register("model_year", {
                    required: "This field is required",
                  })}
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
                    pattern: {
                      value:
                        /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/,
                      message: "Please provide a valid Registration number",
                    },
                  })}
                />
              </div>
            )}

            <div>
              <Input
                id="vehicleImage"
                type="file"
                hidden
                name="vehicle_photo"
                // defaultValue={vehicleData.vehicle_photo}
                {...register("vehicle_photo")}
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

          <input
            id="doc"
            type="file"
            hidden
            {...register("rc_photo", {
              required: "This field is required",
            })}
          />

          <div className="flex gap-5 mt-5">
            <Button type="submit" color="blue-gray" disabled={isCreating}>
              {isCreating ? "Loading.." : "Submit"}
            </Button>
            <Button
              type="reset"
              variant="outlined"
              color="blue-gray"
              onClick={() => {
                setShowAddVehicle(false);
                reset();
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
}

export default AddvehicleForm;
